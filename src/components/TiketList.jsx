import React from 'react';
import Tiket from './Tiket';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TiketList = (props) => {
  return (
    <Container>
      <Tiket
        price="13400"
        flightsData={[
          {
            cites: 'MOW – HKT',
            times: '10:45 – 08:00',
            travelTime: '21ч 15м',
            transfers: ['HKG', 'JNB'],
          },
          {
            cites: 'MOW – HKT',
            times: '10:45 – 08:00',
            travelTime: '21ч 15м',
            transfers: ['HKG', 'JNB'],
          },
        ]}
      />
      <Tiket
        price="13400"
        flightsData={[
          {
            cites: 'MOW – HKT',
            times: '10:45 – 08:00',
            travelTime: '21ч 15м',
            transfers: ['HKG', 'JNB'],
          },
          {
            cites: 'MOW – HKT',
            times: '10:45 – 08:00',
            travelTime: '21ч 15м',
            transfers: ['HKG', 'JNB'],
          },
        ]}
      />
    </Container>
  );
};

export default TiketList;
