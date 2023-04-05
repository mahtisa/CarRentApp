import "./Search.css"

import { BiSearch } from "react-icons/bi";
import { BsSliders } from "react-icons/bs";

const Search = () => {
    return ( 
        <div className="search-box">
            <BiSearch className="search-icon"/>
            <input type={"text"} placeholder="search something here"/>
            <BsSliders className="icon"/>
        </div>
     );
}
 
export default Search;