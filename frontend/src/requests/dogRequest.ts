import { apiDog } from '.';

export const getDog = async () => {
  const data = await apiDog.get('/').then((response) => response.data);
  return data;
};
