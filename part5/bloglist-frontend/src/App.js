import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('')

  const blogFormRef = useRef();


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user);
    setUsername('');
    setPassword('');
  }



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])

  const logoutEvent = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
        />
      </Togglable>
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        success()
        setBlogs(blogs.concat(returnedBlog))
      })

  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }
  const updateBlogs = () => {
    blogService
      .getAll()
      .then(response => {
        console.log(response)
        let newBlogs = [];
        response.map(newBlog => {
          return newBlogs.push(newBlog)
        })
        setBlogs(newBlogs)
      })
  }

  const removedBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }


  const showBlogs = () => (
    <div>
      <h2>blogs</h2>

      {blogs.sort(function(a,b){return b.likes - a.likes}).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} update={updateBlogs} removedBlog={removedBlog}/>
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
      'Blog was added'
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