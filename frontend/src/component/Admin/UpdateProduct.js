import React,{Fragment,useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import {useHistory} from "react-router-dom"
import {adminUpdateProduct, clearErrors} from "../../actions/adminProductAction.js"
import {getProductDetails, clearErrors as productClearErrors} from "../../actions/productAction.js"
import {Button} from "@material-ui/core"
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {ADMIN_UPDATE_PRODUCT_RESET} from "../../constants/adminProductConstants.js"
import MetaData from '../layout/MetaData.js'
import SideBar from './SideBar.js'
import "./UpdateProduct.css"

const CategoriesList=[
    "Laptop","Footwear","Bottom","Tops","Attire","Camera","Cycle","Mobile","Desktop","Book","Bag"
]

const UpdateProduct = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const {loading, error : updateError, success, message} = useSelector(state => state.adminProduct);
    const {error, product} = useSelector(state => state.productDetails);
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([])

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

        dispatch(adminUpdateProduct(match.params.id, Form));
    }

    const ProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
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

        if(product && product._id !== match.params.id){
            dispatch(getProductDetails(match.params.id));
        }else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images)
        }

        if(error){
            alert.error(error);
            dispatch(productClearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if(success){
            alert.success(message);
            history.push(`/admin/products`);
            dispatch({type : ADMIN_UPDATE_PRODUCT_RESET});
        }

    },[dispatch, error, alert, history, success, product, match.params.id, message, updateError])

    return (
        <Fragment>
            <MetaData title="Update Product" />

            <div className="dashboard">
                <SideBar />

                <div className="updateProductContainer">
                    <form
                        className="updateProductForm"
                        encType="multipart/form-data"
                        onSubmit={ProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

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
                                value={price}
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
                            <select onChange={(e) => setCategory(e.target.value)} value={category} >
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
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="updateProductFormFile">
                            <input 
                                type="file"
                                name="avater"
                                accept="image/*"
                                onChange={ProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="updateProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img src={image.url} alt="Old Product Preview" key={index} />
                            ))}
                        </div>
                        <div id="updateProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img src={image} alt="Product Preview" key={index} />
                            ))}
                        </div>

                        <Button
                            id="updateProductBtn"
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

export default UpdateProduct
