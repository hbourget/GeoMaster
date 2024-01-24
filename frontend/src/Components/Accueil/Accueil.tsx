import { css } from '@styled-system/css';

const containerStyle = css({
  width: '100%',
  marginTop: '2%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
});

const leaderboard = css({
  position: 'relative',
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
  height: '400px',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  overflowY: 'auto',
  color: 'white',
  textAlign: 'center',
  textShadow: '0 0 10px black',
  boxShadow: '0 0 10px white',
});

const MasterligneStyles = {
  backgroundColor: '#004590',
  borderRadius: '8px',
  padding: '3%',
  marginBottom: '2%',
  fontWeight: 'bold',
};

const ligneStyles = {
  backgroundColor: '#007BFF',
  borderRadius: '8px',
  padding: '3%',
  marginBottom: '2%',
  fontWeight: 'bold',
};

const Accueil = () => {
  return (
    <div className={containerStyle}>
      <h1
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '1%',
          textShadow: '0 0 10px black',
        }}
      >
        GeoMaster
      </h1>
      <br />

      <div className={leaderboard}>
        <h4>Meilleurs joueurs</h4>
        <br></br>

        <div className="container text-center conteneur">
          <div className="AccueilHover row row-cols-3" style={MasterligneStyles}>
            <div className="col">Rang</div>
            <div className="col">Nom</div>
            <div className="col">Score</div>
          </div>

          <div className="AccueilHover row row-cols-3" style={ligneStyles}>
            <div className="col">1</div>
            <div className="col">Hug</div>
            <div className="col">4500</div>
          </div>
          <div className="AccueilHover row row-cols-3" style={ligneStyles}>
            <div className="col">2</div>
            <div className="col">Max</div>
            <div className="col">2500</div>
          </div>
          <div className="AccueilHover row row-cols-3" style={ligneStyles}>
            <div className="col">3</div>
            <div className="col">Clem</div>
            <div className="col">300</div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Accueil;
