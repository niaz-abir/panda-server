const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(cors(Credential:true));
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("assignment");
    const galleryCollection = db.collection("gallery");
    const jerseyCollection = db.collection("jersey");
    const customJerseyCollection = db.collection("customJersey");
    const footballItemCollection = db.collection("footballItem");

    // jersey api
    app.get("/api/v1/jersey", async (req, res) => {
      const query = {};
      const result = await jerseyCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/api/v1/jersey/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jerseyCollection.findOne(query);
      res.send(result);
    });

    app.post("/api/v1/create-jersey", async (req, res) => {
      const newJersey = req.body;
      const response = await jerseyCollection.insertOne(newJersey);
      res.send(response);
    });

    app.delete("/api/v1/delete-jersey/:id", async (req, res) => {
      const id = req.params.id;
      const response = await jerseyCollection.deleteOne({
        _id: new ObjectId(id),
      });
      console.log(response);
      res.send(response);
    });
    // custom-jersey
    app.get("/api/v1/custom-jersey", async (req, res) => {
      const query = {};
      const result = await customJerseyCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/api/v1/custom-jersey/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await customJerseyCollection.findOne(query);
      res.send(result);
    });

    app.post("/api/v1/create-custom-jersey", async (req, res) => {
      const newCustomJersey = req.body;
      const response = await customJerseyCollection.insertOne(newCustomJersey);
      res.send(response);
    });

    app.delete("/api/v1/delete-custom-jersey/:id", async (req, res) => {
      const id = req.params.id;
      const response = await customJerseyCollection.deleteOne({
        _id: new ObjectId(id),
      });
      console.log(response);
      res.send(response);
    });

    // football item api
    app.get("/api/v1/football-item", async (req, res) => {
      const query = {};
      const result = await footballItemCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/api/v1/football-item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await footballItemCollection.findOne(query);
      res.send(result);
    });

    app.post("/api/v1/create-football-item", async (req, res) => {
      const newFootballItem = req.body;
      const response = await footballItemCollection.insertOne(newFootballItem);
      res.send(response);
    });

    app.delete("/api/v1/delete-football-item/:id", async (req, res) => {
      const id = req.params.id;
      const response = await footballItemCollection.deleteOne({
        _id: new ObjectId(id),
      });
      console.log(response);
      res.send(response);
    });
    // gallery api
    app.get("/api/v1/gallery", async (req, res) => {
      const query = {};
      const result = await galleryCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/api/v1/gallery/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await galleryCollection.findOne(query);
      res.send(result);
    });

    app.post("/api/v1/create-gallery", async (req, res) => {
      const newGallery = req.body;
      const response = await galleryCollection.insertOne(newGallery);
      res.send(response);
    });

    app.delete("/api/v1/delete-gallery/:id", async (req, res) => {
      const id = req.params.id;
      const response = await galleryCollection.deleteOne({
        _id: new ObjectId(id),
      });
      console.log(response);
      res.send(response);
    });

    app.put("/api/v1/update-gallery/:id", async (req, res) => {
      const id = req.params.id;
      const updateGallery = req.body;
      const query = { _id: new ObjectId(id) };
      const last = await galleryCollection.findOne(query);
      console.log(last);

      const updateDoc = {
        $set: updatedDonation,
      };
      const result = await donation.updateOne(query, updateDoc);
      res.send(result);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
