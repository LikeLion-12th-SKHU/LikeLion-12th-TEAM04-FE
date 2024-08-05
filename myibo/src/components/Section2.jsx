import React from "react";
import section2bgIcon from "../img/section2bgIcon.png";
import section2gIcon from "../img/section2gIcon.png";
import "../styles/Section2.css";

const Section2 = () => {
  return (
    <div className="section2">
      <h2 className="section2-title">급여? 비급여? 무슨 차일까요?</h2>
      <div className="section2-container">
        <div className="section2-item">
          <div className="section2-icon">
            <img src={section2gIcon} alt="급여 아이콘" />
          </div>
          <h3>급여</h3>
          <p>건강보험이 적용되는 항목</p>
          <span className="section2-highlight">일부 본인부담금</span>
        </div>
        <div className="section2-item">
          <div className="section2-icon">
            <img src={section2bgIcon} alt="비급여 아이콘" />
          </div>
          <h3>비급여</h3>
          <p>건강보험이 적용되지 않는 항목</p>
          <span className="section2-highlight">환자가 전액 부담</span>
        </div>
      </div>
    </div>
  );
};

export default Section2;
