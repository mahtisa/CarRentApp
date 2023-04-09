import { useEffect, useState } from "react";

import CardBox from "../card/CardBox";
import { NavLink } from "react-router-dom";
import ReactLoading from "react-loading";
import { register } from "swiper/element/bundle";

const PopularCarHolderRes = ({ cars,title }) => {
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

  if (cars[0]) {
    return (
      <>
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3 mx-3">
          <div className="text-mute">{title}</div>
          <NavLink to={"category"}>View All</NavLink>
        </div>
        <div className="row">
          <swiper-container init="false">
            {cars.map((car) => {
              return (
                <swiper-slide key={car.id}>
                  <NavLink to={car.id}><CardBox car={car} /></NavLink>
                </swiper-slide>
              );
            })}
          </swiper-container>
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

export default PopularCarHolderRes;
