import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { fetchApi } from "../api/FetchApi";
import { useParams } from "react-router-dom";

const CountryContext = createContext({
  countries: [],
  searchCountry: "",
  loading: false,
  getError: "",
  handleChange: (event: any) => {},
  handleSubmit: (event: any) => {},
  region: "",
  handleRegionChange: (event: any) => {},
});

export const CountryContextProvider = (props: any) => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectRegion, setSelectRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");
  const [search, setSearch] = useState("");
  const { region } = useParams();

  const searchHandler = (event: any) => {
    setSearchCountry(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (searchCountry !== "") {
      setSearch(searchCountry);
    }
  };

  console.log(region);

  const handleRegionChange = (event: any) => {
    setSelectRegion(event.target.value);
  };

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);

      try {
        const res = await axios(
          search ? fetchApi(`name/${search}`) : fetchApi(`/all`)
        );

        if (res.data) {
          setCountries(res.data);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(true);
        setTimeout(() => {
          if (error.response.status === 404) {
            setError(error.request.statusText);
          }
          setLoading(false);
        }, 5000);
      }
    };

    getCountry();
  }, [search]);

  return (
    <CountryContext.Provider
      value={{
        countries: countries,
        searchCountry: searchCountry,
        getError: getError,
        loading: loading,
        handleChange: searchHandler,
        handleSubmit: handleSubmit,
        region: selectRegion,
        handleRegionChange: handleRegionChange,
      }}
    >
      {props.children}
    </CountryContext.Provider>
  );
};
export default CountryContext;
