import React, { Fragment , useState , useEffect } from 'react';
import Loader from "../layout/Loader/Loader.js";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword , clearErrors } from "../../actions/userAction.js";
import {useAlert}  from "react-alert";
import MetaData from "../layout/MetaData.js"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import "./ResetPassword.css";

const ResetPassword = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    
    const {loading, error, success} = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const Form = new FormData();

        Form.set("password", password);
        Form.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(match.params.token, Form));
    }

    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Password Reset Successfull");
            history.push("/login");
        }

    },[dispatch,error,alert,history,success])

    return (
        <Fragment>
            {loading ? (<Loader/>) : (
                <Fragment>

                    <MetaData title={`Reset Password`} />
        
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Reset Password</h2>
                            <form className="resetPasswordForm" encType="mutlipart/form-data" onSubmit={resetPasswordSubmit}>
                                <div className="password">
                                    <LockOpenIcon />
                                    <input 
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="confirmPassword">
                                    <LockIcon />
                                    <input 
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Reset Password" className="resetPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ResetPassword
