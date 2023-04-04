import { BsArrowDownUp } from "react-icons/bs";
import CarBoxHolder from "../carBoxHolder/CarBoxHolder";
import FilterBox from "./FilterBox";
import ReactLoading from 'react-loading';
import { useState } from "react";

const filterCars = (data, start, end) => {
  const allCars = [...data];
  return allCars.filter((car) => {
    return (
      car.location.includes(start.startCity) &&
      (car.date.start === start.startDate || car.date.end === end.endDate) &&
      (car.time.start === start.startTime || car.time.end === end.endTime)
    );
  });
};
const FilterHolder = ({ data }) => {
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterData, setFilterData] = useState([]);

  const clickHandler = () => {
    const filter = filterCars(
      data,
      { startCity, startDate, startTime },
      { endCity, endDate, endTime }
    );
    setFilterData(filter);
  };
  if(data){
    return (
        <>
              <div className="d-flex justify-content-between align-items-center filter-holder">
                <FilterBox
                  data={data}
                  title="Pick-Up"
                  setCity={setStartCity}
                  setTime={setStartTime}
                  setDate={setStartDate}
                />
                <div className="btn-arrow">
                  <BsArrowDownUp className="arrow" onClick={clickHandler} />
                </div>
                <FilterBox
                  marginTop="filter-down"
                  data={data}
                  title="Drop-Off"
                  setCity={setEndCity}
                  setTime={setEndTime}
                  setDate={setEndDate}
                />
              </div>
          {filterData.length > 0 ? (
            <section className="recomendation">
              <CarBoxHolder cars={filterData} title="Results" />
            </section>
          ) : (
            <section></section>
          )}
        </>
      );
  }
  return(
    <ReactLoading type={"spinningBubbles"} color={"#3563E9"} height={100} width={100} className="mx-auto"/>
  )
};

export default FilterHolder;
