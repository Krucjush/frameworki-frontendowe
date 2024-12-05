import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
  try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};
export const getUserById = async (id: number) => axios.get(`${API_URL}/users/${id}`);
export const searchUsers = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;

    const filteredUsers = users.filter(
      (user: any) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );

    return { data: filteredUsers };
  } catch (error) {
    console.error('Error searching for users:', error);
    throw error;
  }
};
export const updateUserById = async (id: number, userData: any) =>
    axios.put(`${API_URL}/users/${id}`, userData, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });