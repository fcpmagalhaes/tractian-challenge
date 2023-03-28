import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export const apiGH = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_URL
});