import React,{Fragment,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {Link, useHistory} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import {DataGrid} from "@material-ui/data-grid"
import {adminAllUsers, adminDeleteUser, clearErrors} from "../../actions/adminUserAction"
import MetaData from "../layout/MetaData.js"
import SideBar from "./SideBar.js"
import { ADMIN_DELETE_USER_RESET } from '../../constants/adminUserConstants'
import "./UserList.css"

const UserList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    
    const {error, users} = useSelector(state => state.adminUsers);
    const { error: deleteError, isDeleted, message } = useSelector(state => state.adminUser);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
        { field: "role", headerName: "Role", type: "number", minWidth: 150, flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
            },
        },
        { field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))} >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ]

    const rows = []

    users && users.forEach((user) => {
        rows.push({
            id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
        });
    });

    const deleteUserHandler = (id) => {
        dispatch(adminDeleteUser(id));
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
    
        if (isDeleted) {
            alert.success(message);
            history.push("/admin/users");
            dispatch({ type: ADMIN_DELETE_USER_RESET });
        }

        dispatch(adminAllUsers());
    },[dispatch,error,alert,deleteError,history,message,isDeleted])

    return (
        <Fragment>
            <MetaData title="ALL USERS - Admin" />

            <div className="dashboard">
                <SideBar />
                <div className="userListContainer">
                    <h1 id="userListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="userListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default UserList
