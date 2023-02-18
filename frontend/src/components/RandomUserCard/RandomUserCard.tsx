import React from 'react';
import { IRandomUser } from '../../interfaces/IRandomUser';
import './RandomUserCard.css';

interface RandomUserCardProps {
  user: IRandomUser;
  index: number
}

export default function RandomUserCard({
  user: {
    fullname, username, age, email, image,
  },
  index,
}: RandomUserCardProps) {
  return (
    <section
      data-testid={`random-user-card-${index}`}
      className="random-user-card-container"
    >
      <img
        src={image}
        alt={fullname}
        data-testid={`random-user-img-${index}`}
      />
      <div className="random-user-card-container-info">
        <p
          className="random-user-card-container-info-fullname"
          data-testid={`random-user-fullname-${index}`}
        >
          {fullname}
        </p>
        <p data-testid={`random-user-username-${index}`}>{`@${username}`}</p>
        <a
          data-testid={`random-user-email-${index}`}
          href={`mailto:${email}`}
        >
          <p>{email}</p>
        </a>
        <p
          data-testid={`random-user-age-${index}`}
        >
          {`${age} anos`}

        </p>
      </div>
    </section>
  );
}
