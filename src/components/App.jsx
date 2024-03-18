import React from 'react';
import Layout from './Layout';
import Logo from './Logo';
import Filter from './Filter';
import TiketList from './TiketList';
import LoadMoreButton from './LoadMoreButton';
import TransferFilter from './TransferFilter';

const App = () => {
  return (
    <Layout header={<Logo />} aside={<TransferFilter />}>
      <Filter />
      <TiketList />
      <LoadMoreButton />
    </Layout>
  );
};

export default App;
