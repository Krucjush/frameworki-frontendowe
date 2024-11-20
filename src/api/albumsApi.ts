import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all albums
export const getAlbums = async () => {
    try {
        const response = await axios.get(`${API_URL}/albums`);
        return response.data;
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
    }
};

// Fetch all photos
export const getPhotos = async () => {
    try {
        const response = await axios.get(`${API_URL}/photos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};


// Add a photo
export const addPhoto = async (photo: any) => {
    try {
        // Replace this with actual POST logic when integrating a real backend
        const response = await axios.post(`${API_URL}/photos`, photo);
        return response.data;
    } catch (error) {
        console.error('Error adding photo:', error);
        throw error;
    }
};

// Delete a photo
export const deletePhoto = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/photos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw error;
    }
};
