import React, { Fragment , useState , useEffect } from 'react';
import Loader from "../layout/Loader/Loader.js";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword , clearErrors } from "../../actions/userAction.js";
import {useAlert}  from "react-alert";
import MetaData from "../layout/MetaData.js"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./UpdatePassword.css";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants.js';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    
    const {loading, error, isUpdated} = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const Form = new FormData();

        Form.set("oldPassword", oldPassword);
        Form.set("newPassword", newPassword);
        Form.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(Form));

        //console.log("updatePassword Form submiited");
    }

    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }

        if(isUpdated){
            alert.success("Password updated Successfully");
            history.push("/account");
            dispatch({
                type : UPDATE_PASSWORD_RESET
            })
        }

    },[dispatch,error,alert,history,isUpdated])

    return (
        <Fragment>
            {loading ? (<Loader/>) : (
                <Fragment>

                    <MetaData title={`Change Password`} />
        
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>
                            <form className="updatePasswordForm" encType="mutlipart/form-data" onSubmit={updatePasswordSubmit}>
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input 
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input 
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input 
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Change Password" className="updatePasswordBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UpdatePassword
