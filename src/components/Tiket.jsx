import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  width: 502px;
  height: 184px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 8px;
  display: grid;
  grid-template-areas: 'price logo' 'flights flights';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 55px 1fr;
  padding: 20px;
`;
const Price = styled.span`
  grid-area: price;
  color: #2196f3;
  text-transform: uppercase;
  align-self: center;
  justify-self: flex-start;
  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
`;
const CompanyLogo = styled.img`
  grid-area: logo;
  width: 110px;
  height: 36px;
  align-self: center;
  justify-self: flex-end;
`;
const Flights = styled.div`
  grid-area: flights;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Flight = styled.div`
  display: flex;
  gap: 20px;
`;
const InfoItem = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  gap: 0px;
`;
const InfoItemTitle = styled.span`
  color: #a0b0b9;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`;
const InfoItemDescription = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
`;

const formatPrice = (value) => `${value} Р`;
const formatTransfers = (transfers) => transfers.join(', ');
const formatTransfersCount = (count) => `${count} пересадки`;

const Tiket = (props) => {
  const { price, flightsData } = props;

  const flights = flightsData.map((flightData) => {
    const { cites, times, travelTime, transfers } = flightData;
    const transfersCount = transfers.length;
    return (
      <Flight>
        <InfoItem>
          <InfoItemTitle>{cites}</InfoItemTitle>
          <InfoItemDescription>{times}</InfoItemDescription>
        </InfoItem>
        <InfoItem>
          <InfoItemTitle>В пути</InfoItemTitle>
          <InfoItemDescription>{travelTime}</InfoItemDescription>
        </InfoItem>
        <InfoItem>
          <InfoItemTitle> {formatTransfersCount(transfersCount)}</InfoItemTitle>
          <InfoItemDescription>{formatTransfers(transfers)}</InfoItemDescription>
        </InfoItem>
      </Flight>
    );
  });

  return (
    <Container>
      <Price>{formatPrice(price)}</Price>
      <CompanyLogo />
      <Flights>{flights}</Flights>
    </Container>
  );
};

export default Tiket;
