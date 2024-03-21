import React from 'react';
import styled from 'styled-components';
import {
  formatCities,
  formatFlightTime,
  formatTravelTime,
  formatTransfersCount,
  formatTransfers,
  formatPrice,
} from '../utils/formatting';

const Container = styled.div`
  font-family: 'Open Sans';
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
  background-color: white;
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

const Tiket = (props) => {
  const { price, flights: flightsData, companyLogoSrc } = props;

  const flights = flightsData.map((flightData) => {
    const { cites, date, travelTime, transfers } = flightData;
    const transfersCount = transfers.length;
    return (
      <Flight>
        <InfoItem>
          <InfoItemTitle>{formatCities(cites)}</InfoItemTitle>
          <InfoItemDescription>{formatFlightTime(date, travelTime)}</InfoItemDescription>
        </InfoItem>
        <InfoItem>
          <InfoItemTitle>В пути</InfoItemTitle>
          <InfoItemDescription>{formatTravelTime(travelTime)}</InfoItemDescription>
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
      <CompanyLogo src={companyLogoSrc} />
      <Flights>{flights}</Flights>
    </Container>
  );
};

export default Tiket;
