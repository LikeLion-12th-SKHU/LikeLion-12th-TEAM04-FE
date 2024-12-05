import React from "react";
import "../styles/FooterSt.css";
import githubIcon from "../img/githubIcon.png";
import backgroundImg from "../img/backgroundImg.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>WHO WE ARE</h3>
          <div className="git-icon">
            <div>
              <a href="https://github.com/LikeLion-12th-SKHU/LikeLion-12th-TEAM04-BE">
                <img src={githubIcon} alt="githubIcon" />
              </a>
              <h4>BE</h4>
            </div>
            <div>
              <a href="https://github.com/LikeLion-12th-SKHU/LikeLion-12th-TEAM04-FE">
                <img src={githubIcon} alt="githubIcon" />
              </a>
              <h4>FE</h4>
            </div>
          </div>

          {/* 이거 나중에 수정할게요 */}
        </div>
        <div className="footer-section">
          <h3>OUR SERVICE</h3>
          <a href="https://cinining.notion.site/9804d8f58fd34612b78ef42a30359257?pvs=4">
            <p>서비스 소개</p>
          </a>
        </div>
        <div className="footer-section">
          <h3>LICENSE</h3>
          <ul>
            <a href="https://kr.freepik.com/free-psd/flat-design-carnival-template_33804783.htm#from_view=detail_serie">
              <li>t1</li>
            </a>
            <a href="https://kr.freepik.com/free-psd/flat-design-graphic-design-template_33804800.htm#fromView=search&page=4&position=18&uuid=cdd27012-adca-4d7a-8dcf-d63e4055fe81">
              <li>t2</li>
            </a>
            <a href="https://kr.freepik.com/free-psd/stationery-template-with-brunch-theme_7069016.htm#fromView=search&page=4&position=22&uuid=42df338a-fb1d-4fc6-83d3-e5e847477d51">
              <li>t3</li>
            </a>
            <a href="https://icons8.com/illustrations/author/lZpGtGw5182N">
              <li>i1</li>
            </a>
            <a href="https://icons8.com/illustrations/author/lZpGtGw5182N">
              <li>i2</li>
            </a>
            <a href="https://www.flaticon.com/kr/free-icons/-">
              <li>i3</li>
            </a>
            <a href="https://www.flaticon.com/kr/free-icons/">
              <li>i4</li>
            </a>
            <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">
              <li>i5</li>
            </a>
          </ul>
        </div>
      </div>
      <div className="background-img">
        <img src={backgroundImg} alt="backgroundImg" />
      </div>
    </footer>
  );
};

export default Footer;
