import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import {
  UpdateProducts,
  clearErrors,
  getProductDetails,
} from "../../REDUX/actions/ProductAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import "./CreateProduct.css";
import MetaData from "../Layout/MetaData";
import { UPDATE_PRODUCT_RESET } from "../../REDUX/constants/productConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldimages, setoldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id } = useParams();
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { isUpdated, error: updatedError } = useSelector(
    (state) => state.UpdateProduct
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setoldImages(product.images);
    }

    if (updatedError) {
      alert.error(updatedError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/dashboard");
    }
  }, [dispatch, product, id, error, loading, updatedError, isUpdated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(UpdateProducts(id, myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setoldImages([]);

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
  return (
    <>
      <MetaData title="ADMIN- Update Product" />
      <div className="newProductContainer" style={{ zIndex: "9" }}>
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1>update Product</h1>

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
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value={category}>{category}</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <StorageIcon />
            <input
              type="number"
              placeholder="Stock"
              required
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {oldimages &&
              oldimages.map((image, index) => (
                <img key={index} src={image.url} alt="Product Preview" />
              ))}
          </div>
          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
