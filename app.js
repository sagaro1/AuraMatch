import express from "express";
import cors from "cors";
import fs from "fs";
import sharp from "sharp";
import path from "path";

import connecttodB from "./connectToDb/index.js";
import dotenv from "dotenv";
import { storage, multer } from "./middleware/multerConfig.js";
import FaceData from "./model/facedB.js";
import Beard from "./model/beardModel.js";
import Glass from "./model/glassModel.js";
import Hair from "./model/hairModel.js";

const app = express();
const port = process.env.PORT || 3000;
connecttodB();
dotenv.config();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use(express.static("./storage"));

app.post("/enter/face", upload.single("image"), async (req, res) => {
  const { faceshape, gender } = req.body;
  const image = req.file.filename;

  console.log(req.body);
  console.log(req.file.filename);

  await FaceData.create({
    faceshape,
    gender,
    image,
  });

  res.status(200).json({
    message: "okay done",
  });
});

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




app.get("/api/users", async (req, res) => {
  const { faceshape, gender } = req.query;
  console.log(req.query);

  const filteredBread = await Beard.find({gender,faceshape});
  const filteredGlass = await Glass.find({gender,faceshape});
  const filteredHair = await Hair.find({gender,faceshape});

  //compress the image 
  const resizeImages = async (data) => {
    return Promise.all(
      data.map(async (item) => {
        if (item.image) { // Assuming `image` contains the file path
          const filePath = path.resolve("./storage", item.image);
          try {
            // Resize the image to 240p height
            const resizedBuffer = await sharp(filePath)
              .resize({ height: 240 })
              .toBuffer();

            // Convert to Base64 string
            const resizedImage = `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;

            // Return updated item with resized image
            return { ...item.toObject(), image: resizedImage };
          } catch (err) {
            console.error(`Error processing image: ${filePath}`, err);
            // Return item without modifying the image if resizing fails
            return { ...item.toObject(), image: null };
          }
        }
        return item;
      })
    );
  };
  const resizedBread = await resizeImages(filteredBread);
  const resizedGlass = await resizeImages(filteredGlass);
  const resizedHair = await resizeImages(filteredHair);

  res.status(200).json({
    filteredBread: resizedBread,
    filteredGlass: resizedGlass,
    filteredHair: resizedHair,

  });



  });


app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const {box}= req.query
  console.log(box);

   
  if(box==='beard')
  {
    const data = await Beard.findById(id);
     console.log(data);
     res.status(200).json(data);

  }
  if(box==='glass')
    {
      const data = await Glass.findById(id);
       console.log(data);
       res.status(200).json(data);
  
    }
    if(box==='hair')
      {
        const data = await Hair.findById(id);
         console.log(data);
         res.status(200).json(data);
    
      }

  
});



app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
