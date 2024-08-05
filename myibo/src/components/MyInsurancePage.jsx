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
    token,
  } = useSelector((state) => state.insurance);

  const dummyToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiQXV0aG9yaXphdGlvbiI6IlJPTEVfVVNFUiIsImV4cCI6MTcyMjg0NzUyM30.MJXpTFrm1FKlqxbRO7qwZDODGL4_tjnAYKyi8IC_A_o";
  useEffect(() => {
    const fetchInsuranceData = async () => {
      dispatch(setLoading(true));
      dispatch(setToken(dummyToken));

      try {
        const response = await axios.get(
          "https://tearofserver.store/api/v1/contract",
          {
            headers: {
              Authorization: `Bearer ${dummyToken}`,
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
            {" "}
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
