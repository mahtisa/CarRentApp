import "./Pages.css";

import { useDispatch, useSelector } from "react-redux";

import { BsArrowDownUp } from "react-icons/bs";
import CarBoxHolder from "../components/carBoxHolder/CarBoxHolder";
import FilterBox from "../components/filterBox/FilterBox";
import PopularCarHolder from "../components/carBoxHolder/PopularCarHolder";
import PopularCarHolderRes from "../components/carBoxHolder/PopularCarHolderRes";
import ad1 from "../images/ad1.png";
import ad2 from "../images/ad2.png";
import carsFetch from "../redux/cars/carsActions";
import { useEffect } from "react";

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
              <img src={ad1} alt="picture of ad1" className="w-100 ad-img" />
            </div>
            <div className="col-sm-6 d-none d-sm-block">
              <img src={ad2} alt="picture of ad2" className="w-100 ad-img" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-man">
          <div className="d-flex justify-content-between align-items-center filter-holder">
            <FilterBox data={data}/>
            <div className="btn-arrow">
              <BsArrowDownUp className="arrow" />
            </div>
            <FilterBox marginTop="filter-down" data={data} />
          </div>
        </div>
      </section>
      <section id="popular-car" className="d-xl-block d-none">
        <PopularCarHolder cars={data} />
      </section>
      <section id="popular-car-res" className="d-xl-none d-block">
        <PopularCarHolderRes cars={data} />
      </section>
      <section className="recomendation">
        <CarBoxHolder cars={data} />
      </section>
    </div>
  );
};

export default Home;
