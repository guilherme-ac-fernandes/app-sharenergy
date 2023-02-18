import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import './Cat.css';

const BASE_URL = 'https://http.cat/';

function Cat() {
  const [code, setCode] = useState<string>('201');
  const [url, setUrl] = useState<string>(`${BASE_URL}${code}.jpg`);

  useEffect(() => {
    if (code.length === 3) {
      return setUrl(`${BASE_URL}${code}.jpg`);
    }
  }, [code]);

  return (
    <section className="cat-section">
      <Header />
      <form>
        <Input
          id="code"
          type="text"
          value={code}
          setValue={setCode}
          dataTestId="cat-status-code"
          placeholder=""
          maxLength={3}
          label="Digite um status code:"
          className="status-form"
        />
      </form>
      <img
        data-testid="cat-image"
        src={url}
        alt="Gato por status code"
        className="cat"
      />
      <Footer />
    </section>
  );
}

export default Cat;
