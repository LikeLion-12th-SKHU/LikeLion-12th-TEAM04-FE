// src/utils/api.js

import axios from 'axios';

export const apiCall = async (url, method = 'GET', data = null) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return;
  }

  try {
    const config = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 엑세스 토큰 포함
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.error('API call error:', error.response?.data || error.message);
    throw error;
  }
};
