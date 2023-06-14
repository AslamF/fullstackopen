const Blog = require("../models/blogSchema");
const User = require("../models/user");

const initialBlogList = [
  {
    title: "test1",
    author: "frazAslam",
    url: "doesNE.cm",
    likes: 3434,
  },
  {
    title: "test2",
    author: "talhaAslam",
    url: "doesNE.cm",
    likes: 2323,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "will remove" });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogList,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
