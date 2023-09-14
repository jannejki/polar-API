import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.101.102:5000'
});