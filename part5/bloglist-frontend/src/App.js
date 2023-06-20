import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [URL, setURL] = useState('');
  const [successMessage, setSuccessMessage] = useState("")


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password});
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user);
    setUsername('');
    setPassword('');
  }

  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])

  const logoutEvent = () => {
    console.log("klcd");
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }
   
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password <input type='password' value={password} name='password' onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const createBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: URL
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      success()
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setURL('')
    })
    
  }

  const blogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        title: <input type='text' value={title} name="title" onChange={(event) => { setTitle(event.target.value) }} />
      </div>
      <div>
        author: <input type='text' value={author} name="author" onChange={(event) => {setAuthor(event.target.value) }} />
      </div>
      <div>
        url: <input type='text' value={URL} name='url' onChange={(event) => {setURL(event.target.value) }} />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
 
 
  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  const logoutButton = () => (
    <button onClick={(logoutEvent)}>
      logout
    </button>
  )
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  const success = () => {
    setSuccessMessage(
      `Blog was added`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  return (
    
  <div>
  <Notification message = {successMessage} />
    {user === null && loginForm()}
    {user !== null && 
    <div>
        <p>{user.name} logged in {logoutButton()}</p>
        {blogForm()}
        {showBlogs()}
    </div>
    }
  
  </div>  
  )
}

export default App