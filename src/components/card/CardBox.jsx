import "./CardBox.css";

import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";

import { HiUsers } from "react-icons/hi2";
import ReactLoading from "react-loading";
import { RiGasStationFill } from "react-icons/ri";
import { TbBrandVsco } from "react-icons/tb";
import { addLike } from "../../redux/cars/carsActions";
import { useDispatch } from "react-redux";

const CardBox = ({ car }) => {
  const dispatch = useDispatch();

  if (car) {
    return (
      <div className="card-box">
      <div className="d-flex align-items-center justify-content-between">
        <div className="card-title">{car.name}</div>
        {car.likeCount > 0 ? (
          <BsFillHeartFill className="text-red" />
        ) : (
          <BsHeart
            className="text-mute"
            onClick={() => dispatch(addLike(car.id))}
          />
        )}
      </div>
      <div className="label text-mute">{car.type}</div>
      <div className="card-info">
        <img
          src={process.env.PUBLIC_URL + "/" + car.src}
          alt="car_picture"
        />
        <div className="car-feature-holder">
          <div className="car-feature text-mute">
            <RiGasStationFill className="icon" />
            <span>{car.feature.fuel}L</span>
          </div>
          <div className="car-feature text-mute">
            <TbBrandVsco className="icon" />
            <span>{car.feature.control}</span>
          </div>
          <div className="car-feature text-mute">
            <HiUsers className="icon" />
            <span>{car.feature.capacity} People</span>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-3">
        <div className="cost">
        ${car.priceOff ? car.priceOff : car.price}.00/<span className="text-mute">day</span>
        <div className="text-mute cost-off">{car.priceOff !== 0 ? `$${car.price}.00` : ""}</div>
        </div>
        <div className="btn-blue">RentNow</div>
      </div>
    </div>
    );
  } else {
    return (
      <ReactLoading
        type={"spinningBubbles"}
        color={"#3563E9"}
        height={50}
        width={50}
      />
    );
  }
};

export default CardBox;
