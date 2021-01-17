import axios from 'axios'

const baseURL = "http://api.automail.henrychao.me";
// const baseURL = "http://ntuai.csie.org:4000";
const instance = axios.create({ baseURL: baseURL });

const login = async ({ usernameOrEmail, password }) => {
  const { data } = await instance.post('/account/read', { usernameOrEmail, password });
  return data;
}

const signUp = async ({ username, email, password }) => {
  const { data } = await instance.post("/account/create", { username, email, password });
  return data;
}

export { login, signUp };