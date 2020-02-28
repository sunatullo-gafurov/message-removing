import axios from 'axios';

// process.env.PORT
const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // TODO: specify other settings
});

export default client; // index.js -> import client from http;