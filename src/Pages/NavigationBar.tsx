import { constants } from "fs/promises";
import { useNavigate, Link, Outlet } from "react-router-dom";
import "./Home.css";

const NavigationBar = () => {
    return (
        <div className="NavigationBarContainer">
                  <Outlet />
        </div>


        // <ul>
        //     <li>
        //     <p>hello</p>
        //     </li>
        //     <li>
        //     <p>hello</p>
        //     </li>
        //     <li>
        //     <p>hello</p>
        //     </li>
        //     <li>
        //     <p>hello</p>
        //     </li>
        //     <li>
        //     <p>hello</p>
        //     </li>
        //   <Outlet />
        // </ul>
    );
}

export default NavigationBar;