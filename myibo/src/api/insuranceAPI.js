import axios from "axios";
import {
  setLoading,
  setRecommendedData,
  setError,
} from "../state/insuranceSlice";

export const fetchRecommendedInsurance = (token) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      "https://tearofserver.store/api/v1/contract/simple/recommend",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰을 Bearer 형식으로 추가
        },
      }
    );

    if (response.data.code === 200) {
      dispatch(setRecommendedData(response.data.data || [])); // 추천 데이터 업데이트
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error) {
    dispatch(setError("보험 상품 추천 요청 중 오류가 발생했습니다."));
  } finally {
    dispatch(setLoading(false));
  }
};
