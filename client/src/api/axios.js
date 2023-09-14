import axios from 'axios';

export default axios.create({
    baseURL: 'https://192.168.101.102:5001'
});