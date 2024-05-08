import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from './Layout';
import Logo from './Logo';
import Filter from './Filter';
import TiketList from './TiketList';
import LoadMoreButton from './LoadMoreButton';
import TransferFilter from './TransferFilter';
import * as actions from '../store/actions';
import { LoadStub } from './LoadStub';

function App({ load, isLoading }) {
  useEffect(() => {
    load();
  }, []);

  return (
    <Layout header={<Logo />} aside={<TransferFilter />}>
      <Filter />
      {isLoading ? <LoadStub /> : <TiketList />}
      <LoadMoreButton />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.tikets.length === 0,
});

const mapDispatchToProps = (dispatch) => {
  const { load } = bindActionCreators(actions, dispatch);
  return {
    load,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
