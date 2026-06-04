"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const postController_1 = require("../controllers/postController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.post('/families/:familyId/posts', upload.array('media', 10), postController_1.createPost);
router.get('/families/:familyId/posts', postController_1.getFamilyPosts);
exports.default = router;
