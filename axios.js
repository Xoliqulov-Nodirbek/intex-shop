import axios from "axios"

export const baseURL = "https://market-index.herokuapp.com/"  // "http://31.44.6.77:5555/"

export const https = axios.create({  
    baseURL : baseURL,
})