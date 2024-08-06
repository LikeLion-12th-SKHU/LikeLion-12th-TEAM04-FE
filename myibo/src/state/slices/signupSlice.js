// src/state/slices/signupSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    userName: '',
    identity: '',
    birthDate: '',
    telecom: '',
    phoneNo: '',
    id: '',
    password: '',
    email: '',
    smsAuthNo: '',
    is2Way: 'true',
    twoWayInfo: {
      jobIndex: '',
      threadIndex: '',
      jti: '',
      twoWayTimestamp: '',
    },
    isSmsSent: false,
    firstAuthCompleted: false, // 1차 인증 완료 상태
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setIdentity: (state, action) => {
      state.identity = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    setTelecom: (state, action) => {
      state.telecom = action.payload;
    },
    setPhoneNo: (state, action) => {
      state.phoneNo = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSmsAuthNo: (state, action) => {
      state.smsAuthNo = action.payload;
    },
    setTwoWayInfo: (state, action) => {
      state.twoWayInfo = action.payload;
    },
    setIsSmsSent: (state, action) => {
      state.isSmsSent = action.payload;
    },
    setFirstAuthCompleted: (state, action) => { // 1차 인증 완료 상태 추가
      state.firstAuthCompleted = action.payload;
    },
  },
});

export const {
  setUserName,
  setIdentity,
  setBirthDate,
  setTelecom,
  setPhoneNo,
  setId,
  setPassword,
  setEmail,
  setSmsAuthNo,
  setTwoWayInfo,
  setIsSmsSent,
  setFirstAuthCompleted, // 1차 인증 완료 상태 추가
} = signupSlice.actions;

export default signupSlice.reducer;
