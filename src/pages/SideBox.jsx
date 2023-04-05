import "./SideBox.css";
import "react-range-slider-input/dist/style.css";

import RangeSlider from "react-range-slider-input";
import { carsFilter } from "../../redux/cars/carsActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SideBox = ({ data, classStyle }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const [valuePrice, setValue] = useState([0, 60]);
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
  const maxPrice = () => {
    let max = 0;
    data.forEach((car) => {
      if (car.price > max) {
        max = car.price;
      }
    });
    return max;
  };
  const typeHandler = (id)=>{
    dispatch(carsFilter({filterItemType: "type", filterItems : id}));
  }
  const capacityHandler = (id)=>{
    dispatch(carsFilter({filterItemType: "capacity", filterItems : id}));
  }
  const priceHandler =(value, userInteraction) => {
    setValue(value)
    dispatch(carsFilter({filterItemType: "price", filterItems : valuePrice}));
  }
  return (
    <div className={classStyle}>
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
                  id={type.id}
                  onChange={(id)=>typeHandler(type.type)}
                />
                <label htmlFor={type.id} className="ms-2">
                  {type.type} <span className="text-mute ms-2">({type.count})</span>
                </label>
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
                  id={capacity.id}
                  onChange={(id)=>capacityHandler(capacity.capacity)}
                />
                <label htmlFor={capacity.id} className="ms-2">
                  {capacity.capacity} Person
                  <span className="text-mute ms-2">({capacity.count})</span>
                </label>
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
        max={maxPrice()}
        step={10}
        value={valuePrice}
        onInput ={priceHandler}
      />
      <div className="mt-3">Max.${maxPrice()}.00</div>
    </div>
  );
};

export default SideBox;
