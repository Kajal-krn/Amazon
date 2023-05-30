import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { adminUserDetails, adminUpdateUser, clearErrors} from "../../actions/adminUserAction";
import SideBar from "./SideBar.js";
import Loader from "../layout/Loader/Loader.js";
import MetaData from "../layout/MetaData.js";
import { ADMIN_UPDATE_USER_RESET } from "../../constants/adminUserConstants";
import "./UpdateUser.css"

const UpdateUser = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { loading, error, user } = useSelector((state) => state.adminUserDetails);
    const { loading: updateLoading, error: updateError, isUpdated} = useSelector((state) => state.adminUser);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = match.params.id;

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const Form = new FormData();
    
        Form.set("name", name);
        Form.set("email", email);
        Form.set("role", role);
    
        dispatch(adminUpdateUser(userId,Form));
    };

    useEffect(() => {
        if(user && user._id !== userId){
            dispatch(adminUserDetails(userId));
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("User Updated Successfully");
            history.push("/admin/users");
            dispatch({type : ADMIN_UPDATE_USER_RESET})
        }

    },[dispatch, history, error, updateError, isUpdated, userId, alert, user])

    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <SideBar />
                <div className="updateUserContainer">
                    {loading ? (<Loader />) : (
                        <form
                            className="updateUserForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                        <Button
                            id="updateUserBtn"
                            type="submit"
                            disabled={ updateLoading ? true : false || role === "" ? true : false}
                        >
                            Update
                        </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateUser
