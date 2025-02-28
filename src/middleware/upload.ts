import multer from "multer";
import path from "path";
import fs from "fs";

const upload = ({ uploadPath = "src/uploads", fileTypes = /jpeg|jpg|png|gif|bmp|webp/, maxFileSize = 2 * 1024 * 1024 }) => {

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        },
    });

    const fileFilter = (req, file, cb) => {
        if (!file.mimetype.match(fileTypes)) {
            cb(new Error("File is not supported"), false);
            return;
        }
        cb(null, true);
    };

    return multer({ storage, fileFilter, limits: { fileSize: maxFileSize } });
};

export default upload;
