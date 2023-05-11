import axios from "axios";

const URL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(URL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(URL, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (url, deleteThisPerson) => {
  const request = axios.delete(url, deleteThisPerson);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePerson };
