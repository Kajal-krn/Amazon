import React from "react";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import "./About.css";

const About = () => {

    const visitGitHub = () => {
        window.location = "https://github.com/Kajal-krn";
    };

    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>
    
                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/amazon-clone-2001/image/upload/v1659819514/Owner/profile_drsqej.jpg"
                            alt="Founder"
                        />
                        <Typography>Kajal Kiran</Typography>
                        <Button onClick={visitGitHub} color="primary">
                            Visit GitHub
                        </Button>
                        <span>
                            This is a sample wesbite made by @Kajal
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">My Profiles</Typography>
                        <a href="https://github.com/Kajal-krn" target="blank" >
                            <GitHubIcon className="githubSvgIcon" />
                        </a>
            
                        <a href="https://www.linkedin.com/in/kajal-kiran-4a82b5217/" target="blank">
                            <LinkedInIcon className="linkedinSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
