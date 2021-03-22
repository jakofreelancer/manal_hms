import axios from 'axios';

const instance = axios.create({
    baseURL: "https://manal-bbf4e-default-rtdb.firebaseio.com/"
});

export default instance;