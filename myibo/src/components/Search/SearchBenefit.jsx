import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/SearchBenefit.css";
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
        dispatch(setError("로그인 해주세요"));
        dispatch(setLoading(false));
        return;
      }

      dispatch(setToken(tokenFromStorage));

      try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await axios.get(
          `https://tearofserver.store/api/v1/non-covered/check/shortName?shortName=${encodedSearchTerm}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenFromStorage}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.code === 200) {
          console.log("Search Result Data:", response.data.data);
          dispatch(setSearchResult(response.data.data)); // 상태 업데이트
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
        <div className="result-container">
          <h2>
            {searchTerm}는 국민건강보험에 따르면{" "}
            {searchResult ? "비급여" : "급여"}에 해당 되나,
          </h2>
          <h3>치료 목적과 방법 및 사용 약제에 따라 달라질 수 있습니다.</h3>
          <p>
            *치료명을 정확하게 입력하지 않았을 시 정확도가 떨어질 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBenefit;
