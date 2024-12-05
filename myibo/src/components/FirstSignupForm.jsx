import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  setUserName,
  setIdentity,
  setBirthDate,
  setTelecom,
  setPhoneNo,
  setId,
  setPassword,
  setEmail,
  setFirstAuthCompleted,
  setTwoWayInfo,
} from '../state/slices/signupSlice';
import '../styles/SignupForm.css';

const FirstSignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 추가된 부분
  const formData = useSelector((state) => state.signup);
  const [errors, setErrors] = useState({
    userName: '',
    identity: '',
    birthDate: '',
    phoneNo: '',
    id: '',
    email: '',
    password: '',
  });

  const validateEmailDomain = (email) => {
    const allowedDomains = [
      'naver.com', 'hanmail.net', 'daum.net', 'nate.com', 'kcredit.or.kr',
      'korea.kr', 'yahoo.com', 'goe.go.kr', 'chol.com', 'sen.go.kr',
      'gyo6.net', 'jnu.ac.kr', 'kakao.com'
    ];
    const emailDomain = email.split('@')[1];
    return allowedDomains.includes(emailDomain);
  };

  const validateForm = useCallback(() => {
    let newErrors = {
      userName: '',
      identity: '',
      birthDate: '',
      phoneNo: '',
      id: '',
      email: '',
      password: '',
    };
    if (!formData.userName) {
      newErrors.userName = '이름을 입력하세요';
    }
    if (formData.identity.length !== 7) {
      newErrors.identity = '주민등록번호 뒷 7자리를 입력하세요';
    }
    if (formData.birthDate.length !== 6) {
      newErrors.birthDate = '주민등록번호 앞 6자리를 입력하세요';
    }
    if (formData.phoneNo.length !== 11) {
      newErrors.phoneNo = '전화번호 11자리를 입력하세요';
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]{5,11}$/.test(formData.id)) {
      newErrors.id = '아이디는 영문으로 시작하고, 영문 + 숫자 6자 ~ 12자로 입력하세요';
    }
    if (!formData.email || !validateEmailDomain(formData.email)) {
      newErrors.email = '이메일 도메인은 허용된 도메인만 사용 가능합니다';
    }
    if (!formData.password || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?_~]).{9,20}$/.test(formData.password)) {
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 9자 ~ 20자로 입력하세요';
    }
    setErrors(newErrors);
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\s+/g, ''); // 공백 제거
    switch (name) {
      case 'userName':
        dispatch(setUserName(sanitizedValue));
        break;
      case 'identity':
        if (sanitizedValue.length <= 7) {
          dispatch(setIdentity(sanitizedValue));
        }
        break;
      case 'birthDate':
        if (sanitizedValue.length <= 6) {
          dispatch(setBirthDate(sanitizedValue));
        }
        break;
      case 'telecom':
        dispatch(setTelecom(sanitizedValue));
        break;
      case 'phoneNo':
        if (sanitizedValue.length <= 11) {
          dispatch(setPhoneNo(sanitizedValue));
        }
        break;
      case 'id':
        dispatch(setId(sanitizedValue));
        break;
      case 'password':
        dispatch(setPassword(sanitizedValue));
        break;
      case 'email':
        dispatch(setEmail(sanitizedValue));
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (
      formData.userName &&
      formData.identity.length === 7 &&
      formData.birthDate.length === 6 &&
      formData.phoneNo.length === 11 &&
      /^[a-zA-Z][a-zA-Z0-9]{5,11}$/.test(formData.id) &&
      formData.email && validateEmailDomain(formData.email) &&
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?_~]).{9,20}$/.test(formData.password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post('https://tearofserver.store/auth/sign-up', {
          userName: formData.userName,
          identity: formData.identity,
          birthDate: formData.birthDate,
          telecom: formData.telecom,
          phoneNo: formData.phoneNo,
          id: formData.id,
          password: formData.password,
          email: formData.email,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiQXV0aG9yaXphdGlvbiI6IlJPTEVfVVNFUiIsImV4cCI6MTcyMjc4MjE1NH0.8sPNdAV-4XkvT6yEnbMtOa50igz1PKCfbIYr0ajANUE',
          },
          params: {
            thirdPartyToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlX3R5cGUiOiIxIiwic2NvcGUiOlsicmVhZCJdLCJzZXJ2aWNlX25vIjoiMDAwMDA0MzM4MDAyIiwiZXhwIjoxNzIzMTk3MjM2LCJhdXRob3JpdGllcyI6WyJJTlNVUkFOQ0UiLCJQVUJMSUMiLCJCQU5LIiwiRVRDIiwiU1RPQ0siLCJDQVJEIl0sImp0aSI6ImQ1YWYyOGUwLTBhYTktNDZiOC1hNDRhLTZmN2I3ZmM2N2RmOSIsImNsaWVudF9pZCI6ImRiZDJmMTRmLWE3NGUtNDYzZS04ZTFmLTkzYTIxMDFlNTE1NyJ9.SgWm84z_eBTS7tdajDTs4cybDdhMi2a9dFh1kiVELUoG4Y_kf3n1_j-cjLYNsOWlfWrz_ElKngkPvgUAj4HY55L_3bv-KGrM7QTDYHEdYF-Yvagk4hqyOl5X-aovOLDXurFhzsS1Erw3A8Z86atpKXahaS8uOTfA3S5DLRdB2ghJaSQoiXWXfSErOSIou6VbwXOlSdSb9S_GjFy0GVr-70mK17IMRoVPayHykLb9YpkPtS1dnwvpl3bjOWRTT59CgCeFg2FgY0pk4lkeN26Qs23cA-Jv-MOM_7Fh5u4nhil5x3eR5c_5zBLmxnAcoUnEBa1rxU119XNxaVbGRcxULg', 
          },
        });

        console.log('1차 인증 응답:', response.data);

        // 1차 인증 완료 상태 업데이트
        dispatch(setFirstAuthCompleted(true));
        dispatch(setTwoWayInfo(response.data.data));
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('이미 회원입니다.');
          navigate('/login'); 
        } else {
          console.error('1차 인증 에러:', error.response?.data || error.message);
        }
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
            이름
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
          </label>
          {errors.userName && <p className="error-message">{errors.userName}</p>}
        </div>
        <div className="form-group">
          <label>
            주민등록번호 앞 6자리
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              placeholder="주민등록번호 앞 6자리 입력하세요"
              required
            />
          </label>
          {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
        </div>
        <div className="form-group">
          <label>
            주민등록번호 뒷 7자리
            <input
              type="text"
              name="identity"
              value={formData.identity}
              onChange={handleChange}
              placeholder="주민등록번호 뒷 7자리 입력하세요"
              required
            />
          </label>
          {errors.identity && <p className="error-message">{errors.identity}</p>}
        </div>
        <div className="form-group">
          <label>
            통신사
            <select name="telecom" value={formData.telecom} onChange={handleChange} required>
              <option value="0">SKT</option>
              <option value="1">KT</option>
              <option value="2">LG U+</option>
              <option value="3">알뜰폰(SKT)</option>
              <option value="4">알뜰폰(KT)</option>
              <option value="5">알뜰폰(LG U+)</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            전화번호
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="전화번호 11자리 입력하세요"
              required
            />
          </label>
          {errors.phoneNo && <p className="error-message">{errors.phoneNo}</p>}
        </div>
        <div className="form-group">
          <label>
            아이디
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </label>
          {errors.id && <p className="error-message">{errors.id}</p>}
        </div>
        <div className="form-group">
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </label>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>
            비밀번호 확인
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </label>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <label>
            이메일
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <button type="submit" className={`submit-button ${isFormValid() ? 'active' : 'inactive'}`} disabled={!isFormValid()}>
          회원가입하기
        </button>
      </form>
    </div>
  );
};

export default FirstSignupForm;
