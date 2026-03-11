import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  const databaseURL = process.env.FIREBASE_DATABASE_URL;

  if (!serviceAccount || !databaseURL) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT or FIREBASE_DATABASE_URL env vars.");
  }

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
    databaseURL,
  });
}

export const db = admin.database();
