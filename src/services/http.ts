import axios from "axios";
import { API_BASE_URL } from "@env";

const BASE_URL = API_BASE_URL;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
