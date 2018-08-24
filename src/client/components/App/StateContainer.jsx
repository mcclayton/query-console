import { h } from 'preact';
import { withStateHandlers } from 'recompose';
import API from '../../api';

const api = new API('http://localhost:3006');

export default withStateHandlers(
  {
    logs: [],
    services: [],
    loading: false,
    error: null
  },
  {
    fetchServices: () => (errorCb, successCb) => {
      api
        .fetchServices()
        .then((resp) => successCb(resp.data))
        .catch((err) => errorCb(err));
    },
    fetchLogs: () => (errorCb, successCb) => {
      api
        .fetchLogs()
        .then((resp) => successCb(resp.data))
        .catch((err) => errorCb(err));
      return { loading: true };
    },
    clearLogs: () => (errorCb, successCb) => {
      api
        .clearLogs()
        .then((resp) => successCb(resp.data))
        .catch((err) => errorCb(err));
      return {};
    },
    clearLogsSuccess: () => (logs) => ({ logs: logs }),
    fetchServicesSuccess: () => (services) => ({ services: services }),
    fetchLogsSuccess: () => (logs) => ({ logs: logs, loading: false }),
    onError: () => (err) => ({ error: err, loading: false })
  }
);
