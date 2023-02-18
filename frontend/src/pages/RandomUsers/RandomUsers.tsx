import React, { useEffect, useState } from 'react';
import { FaSearch, FaRedoAlt } from 'react-icons/fa';
import Button from '../../components/Button/Button';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import RandomUserCard from '../../components/RandomUserCard/RandomUserCard';
import { IRandomUser } from '../../interfaces/IRandomUser';
import { getRandomUsers } from '../../requests/randomUsersRequest';
import './RandomUsers.css';

function RandomUsers() {
  const [users, setUsers] = useState<IRandomUser[]>([]);
  const [usersBackup, setUsersBackup] = useState<IRandomUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userIndex, setUserIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');

  const fetchRandomUsers = async () => {
    setLoading(true);
    const responseUsers = await getRandomUsers();
    setUsersBackup(responseUsers);
    setUserIndex(0);
    setUsers(responseUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const increaseIndex = () => {
    setUserIndex(userIndex + 1);
  };

  const decreaseIndex = () => {
    setUserIndex(userIndex - 1);
  };

  const filteringUsers = () => {
    const filterUsers = users.filter(
      ({ fullname, email, username }) => fullname.includes(userInput)
        || email.includes(userInput)
        || username.includes(userInput),
    );
    if (filterUsers.length === 0) {
      setUserInput('');
      return alert('Não foi encontrado nenhum usuário!');
    }
    setUsers(filterUsers);
    setUserIndex(0);
    setUserInput('');
  };

  const resetFilter = () => {
    setUsers(usersBackup);
    setUserIndex(0);
  };

  const user = users[userIndex];

  return (
    <section className="random-users-container">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="random-users-section">
          <form>
            <Input
              id="search-user-input"
              type="text"
              value={userInput}
              setValue={setUserInput}
              dataTestId="search-user-input"
              placeholder="Pesquisar dados do usuário"
            />
            <aside>
              <ButtonIcon
                component={<FaSearch />}
                onClick={filteringUsers}
                dataTestId="search-user-button"
              />
              <ButtonIcon
                component={<FaRedoAlt />}
                onClick={resetFilter}
                dataTestId="reset-random-users"
                disabled={!(users.length < 100)}
              />
            </aside>
          </form>
          <RandomUserCard index={userIndex} user={user} />
          <aside>
            <Button
              text="Anterior"
              onClick={decreaseIndex}
              dataTestId="previous-user"
              disabled={userIndex === 0}
            />
            <p data-testid="show-index">
              {`${userIndex + 1}/${users.length}`}
            </p>
            <Button
              text="Próximo"
              onClick={increaseIndex}
              dataTestId="next-user"
              disabled={userIndex === users.length - 1}
            />
          </aside>
        </div>
      )}
      <Footer />
    </section>
  );
}

export default RandomUsers;
