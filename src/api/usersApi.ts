import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => axios.get(`${API_URL}/users`);
export const getUserById = async (id: number) => axios.get(`${API_URL}/users/${id}`);
export const searchUsers = async (name: string) => axios.get(`${API_URL}/users?name_like=${name}`);
export const updateUserById = async (id: number, userData: any) =>
    axios.put(`${API_URL}/users/${id}`, userData, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });