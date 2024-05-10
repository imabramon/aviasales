import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import Layout from './Layout';
import Logo from './Logo';
import Filter from './Filter';
import TiketList from './TiketList';
import LoadMoreButton from './LoadMoreButton';
import TransferFilter from './TransferFilter';
import * as actions from '../store/actions';
import { LoadStub } from './LoadStub';
import 'react-toastify/dist/ReactToastify.css';
import { useInternetWatcher } from '../hooks/useInternetWatcher';

function App({ load, isFirstLoading, isLoading }) {
  const serverErrorNotify = () => toast('Не все билеты загружены. Перезагрузите, чтобы увидеть все билеты');
  const offlineNotify = () => toast('Соеденение потеряно');
  const onlineNotify = () => toast('Соеденение восстановлено');
  useEffect(() => {
    load(() => {
      serverErrorNotify();
    });
  }, []);

  useInternetWatcher(onlineNotify, offlineNotify);
  return (

    <Layout header={<Logo />} aside={<TransferFilter />}>
      <ToastContainer />
      <Filter />
      {isLoading ? <BarLoader color="#2196f3" width="100%" /> : null}
      {isFirstLoading ? <LoadStub /> : <TiketList />}
      <LoadMoreButton />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isLoadingFirst: state.tikets.length === 0,
  isLoading: !state.isStoped,
});

const mapDispatchToProps = (dispatch) => {
  const { load } = bindActionCreators(actions, dispatch);
  return {
    load,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
