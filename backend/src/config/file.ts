import multer from "multer";
import path from "path";
import mime from "mime"

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "..", "uploads"),
  filename: (req, file, callback) => {
    const type = mime.extension(file.mimetype)
    callback(null, `${Date.now()}-${file.originalname}`);
    console.log(file.originalname)
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["audio/mpeg", "audio/mp4"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Only .mp3 and .mp4 files are supported"));
    }
    callback(null, true);
  }
});

export default upload;
