import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const Price = styled.span``;
const CompanyLogo = styled.img``;
const Flights = styled.div``;
const Flight = styled.div``;
const InfoItem = styled.div``;
const InfoItemTitle = styled.h3``;
const InfoItemDescription = styled.span``;

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
