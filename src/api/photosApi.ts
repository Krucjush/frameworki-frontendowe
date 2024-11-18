import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPhotos = async () => axios.get(`${API_URL}/photos`);
export const getPhotoById = async (id: number) => axios.get(`${API_URL}/photos/${id}`);
export const addPhoto = async (photo: any) =>
  axios.post(`${API_URL}/photos`, photo, {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
export const deletePhoto = async (id: number) => axios.delete(`${API_URL}/photos/${id}`);
