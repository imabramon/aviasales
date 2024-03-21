import React, { useEffect } from 'react';
import Layout from './Layout';
import Logo from './Logo';
import Filter from './Filter';
import TiketList from './TiketList';
import LoadMoreButton from './LoadMoreButton';
import TransferFilter from './TransferFilter';
import * as actions from '../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const App = ({ load }) => {
  useEffect(() => {
    load();
  }, []);

  return (
    <Layout header={<Logo />} aside={<TransferFilter />}>
      <Filter />
      <TiketList />
      <LoadMoreButton />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  const { load } = bindActionCreators(actions, dispatch);
  return {
    load,
  };
};

export default connect(() => ({}), mapDispatchToProps)(App);
