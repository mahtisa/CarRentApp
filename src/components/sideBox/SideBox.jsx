import "./SideBox.css";
import "react-range-slider-input/dist/style.css";

import RangeSlider from "react-range-slider-input";
import { useState } from "react";

const SideBox = ({ data }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState([30, 60]);
  console.log(data);
  const typeCount = (type) => {
    let c = 0;
    data.forEach((car) => {
      if (car.type === type) {
        c++;
      }
    });
    return c;
  };
  const capacityCount = (capacity) => {
    let c = 0;
    data.forEach((car) => {
      if (car.feature.capacity === capacity) {
        c++;
      }
    });
    return c;
  };
  const types = [];
  const typeList = [];
  data.forEach((car) => {
    if (!types.includes(car.type)) {
      types.push(car.type);
      typeList.push({ id: car.id, type: car.type, count: typeCount(car.type) });
    }
  });
  const capacity = [];
  const capacityList = [];
  data.forEach((car) => {
    if (!capacity.includes(car.feature.capacity)) {
      capacity.push(car.feature.capacity);
      capacityList.push({
        id: car.id,
        capacity: car.feature.capacity,
        count: capacityCount(car.feature.capacity),
      });
    }
  });
  const maxPrice = ()=>{
      let max = 0;
      data.forEach((car)=>{
          if(car.price > max){
              max = car.price;
          }
      })
      return max;
  }
  return (
    <div className="side-box">
      <label className="label text-mute">TYPE</label>
      <ul>
        {typeList.length > 0 &&
          typeList.map((type) => {
            return (
              <li className="d-flex align-items-center my-3" key={type.id}>
                <input
                  type="checkbox"
                  className={isChecked ? "check-box-checked" : "check-box"}
                  onClick={() => setIsChecked(true)}
                />
                <span className="mx-2">{type.type}</span>
                <span className="text-mute">({type.count})</span>
              </li>
            );
          })}
      </ul>
      <label className="label text-mute mt-3">CAPACITY</label>
      <ul>
        {capacityList.length > 0 &&
          capacityList.map((capacity) => {
            return (
              <li className="d-flex align-items-center my-3" key={capacity.id}>
                <input
                  type="checkbox"
                  className={isChecked ? "check-box-checked" : "check-box"}
                  onClick={() => setIsChecked(true)}
                />
                <span className="mx-2">{capacity.capacity} Person</span>
                <span className="text-mute">({capacity.count})</span>
              </li>
            );
          })}
      </ul>
      <label className="label text-mute my-3">PRICE</label>
      <RangeSlider
        className="single-thumb"
        defaultValue={[0, 50]}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
        max={100}
        step={10}
        value={[0,60]}
      />
      <div className="mt-3">Max.${maxPrice()}.00</div>
    </div>
  );
};

export default SideBox;
