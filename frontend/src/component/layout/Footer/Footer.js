import React from 'react';
import Appstore from '../../../images/Appstore.png';
import Playstore from '../../../images/playstore.png';
import "./Footer.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download APP from Android and IOS mobile phone</p>
                <img src={Playstore} alt="playstore" />
                <img src={Appstore} alt="Appsstore" />
            </div>

            <div className="midFooter">
                <h1>AMAZON</h1>
                <p>High Quality is our frist priority</p>
                <p>Copyrights 2021 &copy; Aman </p>
            </div>

            <div className="rightFooter">
                <h4>Follow us</h4>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://instagram.com">Youtube</a>
                <a href="http://instagram.com">Facebook</a>
            </div>
        </footer>
    )
}

export default Footer
