import { css } from '@styled-system/css';
import { Input } from '@chakra-ui/react';

import alexandernevskycathedral from './monument/alexander-nevsky-cathedral.png';
import bigben from './monument/big-ben.png';
import christtheredeemer from './monument/christ-the-redeemer.png';
import elcapitolio from './monument/el-capitolio.png';
import juchetower from './monument/juche-tower.png';
import mountcameroon from './monument/mount-cameroon.png';
import skytower from './monument/sky-tower.png';
import angkorwat from './monument/angkor-wat.png';
import brazzavillecathedral from './monument/brazzaville-cathedral.png';
import cntower from './monument/cn-tower.png';
import greatwallofchina from './monument/great-wall-of-china.png';
import littlemermaid from './monument/little-mermaid.png';
import praguecastle from './monument/prague-castle.png';
import statueofliberty from './monument/statue-of-liberty.png';
import arenalvolcano from './monument/arenal-volcano.png';
import burjkhalifa from './monument/burj-khalifa.png';
import eiffeltower from './monument/eiffel-tower.png';
import gyeongbokgungpalace from './monument/gyeongbokgung-palace.png';
import mecca from './monument/mecca.png';
import sansalvadorvolcano from './monument/san-salvador-volcano.png';
import tablemountain from './monument/table-mountain.png';

const monuments = {
  alexandernevskycathedral: alexandernevskycathedral,
  bigben: bigben,
  christtheredeemer: christtheredeemer,
  elcapitolio: elcapitolio,
  juchetower: juchetower,
  mountcameroon: mountcameroon,
  skytower: skytower,
  angkorwat: angkorwat,
  brazzavillecathedral: brazzavillecathedral,
  cntower: cntower,
  greatwallofchina: greatwallofchina,
  littlemermaid: littlemermaid,
  praguecastle: praguecastle,
  statueofliberty: statueofliberty,
  arenalvolcano: arenalvolcano,
  burjkhalifa: burjkhalifa,
  eiffeltower: eiffeltower,
  gyeongbokgungpalace: gyeongbokgungpalace,
  mecca: mecca,
  sansalvadorvolcano: sansalvadorvolcano,
  tablemountain: tablemountain,
};

const containerStyle = css({
  width: '100%',
  marginTop: '2%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
});

const flagContainer = css({
  width: '80%',
  maxWidth: '400px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxSizing: 'border-box',
  overflowY: 'auto',
  color: 'black',
  textAlign: 'center',
});

const imageStyle = css({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '20px',
});

const Monument = (props) => {
  return (
    <div className={containerStyle}>
      <h1
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          textShadow: '0 0 10px black',
          marginBottom: '2%',
        }}
      >
        Monument
      </h1>
      <div className={flagContainer}>
        <img
          src={monuments[props.guess.toLocaleLowerCase().replace(/\s|-/g, '')]}
          alt="monument"
          className={imageStyle}
        />
        <span style={{ color: 'black' }}>Temps restant : {props.timer}s</span>

        <p>De quel pays vient ce monument : {props.guess} ?</p>
        <Input
          placeholder="Country"
          marginRight={2}
          backgroundColor={'white'}
          color={'black'}
          boxShadow={'0 0 10px black'}
          width={'50%'}
          onChange={props.onChange}
          value={props.value}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Monument;
