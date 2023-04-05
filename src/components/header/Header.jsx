import "./Header.css";

import { BsFillBellFill, BsFillHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { BsSliders } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import SideBox from "../sideBox/SideBox";
import carsFetch from "../../redux/cars/carsActions";
import profile from "../../images/profile.png";

const Header = () => {
  const { loading, error, data } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(carsFetch());
  }, []);
  const coverRef = useRef();
  const menuRef = useRef();
  const closeMenu = () => {
    menuRef.current.style.left = "-280px";
    coverRef.current.style.width = "0";
  };
  const openMenu = ()=>{
    menuRef.current.style.left = "0";
    coverRef.current.style.width = "100%";
  }
  return (
    <header className="header">
      <div className="cover" onClick={closeMenu} ref={coverRef}></div>
      <div className="nav-box-holder" ref={menuRef}>
        <SideBox data={data} classStyle="nav-box" />
      </div>
      <div className="container-man">
        <div className="row d-flex align-items-center">
          <div className="col-lg-2 col-6">
            <NavLink to={"/"}>
              <div className="logo">MORENT</div>
            </NavLink>
          </div>
          <div className="col-6 d-lg-none d-flex justify-content-end">
            <img src={profile} alt="profile pic" className="profile-pic" />
          </div>
          <div className="col-lg-6 search-holder">
            <Search />
            <div className="btn-filter" onClick={openMenu}>
              <BsSliders />
            </div>
          </div>
          <div className="col-lg-4 text-end d-lg-flex align-items-center justify-content-end d-none">
            <div className="icon-circle">
              <BsFillHeartFill />
            </div>
            <div className="icon-circle">
              <div className="circle-red"></div>
              <BsFillBellFill />
            </div>
            <div className="icon-circle">
              <FaCog />
            </div>
            <img src={profile} alt="profile pic" className="profile-pic" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
