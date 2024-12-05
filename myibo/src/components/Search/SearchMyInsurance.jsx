import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../../styles/SearchMyInsurance.css";

import {
  setInsuranceData,
  setLoading,
  setError,
  setToken,
} from "../../state/insuranceSlice";

const SearchMyInsurance = () => {
  const dispatch = useDispatch();
  const {
    insuranceData = [],
    loading,
    error,
    token,
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
    <div className="Search-main-content">
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h2>회원님께서 가입한 보험이에요</h2>
          {insuranceData.length === 0 ? (
            <div>
              보험이력이 없습니다. <br />
              보험 정보를 연결해주세요
            </div>
          ) : (
            <div>
              {insuranceData.map((insurance, index) => (
                <div key={index} className="insurance-card">
                  <a
                    href={
                      insurance.resHomePage.startsWith("http")
                        ? insurance.resHomePage
                        : "http://" + insurance.resHomePage
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="logo"
                  >
                    공식 페이지
                  </a>
                  <div className="company-name">
                    {insurance.resCompanyNm}
                    <br />
                  </div>
                  <div className="insurance-name">
                    {insurance.insuranceNm}
                    <br />
                  </div>
                  <div className="claim-status">
                    {insurance.isDentalInsurance
                      ? "실비청구불가능"
                      : "실비청구가능"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMyInsurance;
