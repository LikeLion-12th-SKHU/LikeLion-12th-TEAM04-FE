import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/MyInsurancePage.css";

import {
  setInsuranceData,
  setLoading,
  setError,
  setToken,
} from "../state/insuranceSlice";

const MyInsurancePage = () => {
  const dispatch = useDispatch();
  const {
    insuranceData = [],
    loading,
    error,
  } = useSelector((state) => state.insurance);

  useEffect(() => {
    const fetchInsuranceData = async () => {
      dispatch(setLoading(true));

      // localStorage에서 토큰 가져오기
      const tokenFromStorage = localStorage.getItem("accessToken");

      // 토큰이 존재하지 않으면 에러 처리
      if (!tokenFromStorage) {
        dispatch(setError("토큰이 존재하지 않습니다."));
        dispatch(setLoading(false));
        return;
      }

      dispatch(setToken(tokenFromStorage)); // Redux 상태에 토큰 설정

      try {
        const response = await axios.get(
          "https://tearofserver.store/api/v1/contract",
          {
            headers: {
              Authorization: `Bearer ${tokenFromStorage}`, // 가져온 토큰 사용
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.code === 200) {
          dispatch(setInsuranceData(response.data.data || []));
        } else {
          dispatch(setError(response.data.message));
        }
      } catch (error) {
        if (error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError("데이터를 가져오는 데 오류가 발생했습니다."));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchInsuranceData();
  }, [dispatch]);

  return (
    <div className="MyInsuranceContainer">
      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="MIP-title">
            <h2>회원님의 보험 정보</h2>
          </div>

          <div className="content-wrapper">
            {insuranceData.length === 0 ? (
              <div>보험이력이 없습니다. 보험 정보를 연결해주세요</div>
            ) : (
              <ul>
                {insuranceData.map((insurance, index) => (
                  <li key={index}>
                    {insurance.resCompanyNm}
                    {": "} {insurance.insuranceNm}
                    {insurance.isDentalInsurance
                      ? " (치아 보험)"
                      : " (실비 보험)"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyInsurancePage;
