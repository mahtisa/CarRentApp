import "./Footer.css"

import { NavLink } from "react-router-dom";

const Footer = () => {
    return ( 
        <footer className="footer">
            <div className="container-man">
                <div className="row">
                    <div className="col-md-6">
                        <div className="logo">MORENT</div>
                        <p>Our vision is to provide convenience and help increase your sales business.</p>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="footer-title mb-4">About</div>
                                <ul>
                                    <li><NavLink>How it workes</NavLink></li>
                                    <li><NavLink>Featured</NavLink></li>
                                    <li><NavLink>Partnership</NavLink></li>
                                    <li><NavLink>Business Relation</NavLink></li>
                                </ul>
                            </div>
                              <div className="col-md-4">
                                <div className="footer-title mb-4">Community</div>
                                <ul>
                                    <li><NavLink>Events</NavLink></li>
                                    <li><NavLink>Blog</NavLink></li>
                                    <li><NavLink>Padcast</NavLink></li>
                                    <li><NavLink>Invite a friend</NavLink></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <div className="footer-title mb-4">Social</div>
                                <ul>
                                    <li><NavLink>Discord</NavLink></li>
                                    <li><NavLink>Instagram</NavLink></li>
                                    <li><NavLink>Twitter</NavLink></li>
                                    <li><NavLink>Facebook</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="down-footer d-flex align-items-center justify-content-between">
                        <p className="text-dark">©2022 MORENT. All rights reserved</p>
                        <div className="footer-right">
                            <NavLink className="text-dark me-5">Privacy & Policy</NavLink>
                            <NavLink className="text-dark">Terms & Condition</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;