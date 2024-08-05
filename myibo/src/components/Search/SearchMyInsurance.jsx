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
    <div>
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="SMI-container">
          {" "}
          <h3>회원님께서 가입한 보험이에요.</h3>
          {insuranceData.length === 0 ? (
            <div>보험이력이 없습니다. 보험 정보를 연결해주세요</div>
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
                    로고
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
