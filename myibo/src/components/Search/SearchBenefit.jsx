import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setSearchResult,
  setLoading,
  setError,
  setToken,
} from "../../state/insuranceSlice";

const SearchBenefit = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { loading, error, searchResult } = useSelector(
    (state) => state.insurance
  );

  useEffect(() => {
    const fetchSearchBenefit = async () => {
      dispatch(setLoading(true));

      const tokenFromStorage = localStorage.getItem("accessToken");

      if (!tokenFromStorage) {
        dispatch(setError("토큰이 존재하지 않습니다."));
        dispatch(setLoading(false));
        return;
      }

      dispatch(setToken(tokenFromStorage));

      try {
        // 쿼리 문자열을 API 명세에 맞게 구성
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await axios.get(
          `https://tearofserver.store/api/v1/non-covered/check/${encodedSearchTerm}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenFromStorage}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.code === 200) {
          dispatch(setSearchResult(response.data));
        } else {
          dispatch(setError(response.data.message));
        }
      } catch (error) {
        dispatch(
          setError("비급여 검색 데이터를 가져오는 데 오류가 발생했습니다.")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (searchTerm) {
      fetchSearchBenefit();
    }
  }, [dispatch, searchTerm]);

  return (
    <div className="Search-main-content">
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h4>급여 여부: {searchResult?.data ? "급여" : "비급여"}</h4>
        </div>
      )}
    </div>
  );
};

export default SearchBenefit;
