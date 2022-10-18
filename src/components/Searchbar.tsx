import React, { useContext, useEffect } from "react";
import Container from "../utils/Container";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
import CountryContext from "../store/CountryContext";

type SearchProps = {
  selectRegion?: string;
  setSelectRegion: (e: any) => void;
  darkMode?: boolean;
};

const Searchbar = (props: SearchProps) => {
  const ctx = useContext(CountryContext);
  const {
    handleSubmit,
    handleChange,
    searchCountry,
    handleRegionChange,
    region,
  } = ctx;
  const navigate = useNavigate();

  useEffect(() => {
    if (region) {
      return navigate(`/region/${region}`);
    }
  }, [region, navigate]);

  return (
    <Container>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <div
            className={`${
              props.darkMode ? "bg-input text-light" : "bg-white"
            } search--left`}
          >
            <input
              type="text"
              name=""
              id=""
              className={`${
                props.darkMode ? "bg-input text-light" : "bg-white"
              } searchControl`}
              value={searchCountry}
              onChange={handleChange}
              placeholder="Search Country..."
            />
            <BiSearch
              fontSize={24}
              style={{ marginRight: "12px", opacity: "0.4", cursor: "pointer" }}
            />
          </div>
        </form>
        <div
          className={`${
            props.darkMode ? "bg-input text-light" : "bg-white"
          } search--right`}
        >
          <select
            id="select"
            className={`${
              props.darkMode ? "bg-input text-light" : "bg-white"
            } select-country`}
            value={region}
            onChange={handleRegionChange}
          >
            <option defaultValue="">Select Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
          </select>
        </div>
      </div>
    </Container>
  );
};

export default Searchbar;
