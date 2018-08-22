import axios from 'axios';

const _getSharedBaseHeaders = () => ({});

const DELETE_HEADERS = {
  'Content-Type': 'application/json',
};

const getHeaders = (headers = {}) => (
  Object.assign(
    {},
    _getSharedBaseHeaders(),
    headers,
  )
);


const api = (logServerUrl) => ({
  fetchServices() {
    return axios.request({
      url: `${logServerUrl}/services`,
      method: 'get',
    });
  },

  fetchLogs() {
    return axios.request({
      url: `${logServerUrl}/logs`,
      method: 'get',
    });
  },

  clearLogs() {
    return axios.request({
      url: `${logServerUrl}/logs`,
      method: 'delete',
      headers: getHeaders(DELETE_HEADERS),
    });
  },
});

export default api;
