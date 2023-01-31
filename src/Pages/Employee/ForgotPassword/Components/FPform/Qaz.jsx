// SCSS
import "./forgotform.scss";

// IMPORTING DIFFEENT COMPONENTS
import { forgotSchema } from "../../../Signup/Components/YupSchema";

import { useFormik } from "formik";

const Qaz = () => {
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      otp: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: forgotSchema,

    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  const consoleEmailData = (e) => {
    e.preventDefault();
    console.log(values.email);
  };

  const errorStyle = {
    color: "red",
    fontSize: "16px",
    // marginTop:"-20px"
  };

  return (
    <div className="forget-password">
      <h1>Forgot Password ?</h1>

      <br />

      <form onSubmit={handleSubmit}>
        <div className="email-button">
          <div className="email-style">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
            />
            <button onClick={consoleEmailData}>Send Otp</button>
          </div>

          <div>
            {errors.email && touched.email ? (
              <p style={errorStyle}>{errors.email}</p>
            ) : null}
          </div>
        </div>
        <br />
        <div className="otp-button">
          <input
            id="name"
            name="otp"
            type="text"
            placeholder="Otp"
            onChange={handleChange}
            value={values.otp}
          />
          {errors.otp && touched.otp ? (
            <p style={errorStyle}>{errors.otp}</p>
          ) : null}
          <button className="resend-button">ResendOTP</button>
        </div>

        <div className="password-data">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && touched.password ? (
            <p style={errorStyle}>{errors.password}</p>
          ) : null}
        </div>
        <br />
        <div className="password-data">
          <input
            id="confirmpassword"
            name="confirmpassword"
            type="confirmpassword"
            placeholder="confirmpassword"
            onChange={handleChange}
            value={values.confirmpassword}
          />
          {errors.confirmpassword && touched.confirmpassword ? (
            <p style={errorStyle}>{errors.confirmpassword}</p>
          ) : null}
        </div>
        <br />
        <button className="reset-button" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default Qaz;
