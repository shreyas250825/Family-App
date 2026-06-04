"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Dummy local storage upload simulation
// In production, integrate with Supabase Storage SDK or AWS S3 SDK
const uploadMedia = async (file, familyId, userId) => {
    // Generate unique filename
    const ext = path_1.default.extname(file.originalname);
    const filename = `${familyId}/${(0, uuid_1.v4)()}${ext}`;
    // Simulate upload: move file to ./uploads/familyId folder
    const destDir = path_1.default.join(__dirname, '../../uploads', familyId);
    if (!fs_1.default.existsSync(destDir)) {
        fs_1.default.mkdirSync(destDir, { recursive: true });
    }
    const destPath = path_1.default.join(destDir, filename.split('/')[1]);
    fs_1.default.renameSync(file.path, destPath);
    // Return URL (in real app, this would be a signed URL or public URL)
    return `/uploads/${familyId}/${filename.split('/')[1]}`;
};
exports.uploadMedia = uploadMedia;
