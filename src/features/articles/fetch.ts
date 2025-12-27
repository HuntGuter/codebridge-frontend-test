import axios from 'axios';

export const fetch = axios.create({
    baseURL: "https://api.spaceflightnewsapi.net/v4",
    timeout: 10000,
}); 