// SCSS
import "./Sharecode.scss";

//IMPORT DEPENDECIS
import {
  EmailIcon,
  WhatsappIcon,
  EmailShareButton,
  WhatsappShareButton,
} from "react-share";

const Sharecode = () => {
  // let code = 'vinay12';
  return (
    <div>
      <div>
        <h3>Share Code:</h3>
      </div>
      <div className="social-media-referal">
        <div>
          <WhatsappShareButton url={`PLEASE PASTE YOUR REFERAL CODE HERE: `}>
            <WhatsappIcon size={45} round={true} />
          </WhatsappShareButton>
        </div>

        <div>
          <EmailShareButton url={`PLEASE PASTE YOUR REFERAL CODE HERE: `}>
            <EmailIcon size={45} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default Sharecode;
