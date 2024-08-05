import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Nav.css";
import profileIcon from "../img/profile.png";

function Nav() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="nav">
      <div
        className="nav-logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        내이보로고
      </div>
      <form className="search-container">
        <input type="text" placeholder="치료명 입력" className="search-input" />
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
