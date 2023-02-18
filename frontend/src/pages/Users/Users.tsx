import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import UsersModal from '../../components/UsersModal/UsersModal';
import { ICrudUser } from '../../interfaces/ICrudUser';
import {
  createCrudUser,
  getCrudUsers,
  updateCrudUser,
} from '../../requests/crudUsersRequest';
import useModal from '../../hooks/useModal';
import './Users.css';

function Users() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [isAble, setIsAble] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<ICrudUser[]>([]);
  const [userEditing, setUserEditing] = useState<string>('');

  const { isOpen, toggle } = useModal();

  const fetchRandomUsers = async () => {
    setLoading(true);
    const responseUsers = await getCrudUsers();
    setUsers(responseUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  useEffect(() => {
    if (
      name !== ''
      && email !== ''
      && phoneNumber !== ''
      && address !== ''
      && cpf !== ''
      && cpf.length === 11
    ) {
      return setIsAble(false);
    }
    return setIsAble(true);
  }, [name, email, phoneNumber, address, cpf, isAble]);

  const resetInputForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setAddress('');
    setCpf('');
    setUserEditing('');
  };

  const createUser = async () => {
    try {
      await createCrudUser({
        name,
        email,
        phoneNumber,
        address,
        cpf,
      });
      fetchRandomUsers();
      resetInputForm();
    } catch (error) {
      alert(error);
    }
  };

  const updateUser = async () => {
    try {
      await updateCrudUser({
        _id: userEditing,
        name,
        email,
        phoneNumber,
        address,
        cpf,
      });
      fetchRandomUsers();
      resetInputForm();
    } catch (error) {
      alert(error);
    }
  };

  const editingUser = async (user: ICrudUser) => {
    setUserEditing(user._id as string);
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setAddress(user.address);
    setCpf(String(user.cpf));
    toggle();
    setIsAble(false);
  };

  return (
    <section className="users-crud-container">
      <Header />
      {!loading && (
      <form>
        <div className="users-crud-header">
          <h2 data-testid="title-crud-user">Criar Usuário</h2>
          <Button
            text="Usuários"
            onClick={toggle}
            dataTestId="open-modal_button-crud-user"
          />
        </div>
        <Input
          id="name"
          type="text"
          value={name}
          setValue={setName}
          dataTestId="user-crud-name"
          placeholder="Nome: Maria Fernandes"
        />
        <Input
          id="email"
          type="email"
          value={email}
          setValue={setEmail}
          dataTestId="user-crud-email"
          placeholder="Email: maria@gmail.com"
        />
        <Input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          setValue={setPhoneNumber}
          dataTestId="user-crud-phoneNumber"
          placeholder="Telefone: (031) 98765-4321"
        />
        <Input
          id="address"
          type="text"
          value={address}
          setValue={setAddress}
          dataTestId="user-crud-address"
          placeholder="Endereço: Rua Dois, número 4, Bairro Glória"
        />
        <Input
          id="cpf"
          type="number"
          value={cpf}
          setValue={setCpf}
          dataTestId="user-crud-cpf"
          placeholder="CPF: 11 caracteres (10987654321)"
          maxLength={11}
        />
        <aside className="aside-form-crud-user">
          {userEditing === '' ? (
            <Button
              text="Criar usuário"
              onClick={createUser}
              dataTestId="user-crud-create"
              disabled={isAble}
            />
          ) : (
            <Button
              text="Editar usuário"
              onClick={updateUser}
              dataTestId="user-crud-edit"
              disabled={isAble}
            />
          )}
        </aside>
      </form>
      )}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <UsersModal
            isOpen={isOpen}
            toggle={toggle}
            users={users}
            fetchRandomUsers={fetchRandomUsers}
            editingUser={editingUser}
          />
        </div>
      )}
      <Footer />
    </section>
  );
}

export default Users;
