import React from "react";
import section3bgIcon from "../img/Section3bgIcon.png";
import "../styles/Section3.css";

const Section3 = () => {
  return (
    <div className="section3">
      <div className="section3-img">
        <img src={section3bgIcon} alt="section3bgIcon" />
      </div>
      <div className="section3-content">
        <div className="section3-title">
          <h2>
            <b>내</b>가 가입한
          </h2>
          <h2>
            <b>이</b>
          </h2>
          <h2>
            <b>보</b>험, 어떤 치료가 보장될까?
          </h2>
        </div>
        <div className="section3-container">
          <p className="section3-introduction">
            안녕하세요, 저희는 팀 일이삼사입니다.
            <br />
            어릴때 부모님께서 대신 가입해주셨던 보험이 정확히 무엇인지, 급여와
            비급여가 무엇인지,
            <br />
            국민건강보험과 사설보험의 차이점이 무엇인지 모르는 분이 많이
            계십니다.
            <br />
            이것이 저희가 내이보라는 서비스를 개발하게된 이유 중 하나입니다.
            <br />
            잘 찾아보지 않는 이상 나오지 않는 정보들을 사용자가 보기 편하게
            기획한 서비스,
            <br />
            바로 내이보입니다.
          </p>
          <a href="https://cinining.notion.site/9804d8f58fd34612b78ef42a30359257?pvs=4">
            READ MORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Section3;
