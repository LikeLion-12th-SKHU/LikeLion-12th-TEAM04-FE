import axios from "axios";
import { setLoading, setSearchResult, setError } from "../state/insuranceSlice";

// 비급여 검색 API 요청 함수
export const fetchSearchBenefit = (query, token) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      `https://tearofserver.store/api/v1/contract?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Bearer 토큰 추가
        },
      }
    );

    if (response.data.code === 200) {
      dispatch(setSearchResult(response.data.data)); // 비급여 검색 결과 업데이트
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error) {
    dispatch(setError("비급여 검색 요청 중 오류가 발생했습니다."));
  } finally {
    dispatch(setLoading(false));
  }
};
