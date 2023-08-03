import express from "express";
import { protect } from "../middlewares/authMiddlware.js";
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlogById } from "../controllers/blogControllers.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/", protect, createBlog);
router.put("/:blogId", protect, updateBlogById);
router.delete("/:blogId", protect, deleteBlogById);

export default router;