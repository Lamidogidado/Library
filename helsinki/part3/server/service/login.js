import axios from 'axios'
const baseUrl = '/api/login'

const login = async Credential => {
  const response = await axios.POST(baseUrl, Credential)
  return response
}

export default {login}