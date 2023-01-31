import React, { useState } from "react";

// SCSS
import "./Referalcomp.scss";

// IMAGES
import protectionimage from "../../../../../Assets/protection.png";

// IMPORTING DEPENDECIS
import copy from "copy-to-clipboard";
import swal from "sweetalert";

const Referalcomp = () => {
  let uid = "FH9A4E6893";
  const [copyText, setCopyText] = useState(uid);
  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(copyText);
    swal(`You have copied "${copyText}"`);
  };

  return (
    <div>
      <div className="refrealcomp">
        <div className="refrealcode-heading">
          <h3>REFERRAL CODE:</h3>
        </div>
        <div className="referral-code-text">
          <div>
            <input
              type="text"
              value={copyText}
              onChange={handleCopyText}
              placeholder="Enter the text you want to copy"
            />
          </div>
          <div>
            <button onClick={copyToClipboard} className="button-text">
              Tap to copy
            </button>
          </div>
        </div>
        <div className="imagestyle">
          <img src={protectionimage} alt="noprotectionimage" />
        </div>
      </div>
    </div>
  );
};

export default Referalcomp;
