import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => axios.get(`${API_URL}/posts`);
export const getPostById = async (id: number) => axios.get(`${API_URL}/posts/${id}`);
export const getCommentsByPostId = async (postId: number) =>
  axios.get(`${API_URL}/comments?postId=${postId}`);
export const addPost = async (post: any) =>
  axios.post(`${API_URL}/posts`, post, {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
export const deletePost = async (id: number) => axios.delete(`${API_URL}/posts/${id}`);
export const addComment = async (comment: any) =>
  axios.post(`${API_URL}/comments`, comment, {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
export const deleteCommentById = async (id: number) =>
  axios.delete(`${API_URL}/comments/${id}`);

