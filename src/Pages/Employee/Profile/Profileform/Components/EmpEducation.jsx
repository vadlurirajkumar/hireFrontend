import React from "react";
import { useState, useEffect } from "react";

//scss
import "./Empstyle.scss";

// mui icons
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// importing 
import axios from "axios";

const EmpEducation = () => {
  const [educationformdata, seteducationformdata] = useState("");
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const geteducationFormdata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/employee/getprofile`,
        config
      );
      seteducationformdata(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    geteducationFormdata();
  }, []);

  const [eduform, seteduform] = useState({
    degree: "",
    university: "",
    yearofPassing: "",
  });

  const updatehandleredu = (e) => {
    const { name, value } = e.target;
    seteduform({
      ...eduform,
      [name]: value,
    });
  };

  const createedudataform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/employee/addEducation`,
        eduform,
        config
      );
      console.log(response);
      console.log(eduform);
      seteducationformdata([...educationformdata, response.data]);
      seteduform({
        degree: "",
        university: "",
        yearofPassing: "",
      });
      geteducationFormdata();
      console.log(eduform);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteeduformdata = async (_id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/employee/deleteEducation/${_id}`,
        config
      );
      geteducationFormdata();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="main-container">
      <div>
        <h1>Education:</h1>
        <div>
          <div className="experience-input-fields">
            <div className="input-field">
              <input
                type="text"
                placeholder="ENTERYOUR DEGREE"
                name="degree"
                value={eduform.degree}
                onChange={updatehandleredu}
              />
            </div>

            <div className="input-field">
              <input
                type="text"
                name="university"
                placeholder="ENTER YOUR UNIVERSITY"
                value={eduform.university}
                onChange={updatehandleredu}
              />
            </div>

            <div className="experinece-field">
              <div className="input-field">
                <input
                  type="date"
                  name="passingYear"
                  placeholder="ENTER YEAR OF PASSING"
                  value={eduform.passingYear}
                  onChange={updatehandleredu}
                />
              </div>
              <div>
                <button
                  className="removebg"
                  type="submit"
                  onClick={createedudataform}
                >
                  <CheckIcon sx={{color:"green", marginLeft:"10px",fontSize:"40px"}}/>
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        {educationformdata &&
          educationformdata.education.map((item) => {
            return (
              <div key={item._id} className="experience-input-fields">
                <div className="container-size">
                  <h1>{item.degree}</h1>
                </div>
                <div className="container-size">
                  <h1>{item.university}</h1>
                </div>
                <div className="experinece-field">
                  <div className="container-size">
                    <h1>{item.passingYear.split("T")[0]}</h1>
                  </div>
                  <div>
                    <button
                      className="removebg"
                      onClick={() => {
                        deleteeduformdata(item._id);
                      }}
                    >
                      <CloseIcon sx={{color:"red", marginLeft:"10px",fontSize:"40px"}}/>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EmpEducation;
