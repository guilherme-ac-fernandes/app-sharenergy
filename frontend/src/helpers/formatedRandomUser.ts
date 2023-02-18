import { IRandomUserGenerator } from '../interfaces/IRandomUserGenerator';

const formatData = (data: IRandomUserGenerator[]) => data.map((user) => ({
  image: user.picture.large,
  fullname: `${user.name.first} ${user.name.last}`,
  email: user.email,
  username: user.login.username,
  age: user.dob.age,
}));

export default formatData;
