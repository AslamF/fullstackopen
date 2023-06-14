const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogSchema");
const helper = require("../tests/test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogList.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogList.length);
});

test("the first note is about fraz", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.author);
  expect(contents).toContain("frazAslam");
});

test("unique id exists", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "test4",
    author: "hanan",
    url: "dtodfd.df",
    likes: 34,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("content-type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length + 1);
  const contents = blogsAtEnd.map((r) => r.author);
  expect(contents).toContain("hanan");
});

test("a note can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogsToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogsToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length - 1);

  const contents = blogsAtEnd.map((r) => r.author);
  expect(contents).not.toContain(blogsToDelete.author);
});

test("a blog entry can be edited", async () => {
  const newBlog = {
    title: "testtoseechange",
    author: "hanan",
    url: "dtodfd.df",
    likes: 1,
  };
  const result = await api.post("/api/blogs").send(newBlog);

  newBlog.likes += 1;

  await api.put(`/api/blogs/${result.body.id}`).send(newBlog);

  const newResult = await api.get(`/api/blogs/${result.body.id}`);
  expect(newResult.body.likes).toBe(2);
});

afterAll(async () => {
  await mongoose.connection.close();
});
