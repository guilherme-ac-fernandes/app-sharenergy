import axios from 'axios';

export const apiRandomUsers = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

export const apiDog = axios.create({
  baseURL: 'https://random.dog/woof.json',
});

export const apiCrudUsers = axios.create({
  baseURL: 'http://localhost:3001/user',
});
