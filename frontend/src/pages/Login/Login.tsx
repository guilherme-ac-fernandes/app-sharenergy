import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CheckBox from '../../components/CheckBox/CheckBox';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { IUser } from '../../interfaces/IUser';
import { getItem, removeItem, setItem } from '../../helpers/localStorage';
import logo from '../../assets/sharenergy_black.svg';
import solarEnergy from '../../assets/solar_energy.png';
import './Login.css';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isAble, setIsAble] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    const user: IUser = getItem('user');
    if (user || user !== null) {
      setUsername(user.username);
      setPassword(user.password);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (username.length >= 3 && password.length >= 8) {
      return setIsAble(false);
    }
    return setIsAble(true);
  }, [username, password]);

  // Correção da tipagem do event proveniente do Stack OverFlow
  // source: https://stackoverflow.com/questions/53650226/onsub
  // mit-issue-with-form-in-react-and-tsx
  const handleSubmit = () => {
    removeItem('user');
    if (rememberMe) {
      setItem('user', { username, password });
    }
    if (username === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
      return history.push('/users/random');
    }
    return alert('Usuário inválido!');
  };

  return (
    <section className="login">
      <form>
        <img src={logo} alt="Logo" />
        <Input
          id="username"
          type="text"
          value={username}
          setValue={setUsername}
          dataTestId="login-username"
          placeholder="Nome do usuário"
        />
        <Input
          id="password"
          type="password"
          value={password}
          setValue={setPassword}
          dataTestId="login-password"
          placeholder="Senha"
        />
        <CheckBox
          id="rememberMe"
          checked={rememberMe}
          setValue={setRememberMe}
          dataTestId="login-remember-me"
          label="Lembre de mim"
        />
        <Button
          text="Entrar"
          onClick={handleSubmit}
          dataTestId="login-sign-in"
          disabled={isAble}
        />
      </form>

      <div>
        <img src={solarEnergy} alt="Placas para captação de energia solar" />
      </div>
    </section>
  );
}

export default Login;
