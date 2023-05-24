import React, { Fragment , useState , useRef } from 'react';
import Loader from "../layout/Loader/Loader.js";
import {Link} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import Profile from "../../images/Profile.png"
import "./LoginSignup.css";

const LoginSignup = () => {

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name : "",
        email : "",
        password : ""
    });

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(Profile);

    const {name, email, password} = user;

    const switchTabs = (e, tab) => {
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }else{
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    const loginSubmit = () => {
        console.log("Login Form submiited");
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const Form = new FormData();

        Form.set("name",name);
        Form.set("email",email);
        Form.set("password", password);
        Form.set("avatar", avatar);

        console.log("Register Form submiited");
    }

    const registerDataChange = (e) => {
        if(e.target.name==="avatar"){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState===2){ // 2 = done, 1 = processing, 0 = initial
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({ ...user, [e.target.name] : e.target.value})
        }
    }

    return (
        <Fragment>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e,"login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e,"register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>

                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input 
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input 
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forgot Password</Link>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>

                    <form className="signUpForm" ref={registerTab} encType="mutlipart/form-data" onSubmit={registerSubmit}>
                        <div className="signUpName">
                            <FaceIcon />
                            <input 
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input 
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input 
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input 
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginSignup
