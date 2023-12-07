// RegistrationForm.js

import { useState } from 'react';
import { css } from '@styled-system/css';

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

const Inscription = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    Pseudo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour traiter les données d'inscription
    console.log('Submitted data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className={formStyle} style={{ marginTop: '2%' }}>
      <u>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Inscription</h1>
      </u>
      <label className={labelStyle}>
        Nom:
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputStyle}
          style={{ fontWeight: 'normal' }}
        />
      </label>
      <br></br>

      <label className={labelStyle}>
        E-mail:
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputStyle}
          style={{ fontWeight: 'normal' }}
        />
      </label>
      <br></br>

      <label className={labelStyle}>
        Pseudo:
        <input
          type="Pseudo"
          name="Pseudo"
          placeholder="Pseudo"
          value={formData.Pseudo}
          onChange={handleChange}
          required
          className={inputStyle}
          style={{ fontWeight: 'normal' }}
        />
      </label>
      <br></br>

      <label className={labelStyle}>
        Mot de passe:
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={inputStyle}
          style={{ fontWeight: 'normal' }}
        />
      </label>

      <br></br>

      <button
        type="submit"
        style={{ background: '#007BFF', color: 'white' }}
        className={buttonStyle}
      >
        S'inscrire
      </button>
    </form>
  );
};

export default Inscription;
