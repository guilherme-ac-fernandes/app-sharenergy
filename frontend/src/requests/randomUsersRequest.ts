import { apiRandomUsers } from '.';
import formatData from '../helpers/formatedRandomUser';

export const getRandomUsers = async () => {
  const data = await apiRandomUsers.get('/?results=100')
    .then((response) => response.data.results);
  const formatedData = formatData(data);
  return formatedData;
};
