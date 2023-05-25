import React, { Fragment , useState , useEffect } from 'react';
import Loader from "../layout/Loader/Loader.js";
import {useHistory} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import Profile from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile , clearErrors, loadUser } from "../../actions/userAction.js";
import {useAlert}  from "react-alert";
import MetaData from "../layout/MetaData.js"
import "./UpdateProfile.css";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants.js';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const {user} = useSelector(state => state.user);
    const {loading, error, isUpdated} = useSelector(state => state.profile);

    const [name,setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(Profile);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const Form = new FormData();

        Form.set("name",name);
        Form.set("email",email);
        Form.set("avatar", avatar);

        dispatch(updateProfile(Form));

        //console.log("updateProfile Form submiited");
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState===2){ // 2 = done, 1 = processing, 0 = initial
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }

        if(isUpdated){
            alert.success("Profile updated Successfully");
            dispatch(loadUser());
            history.push("/account");
            dispatch({
                type : UPDATE_PROFILE_RESET
            })
        }

    },[dispatch,error,alert,history,isUpdated,user])

    return (
        <Fragment>
            {loading ? (<Loader/>) : (
                <Fragment>

                    <MetaData title={`Update Profile`} />
        
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>
                            <form className="updateProfileForm" encType="mutlipart/form-data" onSubmit={updateProfileSubmit}>
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input 
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input 
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input 
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input type="submit" value="Update Profile" className="updateProfileBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UpdateProfile
