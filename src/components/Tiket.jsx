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

const Tiket = (props) => {
  return (
    <Container>
      <Price>13 400 Р</Price>
      <CompanyLogo />
      <Flights>
        <Flight>
          <InfoItem>
            <InfoItemTitle>MOW – HKT</InfoItemTitle>
            <InfoItemDescription>10:45 – 08:00</InfoItemDescription>
          </InfoItem>
          <InfoItem>
            <InfoItemTitle>В пути</InfoItemTitle>
            <InfoItemDescription>21ч 15м</InfoItemDescription>
          </InfoItem>
          <InfoItem>
            <InfoItemTitle>2 пересадки</InfoItemTitle>
            <InfoItemDescription>HKG, JNB</InfoItemDescription>
          </InfoItem>
        </Flight>
        <Flight>
          <InfoItem>
            <InfoItemTitle>MOW – HKT</InfoItemTitle>
            <InfoItemDescription>10:45 – 08:00</InfoItemDescription>
          </InfoItem>
          <InfoItem>
            <InfoItemTitle>В пути</InfoItemTitle>
            <InfoItemDescription>21ч 15м</InfoItemDescription>
          </InfoItem>
          <InfoItem>
            <InfoItemTitle>2 пересадки</InfoItemTitle>
            <InfoItemDescription>HKG, JNB</InfoItemDescription>
          </InfoItem>
        </Flight>
      </Flights>
    </Container>
  );
};

export default Tiket;
