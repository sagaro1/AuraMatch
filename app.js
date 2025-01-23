import express from "express";
import cors from "cors";
import sharp from "sharp";
import path from "path";
import mongoose from "mongoose";

import connecttodB from "./connectToDb/index.js";
import dotenv from "dotenv";
import { storage, multer } from "./middleware/multerConfig.js";
import FaceData from "./model/facedB.js";
import Beard from "./model/beardModel.js";
import Glass from "./model/glassModel.js";
import Hair from "./model/hairModel.js";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use(express.static("./storage"));

// app.post("/enter/face", upload.single("image"), async (req, res) => {
//   const { faceshape, gender } = req.body;
//   const image = req.file.filename;

//   console.log(req.body);
//   console.log(req.file.filename);

//   await FaceData.create({
//     faceshape,
//     gender,
//     image,
//   });

//   res.status(200).json({
//     message: "okay done",
//   });
// });

app.post("/enter/beard", upload.single("image"), async (req, res) => {
  const { faceshape, gender, beardstyle, description } = req.body;
  const image = req.file.filename;

  console.log(req.body);

  await Beard.create({
    faceshape,
    gender,
    image,
    beardstyle,
    description,
  });

  res.status(200).json({
    message: "beard  done",
  });
});

app.post("/enter/glass", upload.single("image"), async (req, res) => {
  const { faceshape, gender, glassstyle, description } = req.body;
  const image = req.file.filename;

  console.log(req.body);

  await Glass.create({
    faceshape,
    gender,
    image,
    glassstyle,
    description,
  });

  res.status(200).json({
    message: "glass  done",
  });
});

app.post("/enter/hair", upload.single("image"), async (req, res) => {
  const { faceshape, gender, hairstyle, description } = req.body;
  const image = req.file.filename;

  console.log(req.body);

  await Hair.create({
    faceshape,
    gender,
    image,
    hairstyle,
    description,
  });

  res.status(200).json({
    message: "hair done",
  });
});

app.get("/all", async (req, res) => {
  const data = await Glass.find();
  res.status(200).json({
    message: "this",
    data,
  });
});

app.get("/api/users", async (req, res) => {
  const { faceshape, gender } = req.query;
  console.log(req.query);

  const filteredGlass = await Glass.find({ gender, faceshape });
  const filteredBread = await Beard.find({ gender, faceshape });
  const filteredHair = await Hair.find({ gender, faceshape });

  res.status(200).json({
    filteredBread,
    filteredGlass,
    filteredHair,
  });
});

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const { box } = req.query;
  console.log(box);

  if (box === "beard") {
    const data = await Beard.findById(id);
    console.log(data);
    res.status(200).json(data);
  }
  if (box === "glass") {
    const data = await Glass.findById(id);
    console.log(data);
    res.status(200).json(data);
  }
  if (box === "hair") {
    const data = await Hair.findById(id);
    console.log(data);
    res.status(200).json(data);
  }
});

app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
  await mongoose.connect(process.env.mongodb_url);
});
