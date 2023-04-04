import "./FilterBox.css";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { useState } from "react";

const getTime = (date) => {
  let hr = date.getHours();
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  if (hr < 10) {
    hr = "0" + hr;
  }
  return hr + ":" + min + " " + ampm;
};

const getLocations = (data)=>{
  let locations = [];
  data.forEach((car) => {
    car.location.forEach((l) => {
      if (!locations.includes(l)) {
        locations.push(l);
      }
    });
  });
  return locations
}
const getDate = (date)=>{
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const FilterBox = ({ marginTop, data, title ,setCity,setDate,setTime}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [location, setLocation] = useState("");
  
  const locations = getLocations(data);
  const cityHandler = (e)=>{
    setLocation(e.target.value);
    setCity(e.target.value)
  }
  const timeHandler = (startTime)=>{
    setStartTime(startTime);
    const time = getTime(new Date(startTime.toString()));
    setTime(time);
  }
  const dateHandler = (startDate)=>{
    setStartDate(startDate);
    const date = getDate(new Date(startDate.toString()));
    setDate(date);
  }

  return (
    <div className={`filter-box ${marginTop}`}>
      <div className="filter-header mb-3">
        <input type="radio" className="me-2" />
        <label>{title}</label>
      </div>
        <div className="row d-flex">
        <div className="col-4 filter-item">
          <label htmlFor="location" className="filter-item-title">
            Locations
          </label>
          <select
            id="location"
            name="location"
            className="filter-selector"
            value={location}
            onChange={cityHandler}
          >
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
            onChange={(date) => dateHandler(date)}
          />
        </div>
        <div className="col-4 filter-item">
          <label htmlFor="time" className="filter-item-title">
            Time
          </label>

          <DatePicker
            id="time"
            selected={startTime}
            onChange={(date) => timeHandler(date)}
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
