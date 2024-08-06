// src/state/slices/loginSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    id: '',
    password: '',
    isAuthenticated: false,
    error: null,
    accessToken: '',
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload; // 사용자의 ID 설정
    },
    setPassword: (state, action) => {
      state.password = action.payload; // 사용자의 비밀번호 설정
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // 인증 상태 설정
    },
    setError: (state, action) => {
      state.error = action.payload; // 오류 메시지 설정
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload; // 액세스 토큰 설정
    },
  },
});

export const { setId, setPassword, setAuthenticated, setError, setAccessToken } = loginSlice.actions;

// 비동기 로그인을 처리하는 thunk
export const login = (id, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://baseurl/auth/login', {
      id,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch(setAccessToken(response.data.data.accessToken));
    dispatch(setAuthenticated(true));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setAuthenticated(false));
  }
};

export default loginSlice.reducer;
