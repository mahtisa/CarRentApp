import "./FilterBox.css";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { useState } from "react";

const FilterBox = ({ marginTop, data }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [city,setCity] = useState("");
  let locations = [];
  data.forEach((car) => {
    car.location.forEach((l) => {
      if (!locations.includes(l)) {
        locations.push(l);
      }
    });
  });
  const changeHandler = (e)=>{
    setCity(e.target.value)
  }
  console.log(startTime)
  return (
    <div className={`filter-box ${marginTop}`}>
      <div className="filter-header mb-3">
        <input type="radio" className="me-2" />
        <label>Pick-Up</label>
      </div>
      <div className="row d-flex">
        <div className="col-4 filter-item">
          <label htmlFor="location" className="filter-item-title">
            Locations
          </label>
          <select id="location" name="location" className="filter-selector" value={city} onChange={changeHandler}>
            <option value="">Select Your City</option>
            {locations.length > 0 ? (
              locations.map((l, index) => {
                return (
                  <option value={l} key={index}>
                    {l}
                  </option>
                );
              })
            ) : (
              <option value="">Select Your City</option>
            )}
          </select>
        </div>
        <div className="col-4 filter-item">
          <label htmlFor="date" className="filter-item-title">
            Date
          </label>
          <DatePicker
            id="date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-4 filter-item">
          <label htmlFor="time" className="filter-item-title">
            Time
          </label>

          <DatePicker
            id="time"
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
