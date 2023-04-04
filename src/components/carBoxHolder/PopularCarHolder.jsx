import CardBox from "../card/CardBox";
import { NavLink } from "react-router-dom";
import ReactLoading from "react-loading";

const sortCars = (data) => {
  const sort = data.sort((a, b) => {
    if (a.likeCount < b.likeCount) {
      return -1;
    } else if (a.likeCount > b.likeCount) {
      return 1;
    }
    return 0;
  });
  return sort.reverse();
};
const PopularCarHolder = ({ cars }) => {
  const allCars = [...cars];
  const sortArray = sortCars(allCars);
  const popularCars = [];
  for (let i = 0; i < 4; i++) {
    popularCars[i] = sortArray[i];
  }
  if (popularCars[0]) {
    return (
      <div className="container-man">
        <div className="d-flex justify-content-between align-items-center mt-5 mb-3 mx-3">
          <span className="text-mute">Popular Car</span>
          <NavLink to={"category"}>View All</NavLink>
        </div>
        <div className="row">
          {popularCars.map((car) => {
            return (
              <div className="col-3" key={car.id}>
                <CardBox car={car} />
              </div>
            );
          })}
        </div>
      </div>
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
