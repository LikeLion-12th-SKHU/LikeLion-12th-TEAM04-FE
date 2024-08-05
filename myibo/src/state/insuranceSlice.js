import { createSlice } from "@reduxjs/toolkit";

const insuranceSlice = createSlice({
  name: "insurance",
  initialState: {
    insuranceData: [],
    recommendedData: [],
    loading: false,
    error: null,
    token: null,
    searchResult: null, // 비급여 검색 결과 추가
  },
  reducers: {
    setInsuranceData(state, action) {
      state.insuranceData = action.payload;
    },
    setRecommendedData(state, action) {
      state.recommendedData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setSearchResult(state, action) {
      // 비급여 검색 결과 리듀서 추가
      state.searchResult = action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const {
  setInsuranceData,
  setRecommendedData,
  setLoading,
  setError,
  setToken,
  setSearchResult,
} = insuranceSlice.actions;

// 리듀서 내보내기
export default insuranceSlice.reducer;
