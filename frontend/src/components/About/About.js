import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import logo from "../../assets/pics.jpg";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location =
      "https://instagram.com/_chirag_munjal_?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D";
  };
  return (
    <div className="aboutSection">
      <MetaData title="About" />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={logo}
              alt="Founder"
            />
            <Typography>Chirag Munjal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @ChiragMunjal. Only with the
              purpose to Learn MERN Stack and taking practical experience
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>

            <a
              href="https://instagram.com/_chirag_munjal_?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              target="blank"
            >
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
