import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo from "../../../images/logo.png";

const options = {
    burgerColor:"#eb4034",
    burgerColorHover:"#eb4034",
    navColor1:"white",
    logo,
    logoWidth:"20vmax",
    logoHoverSize:"10px",
    logoHoverColor:"20vmax",
    logoTransition:	0.5,
    logoAnimationTime:	1,
    link1Text:"Home",
    link2Text:"Product",
    link3Text:"Contact",
    link4Text:"About",

    link1Url:"/",
    link2Url:"/products",
    link3Url:"/contact",
    link4Url:"/about",

    link1Color:"rgba(35, 35, 35,0.8)",
    link2Color:"rgba(35, 35, 35,0.8)",
    link3Color:"rgba(35, 35, 35,0.8)",
    link4Color:"rgba(35, 35, 35,0.8)",

    link1Size:"1.3vmax",
    link2Size:"1.3vmax",
    link3Size:"1.3vmax",
    link4Size:"1.3vmax",

    nav1justifyContent:"flex-end",
    nav2justifyContent:"flex-end",
    nav3justifyContent:"flex-start",
    nav4justifyContent:"flex-start",

    link1ColorHover: "#eb4034",
    link2ColorHover: "#eb4034",
    link3ColorHover: "#eb4034",
    link4ColorHover: "#eb4034",

    link1Margin: "2vmax",
    link2Margin: "2vmax",
    link3Margin: "2vmax",
    link4Margin: "2vmax",

    profileIcon:true,
    profileIconSize: "2.5vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    profileIconMargin:"10",

    cartIcon:true,
    cartIconSize:  "2.5vmax",
    cartIconUrl: "/cart",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColorHover: "#eb4034",
    cartIconMargin:"10",

    searchIcon:true,
    searchIconSize: "2.5vmax",
    searchIconUrl: "/search",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColorHover: "#eb4034",
    searchIconMargin:"10",
}


const Header = () => {
    return (
        <ReactNavbar {...options} />
    )
}

export default Header
