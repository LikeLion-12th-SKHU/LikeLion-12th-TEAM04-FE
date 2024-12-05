import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  setSmsAuthNo,
  setFirstAuthCompleted,
} from '../state/slices/signupSlice';
import '../styles/SignupForm.css';

const SecondSignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 추가된 부분
  const formData = useSelector((state) => state.signup);
  const [errors, setErrors] = useState({
    smsAuthNo: '',
  });

  const validateForm = useCallback(() => {
    let newErrors = {
      smsAuthNo: '',
    };
    if (formData.smsAuthNo.length !== 6) {
      newErrors.smsAuthNo = '휴대폰 본인확인 인증번호 6자리를 입력하세요';
    }
    setErrors(newErrors);
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\s+/g, ''); // 공백 제거
    if (name === 'smsAuthNo' && sanitizedValue.length <= 6) {
      dispatch(setSmsAuthNo(sanitizedValue));
    }
  };

  const isFormValid = () => {
    return formData.smsAuthNo.length === 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post('https://tearofserver.store/auth/sign-up/two-way', {
          organization: '0001',
          id: formData.id,
          userName: formData.userName,
          identity: formData.identity,
          birthDate: formData.birthDate,
          telecom: formData.telecom,
          phoneNo: formData.phoneNo,
          password: formData.password,
          email: formData.email,
          smsAuthNo: formData.smsAuthNo,
          is2Way: 'true',
          twoWayInfo: {
            jobIndex: formData.twoWayInfo.jobIndex,
            threadIndex: formData.twoWayInfo.threadIndex,
            jti: formData.twoWayInfo.jti,
            twoWayTimestamp: formData.twoWayInfo.twoWayTimestamp,
          },
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiQXV0aG9yaXphdGlvbiI6IlJPTEVfVVNFUiIsImV4cCI6MTcyMjc4MjE1NH0.8sPNdAV-4XkvT6yEnbMtOa50igz1PKCfbIYr0ajANUE',
          },
          params: {
            thirdPartyToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlX3R5cGUiOiIxIiwic2NvcGUiOlsicmVhZCJdLCJzZXJ2aWNlX25vIjoiMDAwMDA0MzM4MDAyIiwiZXhwIjoxNzIzMTkxNDc5LCJhdXRob3JpdGllcyI6WyJJTlNVUkFOQ0UiLCJQVUJMSUMiLCJCQU5LIiwiRVRDIiwiU1RPQ0siLCJDQVJEIl0sImp0aSI6ImJiMDc1MGUzLWE3NjMtNDc1Ny04NTg3LTc4ZDJlM2YwNGRiMCIsImNsaWVudF9pZCI6ImRiZDJmMTRmLWE3NGUtNDYzZS04ZTFmLTkzYTIxMDFlNTE1NyJ9.nTmb1HFT9sQ7MeYRGjB8ORKQ63RzrxK038N2VAehZy3jl7nRLg_w3VbQw-MiLhCJb8-JYUstsi9l7KvxNDmngAtuimXnucpltEq019rU7JPDaeFZLfCD_EIWTknJt1V_rPXr6if39OKdf05HBQb2Pi7O5qXqMhWmjWeLNlFkMUZvk5XTxSUCPjV8Rz21SUmkJ5EyyNh3M61It7bR375NnEwpdvrF1L5FyK4p_Vfn1D7xdBZHGE5k7uKVyOJN1dk3JVDkGCJcHgabOCMHU01jyZvRr8DI7NDnsKM0IzcdFcaBIWnRzBZ6DgH6F5UJ8PXqSghyC05V6hd4hTxUmhjw2A', 
          },
        });

        console.log('2차 인증 응답:', response.data);

        // 엑세스 토큰 저장
        localStorage.setItem('accessToken', response.data.data.accessToken);

        // 2차 인증 완료 처리
        dispatch(setFirstAuthCompleted(false));
        navigate('/'); // 추가된 부분
      } catch (error) {
        console.error('2차 인증 에러:', error.response?.data || error.message);
      }
    } else {
      validateForm();
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            휴대폰 인증번호
            <input
              type="text"
              name="smsAuthNo"
              value={formData.smsAuthNo}
              onChange={handleChange}
              placeholder="휴대폰 인증번호 6자리 입력하세요"
              required
            />
          </label>
          {errors.smsAuthNo && <p className="error-message">{errors.smsAuthNo}</p>}
        </div>
        <button type="submit" className={`submit-button ${isFormValid() ? 'active' : 'inactive'}`} disabled={!isFormValid()}>
          인증하기
        </button>
      </form>
    </div>
  );
};

export default SecondSignupForm;
