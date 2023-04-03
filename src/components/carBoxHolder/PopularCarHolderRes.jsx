import { useEffect, useState } from "react";

import CardBox from "../card/CardBox";
import { NavLink } from "react-router-dom";
import ReactLoading from "react-loading";
import { register } from "swiper/element/bundle";

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
const PopularCarHolderRes = ({ cars }) => {
  const allCars = [...cars];
  const sortArray = sortCars(allCars);
  const popularCars = [];
  for (let i = 0; i < 4; i++) {
    popularCars[i] = sortArray[i];
  }
  register();
  const swiperEl = document.querySelector("swiper-container");
  // swiper parameters
  const swiperParams = {
    slidesPerView: 1.2,
    spaceBetween: 30,
    breakpoints: {
      400: {
        slidesPerView: 1.5,
      },
      500: {
        slidesPerView: 1.8,
      },
      640: {
        slidesPerView: 2.3,
      },
      800: {
        slidesPerView: 2.8,
      },
      1100: {
        slidesPerView: 3.2,
      },
    },
    on: {
      init() {
        // ...
      },
    },
  };
  if (swiperEl) {
    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }

  if (popularCars[0]) {
    return (
      <div className="container-man">
        <div className="d-flex justify-content-between align-items-center mt-5 mb-3 mx-3">
          <span className="text-mute">Popular Car</span>
          <NavLink to={"#"}>View All</NavLink>
        </div>
        <div className="row">
          <swiper-container init="false">
            {popularCars.map((car) => {
              return (
                <swiper-slide key={car.id}>
                  <CardBox car={car} />
                </swiper-slide>
              );
            })}
          </swiper-container>
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

export default PopularCarHolderRes;
