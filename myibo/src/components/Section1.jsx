import React from 'react';
import '../styles/Section1.css'; 

function Content() {
  return (
    <div className="content">
      <h2>치료하기 전에 급여인지 아닌지 알 수 있을까?</h2>
      <h1>급여? 비급여? <br /> 헷갈릴 때는 <br /> 내이보</h1>
      <p>
        어떤 치료가 급여인지 아닌지 알 수 있는 방법으로는 병원에서 치료를 받은 뒤에 알 수 있어요. <br />
        내가 가입한 실손의료보험이나 치아보험을 저장하고, 내이보에서 치료명을 검색해보세요.  <br />
        내이보에서 급여인지 비급여인지 알려드리고 어떤 보험금을 받을 수 있는지 알려드릴게요.
      </p>
      <button className="search-button">치료명 검색하러 가기</button>
    </div>
  );
}

export default Content;
