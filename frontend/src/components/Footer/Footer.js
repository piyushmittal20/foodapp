import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './Footer.css'

function Footer(props) {
    return (
        <footer className="home_footer" >
            <div>

                <h2><strong className="first_letter_effect">F</strong>ood App</h2>
                <hr></hr>
                <p>About the company , stuff like this....</p>
            </div>

            <div>
            <h2> <strong className="first_letter_effect">Q</strong>uick Links </h2>
            <hr></hr>
            <ul className="quick_links">
                <li><a>Get Started </a></li>
                <li><a>Get Started </a></li>
                <li><a>Get Started </a></li>
            </ul>
            
            </div>
            <div>
            <h2><strong className="first_letter_effect">F</strong>or Business</h2>
            <hr></hr>
            <Button className="addrestaurant_button">Add Restaurant</Button>
            </div>
            <div>
            <h2><strong className="first_letter_effect">C</strong>ontact Us</h2>
            <hr></hr>
            <div className="social_links">
            <LinkedInIcon/>
            <GitHubIcon/>
            <MailOutlineIcon/>
            </div>
            
            
            </div>

        </footer>
    );
}

export default Footer;