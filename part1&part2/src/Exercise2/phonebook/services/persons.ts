import axios from 'axios'
// const baseUrl = 'http://localhost:4000/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (data: any) => {
  const request = axios.post(baseUrl, data)
  return request.then((response) => response.data)
}

const update = (id: any, data: any) => {
  const request = axios.put(`${baseUrl}/${id}`, data)
  return request.then((response) => response.data)
}

const remove = (id: any) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const exportedObject = {
  getAll,
  create,
  update,
  remove,
}

export default exportedObject
