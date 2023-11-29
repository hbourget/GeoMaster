import React, { useState } from 'react';
import { css } from '@styled-system/css';
import { useNavigate } from 'react-router-dom';

const containerStyle = css({
  width: '65%',
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
});

const sectionStyle = css({
  marginBottom: '20px',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '400px',
  boxSizing: 'border-box',
  overflowY: 'auto',
});

const listItemStyle = (index, status) =>
  css({
    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#fff',
    padding: '10px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: status === 'En attente de joueur' ? 'orange' : 'black',
  });

const joinButtonStyle = css({
  'padding': '12px',
  'backgroundColor': '#007BFF',
  'color': '#fff',
  'border': 'none',
  'borderRadius': '4px',
  'cursor': 'pointer',
  'transition': 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const Party = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoom = {
      id: Date.now(),
      name: roomName,
      players: [],
      status: 'En attente de joueur',
    };

    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setRoomName('');
  };

  const handleJoinRoom = (roomId) => {
    // Logique pour rejoindre la room
    console.log(`Joining room ${roomId}`);
    // Rediriger vers la page "Home"
    navigate('/home');
  };

  return (
    <div className={containerStyle} style={{ marginTop: '2%' }}>
      <div className={sectionStyle}>
        <h2 style={{ fontWeight: 'bold' }}>Créer une nouvelle room</h2>

        <input
          type="text"
          placeholder="Nom de la room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <br></br>

        <button
          style={{ background: '#007BFF', padding: '5px', color: '#fff', borderRadius: '4px' }}
          onClick={handleCreateRoom}
        >
          Créer
        </button>
      </div>

      <div className={sectionStyle}>
        <h2 style={{ fontWeight: 'bold', color: 'black' }}>Liste des rooms</h2>
        <ul style={{ listStyle: 'none', padding: 0, overflowY: 'auto', maxHeight: '300px' }}>
          {rooms.map((room, index) => (
            <li key={room.id} className={listItemStyle(index, room.status)}>
              <div>
                <strong>{room.name}</strong>
                <p style={{ color: 'black' }}>{`${room.players.length}/4 joueurs`}</p>
                <p>{room.status}</p>
              </div>
              {room.players.length < 4 && (
                <button
                  style={{ background: '#007BFF', padding: '5px', color: '#fff' }}
                  onClick={() => handleJoinRoom(room.id)}
                  className={joinButtonStyle}
                >
                  Rejoindre
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Party;
