import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:3333/"
    : "https://my-json-server.typicode.com/deibsoncogo/NLW5ReactJS/",
});
