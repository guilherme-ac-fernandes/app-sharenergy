import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { IDog } from '../../interfaces/IDog';
import { getDog } from '../../requests/dogRequest';
import './Dog.css';

function Dog() {
  const [dog, setDog] = useState<IDog>({} as IDog);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDog = async () => {
    const responseDog = await getDog();
    setDog(responseDog);
  };

  useEffect(() => {
    setLoading(true);
    fetchDog();
    setLoading(false);
  }, []);

  return (
    <section className="dog-container">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="dog-section">
          <img
            data-testid="dog-image"
            src={dog.url}
            alt="Cão aleatório"
            className="dog"
          />
          <Button
            text="Novo Cão"
            onClick={fetchDog}
            dataTestId="fetch-new-dog"
          />
        </div>
      )}
      <Footer />
    </section>
  );
}

export default Dog;
