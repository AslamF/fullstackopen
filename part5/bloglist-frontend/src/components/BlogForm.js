import { useState } from 'react'
const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: URL
    })

    setTitle('')
    setAuthor('')
    setURL('')

  }



  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
                    title: <input value={title} onChange={event => setTitle(event.target.value)}/>
        </div>
        <div>
                    author: <input value={author} onChange={event => setAuthor(event.target.value)} />
        </div>
        <div>
                    URL: <input value={URL} onChange={event => setURL(event.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}


export default BlogForm