import React from 'react';
import Button from '../Button/Button';
import { ICrudUser } from '../../interfaces/ICrudUser';
import { deleteCrudUser } from '../../requests/crudUsersRequest';
import './CrudUserCard.css';

interface CrudUserCardProps {
  user: ICrudUser;
  fetchRandomUsers: () => void,
  editingUser: (user: ICrudUser) => void,
}

export default function CrudUserCard({
  user,
  fetchRandomUsers,
  editingUser,
}: CrudUserCardProps) {
  const handleRemove = async (deleteId: string) => {
    try {
      await deleteCrudUser(deleteId);
      fetchRandomUsers();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <li
      data-testid={`crud-user-card-${user._id}`}
      className="crud-user-card-container"
    >
      <p
        className="crud-user-card-name"
        data-testid={`crud-user-name-${user._id}`}
      >
        {user.name}

      </p>
      <a
        data-testid={`crud-user-email-${user._id}`}
        href={`mailto:${user.email}`}
        className="crud-user-card-email"
      >
        <p>{user.email}</p>
      </a>
      <p data-testid={`crud-user-phoneNumber-${user._id}`}>
        {`📞 ${user.phoneNumber}`}
      </p>
      <p data-testid={`crud-user-address-${user._id}`}>
        {`📌 ${user.address}`}
      </p>
      <p data-testid={`crud-user-cpf-${user._id}`}>
        {`🪪 ${user.cpf}`}
      </p>
      <aside>
        <Button
          text="Editar"
          onClick={() => editingUser(user)}
          dataTestId={`crud-user-update-user-${user._id}`}
        />
        <Button
          text="Excluir"
          onClick={() => handleRemove(user._id as string)}
          dataTestId={`crud-user-remove-user-${user._id}`}
        />
      </aside>
    </li>
  );
}
