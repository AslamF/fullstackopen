const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  let total = 0;
  blogPosts.forEach((blog) => {
    return (total += blog.likes);
  });
  return total;
};

module.exports = {
  dummy,
  totalLikes,
};
