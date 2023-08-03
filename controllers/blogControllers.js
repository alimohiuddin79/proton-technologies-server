import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// @desc create blog
// @route POST /api/blogs/
// @access PRIVATE

const createBlog = async (req, res) => {
    try {
        const { title, image, date, shortDesc, content } = req.body;

        if (req.user._id) {
            const newBlog = await Blog.create({
                title,
                image,
                date,
                shortDesc,
                content,
            });

            if (newBlog) {
                const updatedUser = await User.findByIdAndUpdate(req.user._id, { $push: { blogs: newBlog._id } });
            } else {
                res.status(500);
                throw new Error("Blog not push in user");
            }

            res.status(201).json(newBlog);
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    } catch (error) {
        console.log(error.message);
    }
}


// @desc Update blog by id
// @route POST /api/blogs/[id]
// @access PRIVATE

const updateBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findByIdAndUpdate(blogId, req.body);

        if (blog) {
            res.status(200).json({ message: "Blog updated" });
        } else {
            res.status(404).json({ message: "blog not update"});
        }
    } catch (error) {
        console.log(error.message);
    }
}


// @desc Update blog by id
// @route POST /api/blogs/[id]
// @access PRIVATE

const deleteBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findByIdAndDelete(blogId);

        if (blog) {
            res.status(200).json({ message: "Blog deleted" });
        } else {
            res.status(404).json({ message: "blog not deleted"});
        }
    } catch (error) {
        console.log(error.message);
    }
}


// @desc get all blogs
// @route POST /api/blogs/
// @access PUBLIC

const getAllBlogs = async (req, res) => {
    try {
            const blogs = await Blog.find({});

            if (blogs) {
                res.status(200).json(blogs);
            } else {
                res.status(404).json({ message: "blogs not found" });
            }
    } catch (error) {
        console.log(error.message);
    }
}


// @desc get blog by id
// @route POST /api/blogs/:blogId
// @access PUBLIC

const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        
        const blog = await Blog.findById(blogId);

        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

export { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById };