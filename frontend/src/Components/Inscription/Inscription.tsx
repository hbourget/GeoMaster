import { useState } from 'react';
import { css } from '@styled-system/css';
import { Button, Input } from '@chakra-ui/react';
import { usePostQuery } from '../../Hooks/useQuery';
import { useAtom } from 'jotai';
import { currentUserID } from '../../jotai';
import { useMutation } from '@tanstack/react-query';

const formStyle = css({
  backgroundColor: '#fff',
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const labelStyle = css({
  display: 'block',
  margin: '15px 0',
  fontWeight: 'bold',
});

const inputStyle = css({
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginBottom: '10px',
});

const buttonStyle = css({
  'width': '100%',
  'padding': '12px',
  'color': 'white',
  'border': 'none',
  'borderRadius': '4px',
  'cursor': 'pointer',
  'transition': 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const register = async (data) => {
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    mode: 'cors',
  });
  const json = await response.json();
  return json;
};

const Inscription = () => {
  const [, setUserID] = useAtom(currentUserID);

  const [formData, setFormData] = useState({
    password: '',
    username: '',
  });

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUserID(data.userId);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password') setPassword(value);
    if (name === 'password-confirm') setPasswordConfirm(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    console.log('Submitted data:', formData);
    // mutation.isSuccess && setUserID(1);
  };

  // mutation.isSuccess && store.set('user', mutation.data);

  return (
    <form onSubmit={handleSubmit} className={formStyle} style={{ marginTop: '2%' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Inscription</h1>

      <label className={labelStyle}>
        Username:
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className={inputStyle}
          style={{ fontWeight: 'normal' }}
        />
      </label>

      <label className={labelStyle}>
        Mot de passe:
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={inputStyle}
          style={{ fontWeight: 'normal' }}
        />
      </label>

      <label className={labelStyle}>
        Confirmation du mot de passe:
        <Input
          type="password"
          name="password-confirm"
          placeholder="Password"
          onChange={handleChange}
          required
          className={inputStyle}
          style={{ fontWeight: 'normal' }}
        />
      </label>

      {password !== passwordConfirm && (
        <p style={{ color: 'red' }}>Les mots de passe ne correspondent pas</p>
      )}

      <Button
        type="submit"
        style={{ background: '#007BFF', color: 'white' }}
        className={buttonStyle}
        // disabled={password !== passwordConfirm}
        disabled
      >
        S'inscrire
      </Button>

      {mutation.isError && <p style={{ color: 'red' }}>Une erreur est survenue</p>}
      {mutation.isSuccess && <p style={{ color: 'green' }}>Inscription réussie</p>}
    </form>
  );
};

export default Inscription;
