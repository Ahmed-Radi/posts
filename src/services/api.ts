import axios from 'axios';
import { IPost } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/'
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getPosts = async ( pageParam: number) => {
  console.log('pageParam', pageParam)
  return (await axiosInstance.get<IPost[]>(`posts?posts?_page=${pageParam + 1}&_limit=10`)).data;
}

export const singlePost = async (id: number) => {
  return (await axiosInstance.get<IPost>(`posts/${id}`)).data;
}

export const createPost = async (post: IPost) => {
  await axiosInstance.post<IPost>('posts', post)
}

export const updatePost = async (post: IPost) => {
  await axiosInstance.put<IPost>(`posts/${post.id}`, post)
}

export const deletePost = async (id: number) => {
  await axiosInstance.delete<IPost>(`posts/${id}`)
}