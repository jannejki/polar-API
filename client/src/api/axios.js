import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV !== 'asd'
        ? 'http://localhost:5000'
        : 'https://jannejki.ddns.net'
});