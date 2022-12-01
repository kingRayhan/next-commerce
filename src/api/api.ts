import axios from "axios";

const api = axios.create({
    baseURL: "http://104.251.211.125:8055",
    headers: {
        "Content-Type": "application/json",
    }
})

export  default  api;