import multer from "multer";
// write code for multer diskstorage for file handling in storage folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage"); //cb(error,sucess)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//export tihis function and multer
export  { multer, storage };
