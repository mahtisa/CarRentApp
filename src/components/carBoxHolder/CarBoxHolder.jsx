import CardBox from "../card/CardBox";
import { NavLink } from "react-router-dom";
import ReactLoading from "react-loading";

const CarBoxHolder = ({ cars, title }) => {
  if (cars.length > 0) {
    return (
        <>
        <div className="d-flex justify-content-between align-items-center mt-5 mb-3 ms-3">
          <span className="text-mute">{title}</span>
        </div>
        <div className="row">
          {title === ""
            ? cars.map((car) => {
                return (
                  <div className="col-xl-4 col-sm-6" key={car.id}>
                    <CardBox car={car} />
                  </div>
                );
              })
            : cars.map((car) => {
                return (
                  <div className="col-xl-3 col-md-4 col-sm-6" key={car.id}>
                    <CardBox car={car} />
                  </div>
                );
              })}
        </div>
        {title === "Recomendation Car" && (
          <NavLink to={"category"}>
            <div className="btn-blue btn-more">Show more Car</div>
          </NavLink>
        )}
        </>
    );
  } else {
    return (
      <ReactLoading
        type={"spinningBubbles"}
        color={"#3563E9"}
        height={100}
        width={100}
        className="mx-auto"
      />
    );
  }
};

export default CarBoxHolder;
