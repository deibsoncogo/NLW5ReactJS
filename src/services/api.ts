import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({ baseURL: process.env.API_URL || "http://localhost:3333/" });
