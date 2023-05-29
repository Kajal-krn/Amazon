import React,{Fragment,useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import {useHistory} from "react-router-dom"
import {adminCreateProduct, clearErrors} from "../../actions/adminProductAction.js"
import {Button} from "@material-ui/core"
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {ADMIN_NEW_PRODUCT_RESET} from "../../constants/adminProductConstants.js"
import MetaData from '../layout/MetaData.js'
import SideBar from './SideBar.js'
import "./CreateProduct.css"

const CategoriesList=[
    "Laptop","Footwear","Bottom","Tops","Attire","Camera","Cycle","Mobile","Desktop","Book","Bag"
]

const CreateProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const {loading, error, success} = useSelector(state => state.adminNewProduct);
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const ProductSubmitHandler = (e) => {
        e.preventDefault();

        const Form = new FormData();

        Form.set("name", name);
        Form.set("price", price);
        Form.set("description", description);
        Form.set("category", category);
        Form.set("stock", stock);
        images.forEach((image) => {
            Form.append("images", image);
        })

        dispatch(adminCreateProduct(Form));
    }

    const ProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
        
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Product Created Successfully");
            history.push("/admin/dashboard");
            dispatch({type : ADMIN_NEW_PRODUCT_RESET});
        }

    },[dispatch, error, alert, history, success])

    return (
        <Fragment>
            <MetaData title="Create Product" />

            <div className="dashboard">
                <SideBar />

                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={ProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input 
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {CategoriesList.map((cate) => (
                                    <option key={cate} value={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input 
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input 
                                type="file"
                                name="avater"
                                accept="image/*"
                                onChange={ProductImagesChange}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img src={image} alt="Avater Preview" key={index} />
                            ))}
                        </div>
                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true :false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateProduct
