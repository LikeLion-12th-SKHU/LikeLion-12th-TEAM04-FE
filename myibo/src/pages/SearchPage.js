import React, { useState } from "react";
import SearchMyInsurance from "../components/Search/SearchMyInsurance";
import SearchRecommendedInsurance from "../components/Search/SearchRecommendedInsurance";
import SearchBenefit from "../components/Search/SearchBenefit";
import "../styles/SearchPage.css";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearched(true);
    }
  };

  return (
    <div className="search-page">
      <div className="search-page__container">
        <input
          type="text"
          placeholder="치료명 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-page__input"
        />
        <button onClick={handleSearch} className="search-page__button">
          검색
        </button>
      </div>

      {isSearched && (
        <>
          <SearchMyInsurance searchTerm={searchTerm} />
          <SearchRecommendedInsurance searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
};

export default SearchPage;
