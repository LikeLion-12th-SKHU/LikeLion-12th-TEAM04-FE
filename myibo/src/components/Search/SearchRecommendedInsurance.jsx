import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  setRecommendedData,
  setLoading,
  setError,
  setToken,
} from "../../state/insuranceSlice";

const SearchRecommendedInsurance = () => {
  const dispatch = useDispatch();
  const {
    recommendedData = [],
    loading,
    error,
    token,
  } = useSelector((state) => state.insurance);

  const dummyToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiQXV0aG9yaXphdGlvbiI6IlJPTEVfVVNFUiIsImV4cCI6MTcyMjg0NzUyM30.MJXpTFrm1FKlqxbRO7qwZDODGL4_tjnAYKyi8IC_A_o";
  useEffect(() => {
    const fetchRecommendedData = async () => {
      dispatch(setLoading(true));
      dispatch(setToken(dummyToken));

      try {
        const response = await axios.get(
          "https://tearofserver.store/api/v1/contract/random",
          {
            headers: {
              Authorization: `Bearer ${dummyToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.code === 200) {
          dispatch(setRecommendedData(response.data.data || []));
        } else {
          dispatch(setError(response.data.message || "알 수 없는 오류"));
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        dispatch(
          setError(
            error.response
              ? error.response.data.message || "서버 오류 발생"
              : "네트워크 오류 발생"
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRecommendedData();
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h3>이런 보험도 있어요!</h3>
          {recommendedData.length === 0 ? (
            <div></div>
          ) : (
            <ul>
              {recommendedData.map((insurance, index) => (
                <li key={index}>
                  <strong>보험사 이름:</strong> {insurance.resCompanyNm} <br />
                  <strong>보험 상품명:</strong> {insurance.insuranceNm} <br />
                  <strong>치과 보험 여부:</strong>{" "}
                  {insurance.isDentalInsurance ? "예" : "아니요"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRecommendedInsurance;
