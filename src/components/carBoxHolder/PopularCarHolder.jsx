import CardBox from "../card/CardBox";
import { NavLink } from "react-router-dom";
import ReactLoading from "react-loading";

const PopularCarHolder = ({ cars,title }) => {
  if (cars[0]) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mt-5 mb-3 mx-3">
          <div className="text-mute">{title}</div>
          <NavLink to={"category"}>View All</NavLink>
        </div>
        <div className="row">
          {cars.map((car) => {
            if(title === "Popular Car"){
              return (
                <div className="col-3" key={car.id}>
                  <NavLink to={car.id}>
                    <CardBox car={car} />
                  </NavLink>
                </div>
              );
            }
            return (
              <div className="col-4" key={car.id}>
                <NavLink to={car.id}>
                  <CardBox car={car} />
                </NavLink>
              </div>
            );
          })}
        </div>
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

export default PopularCarHolder;
