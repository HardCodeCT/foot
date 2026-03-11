import { db } from "../../_firebase.js";

export default async function handler(req, res) {
  const { date } = req.query;

  if (req.method === "GET") {
    try {
      const snap = await db.ref(`/predictions/${date}`).once("value");
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json(snap.val());
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await db.ref(`/predictions/${date}`).remove();
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
