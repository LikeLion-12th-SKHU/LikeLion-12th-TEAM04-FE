import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setSearchResult,
  setLoading,
  setError,
} from "../../state/insuranceSlice";

const SearchBenefit = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { loading, error, searchResult } = useSelector(
    (state) => state.insurance
  );

  useEffect(() => {
    const fetchSearchBenefit = async () => {
      dispatch(setLoading(true));

      try {
        const response = await axios.get(
          `https://tearofserver.store/api/v1/contract?query=${searchTerm}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiQXV0aG9yaXphdGlvbiI6IlJPTEVfVVNFUiIsImV4cCI6MTcyMjc4MjE1NH0.8sPNdAV-4XkvT6yEnbMtOa50igz1PKCfbIYr0ajANUE`, // 더미 토큰 사용
            },
          }
        );

        if (response.data.code === 200) {
          dispatch(setSearchResult(response.data.data || {}));
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
    <div>
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : searchResult ? (
        <div>
          <h4>검색 결과: {searchResult.SearchResult}</h4>
          <p>검색어: {searchResult.SearchQuery}</p>
          <ul>
            {searchResult.appliedInsuranceList?.map((insurance) => (
              <li key={insurance.id}>{insurance.보험이름}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>급여 비급여 여부 정보 표시</div>
      )}
    </div>
  );
};

export default SearchBenefit;
