import "./Pages.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CarBoxHolder from "../components/carBoxHolder/CarBoxHolder";
import FilterHolder from "../components/filterBox/FilterHolder";
import PopularCarHolder from "../components/carBoxHolder/PopularCarHolder";
import PopularCarHolderRes from "../components/carBoxHolder/PopularCarHolderRes";
import ad1 from "../images/ad1.png";
import ad2 from "../images/ad2.png";
import carsFetch from "../redux/cars/carsActions";

const Home = () => {
  const { loading, error, data } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(carsFetch());
  }, []);

  return (
    <div className="page-holder">
      <section>
        <div className="container-man">
          <div className="row mb-5" id="ad-section">
            <div className="col-sm-6">
              <img src={ad1} alt="picture_of_ad1" className="w-100 ad-img" />
            </div>
            <div className="col-sm-6 d-none d-sm-block">
              <img src={ad2} alt="picture_of_ad2" className="w-100 ad-img" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-man">
          <FilterHolder data={data} />
        </div>
      </section>
      <section id="popular-car" className="d-xl-block d-none">
        <PopularCarHolder cars={data} />
      </section>
      <section id="popular-car-res" className="d-xl-none d-block">
        <PopularCarHolderRes cars={data} />
      </section>
      <section className="recomendation">
        <div className="container-man">
          <CarBoxHolder cars={data} title="Recomendation Car" />
        </div>
      </section>
    </div>
  );
};

export default Home;
