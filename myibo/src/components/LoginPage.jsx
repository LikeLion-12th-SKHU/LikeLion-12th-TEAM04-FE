import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginForm.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ id: '', password: '' });
  const [errors, setErrors] = useState({ id: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const messageParam = queryParams.get('message');
    if (messageParam) {
      setErrorMessage(messageParam);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    let valid = true;
    let newErrors = { id: '', password: '' };

    if (!formData.id) {
      newErrors.id = '아이디를 입력하세요';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력하세요';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post('https://tearofserver.store/auth/login', {
          id: formData.id,
          password: formData.password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('로그인 응답:', response.data);

        // 로그인 성공 시 액세스 토큰 저장
        if (response.data.data && response.data.data.accessToken) {
          localStorage.setItem('accessToken', response.data.data.accessToken);
          setSuccessMessage('로그인에 성공했습니다.');
          // 로그인 성공 시 리디렉션
          window.location.href = '/';
        } else {
          setErrorMessage('로그인에 실패했습니다.');
        }
      } catch (error) {
        console.error('로그인 에러:', error.response?.data || error.message);
        setErrorMessage('로그인에 실패했습니다.');
      }
    } else {
      setErrors(isFormValid());
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleMyPageClick = () => {
    navigate('/MyPage');
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">로그인</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" className="signup-button" onClick={handleSignupClick}>회원가입하기</button>
        <button type="button" className="mypage-button" onClick={handleMyPageClick}>마이페이지 가기</button>
      </form>
    </div>
  );
};

export default LoginPage;
