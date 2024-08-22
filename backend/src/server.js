import express from "express";
import { db, connectDb } from "./db.js";
import admin from "firebase-admin";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get(/^(?!\/api).+/, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      req.user = await admin.auth().verifyIdToken(token);
    } catch (e) {
      return res.status(401).json({ error: "Invalid auth token" });
    }
  } else {
    req.user = {};
  }
  next();
});

app.get("/api/blog/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user || {};

  try {
    const article = await db.collection("school").findOne({ name });

    if (article) {
      const likedId = article.likedId || [];
      article.canLike = uid && !likedId.includes(uid);
      res.json(article);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching article" });
  }
});

app.use((req, res, next) => {
  if (req.user && req.user.uid) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/blog/:name/plusone", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user || {};

  try {
    const article = await db.collection("school").findOne({ name });

    if (article) {
      const likedId = article.likedId || [];
      const canLike = uid && !likedId.includes(uid);
      if (canLike) {
        await db.collection("school").updateOne(
          { name },
          {
            $inc: { vote: 1 },
            $push: { likedId: uid },
          }
        );
      }
      const updatedArticle = await db.collection("school").findOne({ name });
      res.json(updatedArticle);
    } else {
      res.status(404).send("Le cours n'existe pas");
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating vote" });
  }
});

app.post("/api/blog/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user || {};

  try {
    await db.collection("school").updateOne(
      { name },
      {
        $push: { comment: { author: email, text } },
      }
    );

    const article = await db.collection("school").findOne({ name });
    if (article) {
      res.json(article);
    } else {
      res.status(404).send("Le cours n'existe pas");
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
});

const PORT = process.env.PORT || 8080;
connectDb(() => {
  console.log("Connecté à la base de données");
  app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
  });
});
