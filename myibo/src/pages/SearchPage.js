import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBenefit from "../components/Search/SearchBenefit"; // SearchBenefit 컴포넌트 불러오기
import SearchMyInsurance from "../components/Search/SearchMyInsurance";
import SearchRecommendedInsurance from "../components/Search/SearchRecommendedInsurance";

import "../styles/SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get("term");
    if (term) {
      setSearchTerm(term);
      setIsSearched(true); // 검색어가 있을 경우 검색 상태 설정
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearched(true);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearched(false); // 입력이 변경될 때마다 검색 상태 초기화
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e); // 엔터 키가 눌리면 검색 수행
    }
  };

  return (
    <div className="search-page">
      <div className="search-page__container">
        <input
          type="text"
          placeholder="치료명 입력"
          value={searchTerm}
          onChange={handleInputChange} // 변경된 핸들러 사용
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
          className="search-page__input"
        />
        <button onClick={handleSearch} className="search-page__button">
          검색
        </button>
      </div>

      {isSearched && searchTerm && (
        <>
          <SearchBenefit className="SP-content" searchTerm={searchTerm} />
          <SearchMyInsurance className="SP-content" searchTerm={searchTerm} />
          <SearchRecommendedInsurance
            className="SP-content"
            searchTerm={searchTerm}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
