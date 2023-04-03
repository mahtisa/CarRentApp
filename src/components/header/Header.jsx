import "./Header.css"

import { BsFillBellFill, BsFillHeartFill } from "react-icons/bs";

import { FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import profile from "../../images/profile.png"

const Header = () => {
    return ( 
        <header className="header">
            <div className="container-man">
                <div className="row d-flex align-items-center">
                    <div className="col-lg-2 col-6">
                        <NavLink to={'home'}><div className="logo">MORENT</div></NavLink>
                    </div>
                    <div className="col-6 d-lg-none d-flex justify-content-end">
                        <img src={profile} alt="profile pic" className="profile-pic"/>
                    </div>
                    <div className="col-lg-6">
                        <Search/>
                    </div>
                    <div className="col-lg-4 text-end d-lg-flex align-items-center justify-content-end d-none">
                        <div className="icon-circle">
                            <BsFillHeartFill/>
                        </div>
                        <div className="icon-circle">
                            <div className="circle-red"></div>
                            <BsFillBellFill/>
                        </div>
                        <div className="icon-circle">
                            <FaCog/>
                        </div>
                        <img src={profile} alt="profile pic" className="profile-pic"/>
                  
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;