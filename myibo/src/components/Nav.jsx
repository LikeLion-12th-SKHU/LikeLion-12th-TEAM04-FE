import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Nav.css";
import profileIcon from "../img/profile.png";
import mainlogo from "../img/MainLogo.png";

function Nav() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleProfileClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <nav className="nav">
      <div
        className="nav-logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src={mainlogo} alt="로고" />
        내이보
      </div>
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="치료명 입력"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 입력값 변경 시 상태 업데이트
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
      <div className="profile" onClick={handleProfileClick}>
        <img src={profileIcon} alt="User Icon" className="profile-image" />
      </div>
    </nav>
  );
}

export default Nav;
