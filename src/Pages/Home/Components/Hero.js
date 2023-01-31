//scss
import "./Hero.scss";

// assets
import img from "../../../Assets/meeting.png";

// importing dependecis
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="twoboxes">
        <div className="content">
          <h1>
            Hiring made <br /> easier!
          </h1>
          <p>Find verified, active candidates that are open to work.</p>
        </div>

        <div className="img">
          <img src={img} alt="" />
        </div>
      </div>

      <div className="search">
        <div className="inputs">
          <input
            className="category"
            type="text"
            placeholder="Search Category"
          />
          <input
            className="location"
            type="text"
            placeholder="Search Location"
          />
        </div>

        <div className="icon">
          <Link>
            <FaSearch style={{ color: "white" }} size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
