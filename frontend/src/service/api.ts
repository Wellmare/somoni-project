import axios from 'axios';

import { url } from '../constants/api';

export const baseAxiosInstance = axios.create({
    headers: {
        'Content-type': 'application/json',
    },
    baseURL: url,
});
