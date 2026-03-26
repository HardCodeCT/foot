import { db } from "../../_firebase.js";

export default async function handler(req, res) {
  const { date, key } = req.query;

  if (req.method === "GET") {
    try {
      const snap = await db.ref(`/h2h/${date}/${key}`).once("value");
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json(snap.val() || null);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
