import axios from 'axios';
const loginUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { login }