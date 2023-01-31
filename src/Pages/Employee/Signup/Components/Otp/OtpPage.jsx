import { useState } from "react";

//SCSS
import "./otppage.scss";

// IMPORTING DIFFERENT COMPONENTS
import { useOtp } from "../../../../../Hooks/useOtp";

// IMPORTING DEPENDECIS
import { useNavigate } from "react-router-dom";

const OTPpage = () => {
  const navigate = useNavigate();
  const { getOtp } = useOtp();

  const [otp, setOtp] = useState({
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getOtp(otp);
    setOtp({
      otp: "",
    });
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (user.data.email_verified) {
      navigate("/employee/profile");
    } else {
      alert("Wrong otp");
    }
  };

  return (
    <div className="Otp-Section">
      <div className="OtpPopup">
        <div className="otp-head-text">
          <h2>An OTP has been sent to your email</h2>
          <h2>
            Please enter the OTP to <br /> proceed further.
          </h2>
        </div>
        <div className="resend-textField">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="otp"
              placeholder="otp"
              value={otp.otp}
              onChange={handleChange}
            />
            <br />
          </form>
          <button onClick={handleSubmit} className="submitButton">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPpage;
