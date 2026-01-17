const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog = (blogs)=>{
  if(blogs.length === 0){
    return null
  }
  let favorite = blogs[0]
  for(let blog of blogs){
    if(blog.likes > favorite.likes){
      favorite = blog
    }
  }
  return favorite
}
const _ = require('lodash');

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = _.countBy(blogs, 'author');
  const maxBlogsAuthor = _.maxBy(Object.keys(authorCounts), author => authorCounts[author]);
  
  return {
    author: maxBlogsAuthor,
    blogs: authorCounts[maxBlogsAuthor]
  };
}
const mostLikes = (blogs) => {
  if(blogs.length === 0) return null;
  
  const  moselikedAuthor = _(blogs).groupBy('author')
    .map((authorBlogs, author) => ({
      author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .maxBy('likes');
  return moselikedAuthor;
}
  module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}