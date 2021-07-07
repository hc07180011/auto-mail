import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL || "https://api-pigeons.herokuapp.com/";
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

const getContent = async (req) => {
  const { data } = await instance.post("/content/detail/read", req);
  return data;
}

const updateContent = async (req) => {
  const { data } = await instance.post("/content/detail/update", req);
  return data;
}

const deleteContent = async (req) => {
  const { data } = await instance.post("/content/delete", req);
  return data;
}

const deliver = async (req) => {
  const { data } = await instance.post("/deliver/create", req, {
    'content-type': 'multipart/form-data'
  });
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
  getContent,
  updateContent,
  deleteContent,
  deliver,
};
