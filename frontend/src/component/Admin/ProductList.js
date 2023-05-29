import React,{Fragment,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import {DataGrid} from "@material-ui/data-grid"
import {getAdminProducts, clearErrors, adminDeleteProduct} from "../../actions/adminProductAction"
import MetaData from "../layout/MetaData.js"
import SideBar from "./SideBar.js"
import { ADMIN_DELETE_PRODUCT_RESET } from '../../constants/adminProductConstants'
import "./ProductList.css"

const ProductList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const {error,products} = useSelector(state => state.adminProducts);
    const { error: deleteError, success, message } = useSelector(state => state.adminProduct);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
        { field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false,
            renderCell: (params) => {
              return (
                <Fragment>
                  <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                  </Link>
      
                  <Button
                    onClick={() =>
                      deleteProductHandler(params.getValue(params.id, "id"))
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
        }
    ]

    const rows = []

    products && products.forEach(product => {
        rows.push({
            id : product._id,
            name : product.name,
            stock : product.stock,
            price : product.price,
        })
    })

    const deleteProductHandler = (id) => {
      console.log(id);
        dispatch(adminDeleteProduct(id));
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
    
        if (success) {
            alert.success(message);
            history.push("/admin/products");
            dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());
    },[dispatch,error,alert,deleteError,history,message,success])

    return (
        <Fragment>
            <MetaData title="ALL PRODUCTS - Admin" />

            <div className="dashboard">
                <SideBar/>
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductList
