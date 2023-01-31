import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Profileform.scss";
import EmpEducation from "../Profileform/Components/EmpEducation";
import EmpExperience from "../Profileform/Components/EmpExperience";
import EmpSkills from "./Components/EmpSkills";

const Profileform = () => {
  const [middeldata, setMiddeldata] = useState("");
  const [file, setFile] = useState();

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [readInput, setReadInput] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const getemplyeemiddledetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/employee/getprofile`,
        config
      );
      setMiddeldata(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getemplyeemiddledetails();
  }, []);

  //  file uploader
  // const handleChange = (event) => {
  //   let file = event.target.files[0]
  //   setFile(event.target.files[0])
  //   console.log(file)
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const url = 'http://localhost:3000/uploadFile'
  //   const formData = new FormData()
  //   formData.append('file', file)
  //   formData.append('fileName', file.name)
  // const config = {
  //   headers: {
  //     'content-type': 'multipart/form-data',
  //   },
  // }
  //   axios.post(url, formData, config).then((response) => {
  //     console.log(response.data)
  //   })
  // }
  const uploadCV = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    const formData = new FormData();
    formData.append("cv_file", file);

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      };
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/employee/updatecv`,
        formData,
        options
      );

      console.log(response.data.data);
      getemplyeemiddledetails();
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(middeldata.cv.url);
  const [middataform, setMiddataform] = useState({
    aboutme:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ctc: "",
    noticeperiod: "",
    jobtype: "",
    workmode: "",
  });
  const updatehandlerempdata = (e) => {
    const { name, value } = e.target;
    setMiddataform({
      ...middataform,
      [name]: value,
    });
    setMiddeldata(e.target.value);
  };

  const handleformSubmit = () => {
    setTimeout(() => {
      setReadInput(true);
      setIsDisabled(true);
    }, 200);
    alert("Data is saved");
  };
  const handleformUpdate = () => {
    if (readInput === true) {
      setReadInput(false);
    }
    setIsDisabled(false);
    alert("Data is editable");
  };

  const formSubmits = async (e) => {
    e.preventDefault();
    console.log(middataform);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/employee/updateprofile`,
        middataform,
        config
      );
      console.log(response.data);
      getemplyeemiddledetails();
    } catch (error) {
      console.log(error.message);
    }
  };

  // const [pdfFile, setPdfFile] = useState(null);

  // const downloadPDF = async () => {
  //   const url = middeldata.cv.url;
  //   console.log(`url==${url}`);
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     const pdf = await response.blob();
  //     setPdfFile(URL.createObjectURL(pdf));
  //     console.log(pdfFile);
  //   } else {
  //     console.log("Error in response");
  //   }
  // };

  const [pdfUrl, setPdfUrl] = useState(null);
  const downloadPDF = async () => {
    if (middeldata.cv) {
      setPdfUrl(middeldata.cv.url);
    } else {
      console.log("Please upload your CV first");
    }
  };

  return (
    <div className="middleform">
      <form onSubmit={formSubmits}>
        <div className="edit-button-container">
          <button onClick={handleformUpdate}>EDIT</button>
        </div>
        <div className="ctc-container">
          <h2>About me</h2>
          <textarea
            name="about_me"
            value={middeldata.about_me || middataform.about_me}
            placeholder="enter About you here"
            onChange={updatehandlerempdata}
            readOnly={readInput}
          ></textarea>
        </div>

        <div>
          <EmpExperience />
        </div>
        <div>
          <EmpEducation />
        </div>
        <div>
          <EmpSkills />
        </div>

        <div className="ctc-container">
          <h2>CTC</h2>
          <input
            id="ctc"
            type="text"
            name="ctc"
            value={middeldata.ctc || middataform.ctc}
            placeholder="Enter your CTC"
            onChange={updatehandlerempdata}
            readOnly={readInput}
          />
        </div>

        <br />

        <div className="select-container">
          <h2>Notice period</h2>
          <select
            name="notice_period"
            id="notice_period"
            value={middeldata.notice_period || middataform.notice_period}
            onChange={updatehandlerempdata}
          >
            <option value="noticeperiod">Select Noticeperiod</option>
            <option value="Immediately">Immediately</option>
            <option value="15Days">15Days</option>
            <option value="1Month">1Month</option>
            <option value="2Months">2Months</option>
            <option value="3Months">3Months</option>
          </select>
        </div>

        <br />

        <div className="select-container">
          <h2>Job Type</h2>
          <select
            name="job_type"
            id="job_type"
            value={middeldata.job_type || middataform.job_type}
            onChange={updatehandlerempdata}
          >
            <option value="selectjobtype">Select Job Type</option>
            <option value="fulltime">Full-Time</option>
            <option value="parttime">part-Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <br />
        <div className="select-container">
          <h2>Prefered Work Mode :</h2>
          <select
            name="work_mode"
            id="work_mode"
            value={middeldata.work_mode || middataform.work_mode}
            onChange={updatehandlerempdata}
          >
            <option value="selectworkmode">Select Wrok Mode</option>
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <br />

        <div className="save-button-container">
          <button
            type="submit"
            disabled={isDisabled}
            onClick={handleformSubmit}
          >
            SAVE PROFILE
          </button>
        </div>
      </form>

      <div className="uploadcv-container-main">
        <div className="uploadcv-container">
          <div className="uploadcv-container">
            <button className="uploadcv-button" type="submit">
              Upload CV
            </button>
          </div>
          <div className="uploadfile-container">
            <input
              type="file"
              className="file-input"
              onChange={uploadCV}
            ></input>
          </div>
          <div className="url-data">
            {middeldata.cv ? (
              <button onClick={downloadPDF}>Download CV</button>
            ) : (
              ""
            )}
            {pdfUrl && (
              <a href={pdfUrl} target="_blank" download>
                download your cv
              </a>
            )}
          </div>
          {/* {image ? image.url : profilepic} */}
        </div>
      </div>
    </div>
  );
};

export default Profileform;
