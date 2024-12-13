import axios from '../http/axios'

function createOrder(params) {
  return axios.post('/saveOrder', params);
}

function getOrderList(params) {
  return axios.get('/order', { params });
}

function getOrderDetail(id) {
  return axios.get(`/order/${id}`);
}

function cancelOrder(id) {
  return axios.put(`/order/${id}/cancel`);
}

function confirmOrder(id) {
  return axios.put(`/order/${id}/finish`)
}

function payOrder(params) {
  return axios.get('/paySuccess', { params })
}

export default {
  createOrder,
  getOrderList,
  getOrderDetail,
  cancelOrder,
  confirmOrder,
  payOrder
}




