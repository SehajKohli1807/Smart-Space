"use server";

//From a client component we can call a server component and useTransition to keep the update of track.
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { adminDb } from "../firebase-admin";
import liveblocks from "@/lib/liveblocks";

export async function createNewDocument() {
  auth().protect();

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth().protect(); //To check user is authorized
  console.log("deleteDocument", roomId);

  try {
    //Delete the roomID from collection
    await adminDb.collection("documents").doc(roomId).delete();

    //Iterate over users to find users associated with that roomId and delete the room reference from user's collection for every user in the room.
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    //delete the room in liveblocks
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
