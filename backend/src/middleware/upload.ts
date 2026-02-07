import multer from "multer";
import path from "path";
import fs from "fs";

function ensureDirectory(directory: string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if (file.fieldname === "profileImg") {
            folder = "drivers/profile";
        } else if (file.fieldname === "proofOfInsurance") {
            folder = "drivers/insurance";
        } else if (file.fieldname === "proofOfAddress") {
            folder = "drivers/address";
        } else if (file.fieldname === "riderProfileImg") {
            folder = "riders/profile";
        }

        const fullPath = path.join(__dirname, `../uploads/${folder}`);
        ensureDirectory(fullPath);

        cb(null, fullPath);
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".pdf"].includes(ext)) {
        return cb(new Error("Only images and PDF files are allowed"));
    }
    cb(null, true);
};

export const uploadAny = multer({ storage, fileFilter });
