// SCSS
import "./About.scss";

// IMPORTING DIFFERENT COMPONENTS
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Section from "../About/Components/Section";

const About = () => {
  return (
    <>
      <Navbar index="3" />
      <div className="about gap">
        <Section />

        <Footer />
      </div>
    </>
  );
};

export default About;
