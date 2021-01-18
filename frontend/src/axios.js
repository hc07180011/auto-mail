import axios from 'axios'

const baseURL = "http://api.automail.henrychao.me";
// const baseURL = "http://ntuai.csie.org:4000";
const instance = axios.create({ baseURL: baseURL });

const login = async (req) => {
  const { data } = await instance.post("/account/read", req);
  return data;
}

const signUp = async (req) => {
  const { data } = await instance.post("/account/create", req);
  return data;
}

const addEmail = async (req) => {
  const { data } = await instance.post("/account/email/create", req);
  return data;
}

const getEmailList = async (req) => {
  const { data } = await instance.post("/account/email/read", req);
  return data;
}

const updateEmail = async (req) => {
  const { data } = await instance.post("/account/email/update", req);
  return data;
}

const deleteEmail = async (req) => {
  const { data } = await instance.post("/account/email/delete", req);
  return data;
}

const addContent = async (req) => {
  const { data } = await instance.post("/content/create", req);
  return data;
}

const getContentList = async (req) => {
  const { data } = await instance.post("/content/read", req);
  return data;
}

const getEmailDetail = async (req) => {
  const { data } = await instance.post("/content/detail/read", req);
  return data;
}

export {
  login,
  signUp,
  addEmail,
  getEmailList,
  updateEmail,
  deleteEmail,
  addContent,
  getContentList,
  getEmailDetail,
};