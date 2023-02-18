// Construção de um Componente Modal proveniente do
// blog da Ashish's Talk (autora: Ashish maurya)
// source: https://blog.theashishmaurya.me/creating-
// a-react-modal-with-react-custom-hooks-and-typescript
import React from 'react';
import CrudUserCard from '../CrudUserCard/CrudUserCard';
import { ICrudUser } from '../../interfaces/ICrudUser';
import './UsersModal.css';

interface UsersModalProps {
  isOpen: boolean;
  toggle: () => void;
  users: ICrudUser[];
  fetchRandomUsers: () => void,
  editingUser: (user: ICrudUser) => void,
}

export default function UsersModal({
  isOpen,
  toggle,
  users,
  fetchRandomUsers,
  editingUser,
}: UsersModalProps) {
  return (
    <section>
      {isOpen && (
        <div className="modal-overlay" onClick={toggle}>
          <div className="modal-box">
            {users.length === 0 ? (
              <div>
                <h3
                  className="not-found-crud-user-message"
                  data-testid="not-found-crud-user-message"
                >
                  Nenhum usuário foi encontrado
                </h3>
              </div>
            ) : (
              <ul className="model-ul">
                {users.map((user) => (
                  <CrudUserCard
                    user={user}
                    editingUser={editingUser}
                    fetchRandomUsers={fetchRandomUsers}
                    key={`crud-user-card-${user._id}`}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
