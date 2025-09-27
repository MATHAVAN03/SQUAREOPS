import axios from 'axios';
const BASE_URL = 'https://api.spacexdata.com/v4';

export const fetchLaunches = async () => axios.get(`${BASE_URL}/launches`);
export const fetchLaunchById = async (id) => axios.get(`${BASE_URL}/launches/${id}`);