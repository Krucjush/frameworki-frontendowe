import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getAlbums = async () => {
    try {
      const response = await axios.get(`${API_URL}/albums`);
      return response.data;
    } catch (error) {
      console.error('Error fetching albums:', error);
      throw new Error('Failed to fetch albums'); 
    }
  };

export const getPhotos = async () => {
    try {
        const response = await axios.get(`${API_URL}/photos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};


export const addPhoto = async (photo: any) => {
    try {
        const response = await axios.post(`${API_URL}/photos`, photo);
        return response.data;
    } catch (error) {
        console.error('Error adding photo:', error);
        throw error;
    }
};

export const deletePhoto = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/photos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw error;
    }
};

export const createAlbum = async (album: { id: number; userId: number; title: string }) => {
    try {
        const response = await axios.post(`${API_URL}/albums`, album);
        return { ...album, ...response.data };
    } catch (error) {
        console.error('Error creating album:', error);
        throw error;
    }
};
