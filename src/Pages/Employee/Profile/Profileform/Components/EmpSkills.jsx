import React from "react";
import { useState, useEffect } from "react";

//scss
import "./Empstyle.scss";

// mui icons
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// importing 
import axios from "axios";

const EmpSkills = () => {
  const [skillsdata, setskillsdata] = useState("");
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getskilldata = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/employee/getprofile`,
      config
    );
    setskillsdata(response.data.data);
  };

  useEffect(() => {
    getskilldata();
  }, []);
  // console.log(skillsdata.skill)

  const [skill, setskill] = useState({
    skill: "",
  });
  const updatehandlerskill = (e) => {
    const { name, value } = e.target;
    setskill({
      ...skill,
      [name]: value,
    });
  };

  const createskilldata = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/employee/updateSkills`,
        skill,
        config
      );
      setskillsdata([...skillsdata, response.data]);
      setskill({
        skill: " ",
      });
      getskilldata();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteskilldata = async (item) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/employee/deleteSkills/${item}`,
        config
      );
      getskilldata();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="field">
      <h2>Skill:</h2>
      <div className="input-field">
        {" "}
        <input
          type="text"
          name="skill"
          placeholder="ENTER SKILLS"
          value={skill.skill}
          onChange={updatehandlerskill}
        />
        <button className="removebg" onClick={createskilldata}>
          <CheckIcon
            sx={{ color: "green", marginLeft: "10px", fontSize: "40px" }}
          />
        </button>
      </div>

      {skillsdata &&
        skillsdata.skills.map((item) => {
          return (
            <div className="skill-container-styling">
              <div className="container-size">
                <div>
                  <h1>{item}</h1>
                </div>
              </div>
              <button
                className="removebg"
                onClick={() => {
                  deleteskilldata(item);
                }}
              >
                {" "}
                <CloseIcon
                  sx={{ color: "red", marginLeft: "10px", fontSize: "40px" }}
                />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default EmpSkills;
