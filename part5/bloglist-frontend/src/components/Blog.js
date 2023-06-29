import {  useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog, user, update, removedBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = async () => {
    await blogService.deleteBlog(blog)
    removedBlog(blog.id)

  }

  const handleLikes = async () => {
    blogService
      .likeBlog(blog)
      .then(() => {
        update()
      })
  }

  const [showInfo, setShowInfo] = useState(false)

  const hideWhenVisible = { display: showInfo ? 'none' : '' }
  const showWhenVisible = { display: showInfo ? '' : 'none' }

  const toggleVisibility = () => {
    setShowInfo(!showInfo)
  }




  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title}<button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLikes}>likes</button></div>
        <div>{user.name}</div>
        <button onClick={deleteBlog}>remove</button>

      </div>
    </div>
  )
}
export default Blog