import { BsFillHeartFill, BsFillStarFill, BsHeart, BsStar } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import carsFetch, { addLike } from "../redux/cars/carsActions";
import { useDispatch, useSelector } from "react-redux";

import { BsChevronDown } from "react-icons/bs";
import PopularCarHolder from "../components/carBoxHolder/PopularCarHolder";
import PopularCarHolderRes from "../components/carBoxHolder/PopularCarHolderRes";
import SideBox from "../components/sideBox/SideBox";
import miniSlide from "../../src/images/ad2.png";
import profilePic from "../../src/images/profile.png";
import { useEffect } from "react";

const getCar = (id, cars) => {
  const allCars = [...cars];
  return allCars.find((c) => c.id === id);
};
const DetailCar = () => {
  const { loading, error, data } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(carsFetch());
  }, []);
  const catId = useParams();
  const car = getCar(catId.carId, data);
  return (
    <>
      <section className="d-flex">
        <SideBox data={data} classStyle="side-box" />
        {car && (
          <div className="page-side">
            <div className="row">
              <div className="col-lg-6">
                <img
                  src={process.env.PUBLIC_URL + "/" + car.src}
                  alt="slider-img"
                  className="detail-img-main"
                />
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <img
                    src={miniSlide}
                    alt="mini-slider-img"
                    className="mini-slider-img"
                  />
                  <img
                    src={miniSlide}
                    alt="mini-slider-img"
                    className="mini-slider-img"
                  />
                  <img
                    src={miniSlide}
                    alt="mini-slider-img"
                    className="mini-slider-img"
                  />
                </div>
              </div>
              <div className="col-lg-6 mt-lg-0 mt-4">
                <div className="card-details-box">
                  <div className="card-details-title d-flex align-items-start justify-content-between">
                    <div className="mb-4">
                      <h1 className="title">{car.name}</h1>
                      <div className="d-flex">
                        <div className="star-holder">
                          <BsFillStarFill className="fill-star" />
                          <BsFillStarFill className="fill-star" />
                          <BsFillStarFill className="fill-star" />
                          <BsFillStarFill className="fill-star" />
                          <BsStar className="empty-star" />
                        </div>
                        <div className="ms-2">440 + Reciewer</div>
                      </div>
                    </div>
                    {car.likeCount > 0 ? (
                      <BsFillHeartFill className="text-red" />
                    ) : (
                      <BsHeart
                        className="text-mute"
                        onClick={() => dispatch(addLike(car.id))}
                      />
                    )}
                  </div>
                  <p className="details-info">
                    NISMO has become the embodiment of Nissan's outstanding
                    performance, inspired by the most unforgiving proving
                    ground, the "race track".
                  </p>
                  <div className="details-feature-holder mb-5">
                    <div className="row">
                      <div className="col-6">
                        <div className="details-feature">
                          <div className="text-mute me-md-4 me-3">TypeCar</div>
                          <div className="feature-value">{car.type}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="details-feature">
                          <div className="text-mute me-md-4 me-3">Capacity</div>
                          <div className="feature-value">
                            {car.feature.capacity} Person
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="details-feature">
                          <div className="text-mute me-md-4 me-3">Steering</div>
                          <div className="feature-value">
                            {car.feature.control}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="details-feature">
                          <div className="text-mute me-md-4 me-3">Gasoline</div>
                          <div className="feature-value">
                            {car.feature.fuel} L
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="price-holder">
                      <div className="details-price d-inline-block">
                        ${car.priceOff ? car.priceOff : car.price}.00/
                      </div>
                      <div className="text-mute d-inline-block">days</div>
                      <div className="text-mute text-decoration-line-through">
                        {car.priceOff !== 0 ? `$${car.price}.00` : ""}
                      </div>
                    </div>
                    <NavLink>
                      <div className="btn-blue">Rent Now</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <div className="review-box">
                  <div className="review-title">
                    <h2>Reviews</h2>
                    <div className="review-count">13</div>
                  </div>
                  <div className="review d-flex my-4">
                    <img
                      src={profilePic}
                      alt="profile-pic"
                      className="profile-img"
                    />
                    <div className="review-row">
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="review-profile d-flex align-items-center">
                          <div className="reviewer-name">
                            <div className="name">Alex Stanton</div>
                            <div className="text-mute">CEO at Bukalapak </div>
                          </div>
                        </div>
                        <div className="review-right text-end">
                          <div className="text-mute">21 Jul 2021</div>
                          <div className="star-holder">
                            <BsFillStarFill className="fill-star" />
                            <BsFillStarFill className="fill-star" />
                            <BsFillStarFill className="fill-star" />
                            <BsFillStarFill className="fill-star" />
                            <BsStar className="empty-star" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 review-des">
                        We are very happy with the service from the MORENT App.
                        Morent has a low price and also a large variety of cars
                        with good and comfortable facilities. In addition, the
                        service provided by the officers is also very friendly
                        and very polite.
                      </p>
                    </div>
                  </div>
                  <div className="review d-flex my-4">
                    <img
                      src={profilePic}
                      alt="profile-pic"
                      className="profile-img"
                    />
                    <div className="review-row">
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="review-profile d-flex align-items-center">
                          <div className="reviewer-name">
                            <div className="name">Alex Stanton</div>
                            <div className="text-mute">CEO at Bukalapak </div>
                          </div>
                        </div>
                        <div className="review-right text-end">
                          <div className="text-mute">21 Jul 2021</div>
                          <div className="star-holder">
                            <BsFillStarFill className="fill-star" />
                            <BsFillStarFill className="fill-star" />
                            <BsFillStarFill className="fill-star" />
                            <BsFillStarFill className="fill-star" />
                            <BsStar className="empty-star" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 review-des">
                        We are very happy with the service from the MORENT App.
                        Morent has a low price and also a large variety of cars
                        with good and comfortable facilities. In addition, the
                        service provided by the officers is also very friendly
                        and very polite.
                      </p>
                    </div>
                  </div>
                  <NavLink className="text-mute text-center mx-auto d-block">
                    Show All <BsChevronDown className="ms-2" />
                  </NavLink>
                </div>
              </div>
            </div>
            <div id="popular-car" className="d-xl-block d-none">
              <PopularCarHolder cars={data} title="Recent Car" />
            </div>
            <div id="popular-car-res" className="d-xl-none d-block">
              <PopularCarHolderRes cars={data} title="Recent Car" />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default DetailCar;
