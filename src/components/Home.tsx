import { Fragment, useContext, useState } from "react";
import Container from "../utils/Container";
import Searchbar from "./Searchbar";
import ItemList from "./ItemList";
import Loader from "./Loader";
import Error from "./Error";
import Main from "../utils/Main";
import CountryContext from "../store/CountryContext";

const Home = (props: { darkMode: boolean }) => {
  const [selectRegion, setSelectRegion] = useState("");
  const ctx = useContext(CountryContext);
  const { loading, getError, countries } = ctx;
  return (
    <>
      <Main darkMode={props.darkMode} bg="home">
        <div>
          <Searchbar
            selectRegion={selectRegion}
            setSelectRegion={setSelectRegion}
            darkMode={props.darkMode}
          />
          <Container>
            <Fragment>
              {loading && <Loader loading={loading} />}
              {countries && (
                <div className="grid">
                  {countries?.slice(0, 8)?.map((country, i) => (
                    <ItemList key={i} country={country} dark={props.darkMode} />
                  ))}
                </div>
              )}

              {getError && <Error getError={getError} />}
            </Fragment>
          </Container>
        </div>
      </Main>
    </>
  );
};

export default Home;
