import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const likeBlog = (blog) => {
  const likedBlog = blog;
  likedBlog.likes = blog.likes + 1;
  return axios.put(`${baseUrl}/${blog.id}`, likedBlog)
}

const deleteBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  return await axios.delete(`${baseUrl}/${blog.id}`, config)
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, likeBlog, deleteBlog }