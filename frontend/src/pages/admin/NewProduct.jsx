import React, { Fragment, useEffect, useState } from "react";
import "../../css/newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import MetaData from "../../js/MetaData";
import Header from "../../components/header";
import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import DirectionsCarOutlinedIcon from "@material-ui/icons/DirectionsCarOutlined";
import ViewCarouselOutlinedIcon from "@material-ui/icons/ViewCarouselOutlined";
import BuildIcon from "@material-ui/icons/Build";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(1960);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [size, setSize] = useState(0);
  const [cylinder, setCylinder] = useState(0);
  const [typeOfEngine, setTypeOfEngine] = useState("");
  const [engines, setEngines] = useState([]);
  const setEngineComp = () => {
    const newEngine = {
      size,
      cylinder,
      typeOfEngine,
      price,
    };
    setEngines([...engines, newEngine]);
    setSize(0);
    setCylinder(0);
    setTypeOfEngine("");
    setPrice(0);
  };
  const categories = [
    "Hyper",
    "Luxury",
    "Sports",
    "Super",
    "Track",
    "SUV",
    "Muscle",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("manufacturer", manufacturer);
    myForm.set("model", model);
    myForm.set("year", year);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    engines.forEach((engine) => {
      myForm.append("engines", engine);
    });
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
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

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="container-fluid bg-dark pt-5">
        <Header />
        <div className="container-fluid mt-3 px-5">
          <div className="row">
            <div className="col-3">
              <SideBar />
            </div>
            <div className="col-9 ">
              <div className="row">
                <form
                  className="modal-body bg-light p-4 rounded-2 "
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <div className="text-center">
                    <p className="big-font-m mb-3">Create Product</p>
                  </div>

                  <div className="col-12 modal-body border border-2 px-3 mb-2 rounded-2">
                    <div className=" fs-3 text-center fw-bold">
                      Enter Car Details
                    </div>
                    <div className=" row  p-2 broder border-2">
                      <div className="col-4">
                        <ViewCarouselOutlinedIcon className="fs-1" />
                        <div className="form-floating">
                          <input
                            type="text"
                            placeholder="Manufacturer"
                            required
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                            className="form-control"
                            id="manufact"
                          />
                          <label htmlFor="manufact">ManuFacturer</label>
                        </div>
                      </div>
                      <div className="col-4">
                        <DirectionsCarOutlinedIcon className="fs-1" />
                        <div className="form-floating">
                          <input
                            type="text"
                            placeholder="Model"
                            required
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="form-control"
                            id="model"
                          />
                          <label htmlFor="model">Model</label>
                        </div>
                      </div>
                      <div className="col-4">
                        <TodayOutlinedIcon className="fs-1" />
                        <div className="form-floating">
                          <input
                            type="number"
                            placeholder="Year"
                            required
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="form-control"
                            id="year"
                          />
                          <label htmlFor="year">Year</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12  modal-body border border-2 px-2 rounded-2">
                    <div className=" row mt-4">
                      <div className="col-12 ">
                        <p className="text-center fw-bold fs-3">
                          Engine Specification
                        </p>
                        <hr className="border border-2"></hr>

                        <div className="row my-2">
                          <p className=" fw-bold fs-4">Added Engines</p>
                          {engines.length !== 0 ? (
                            <>
                              {engines.map((e) => {
                                return (
                                  <div className="fs-5 col-12">
                                    {e.cylinder +
                                      " Cylinders " +
                                      e.size +
                                      " Liter " +
                                      e.typeOfEngine +
                                      " Type for £" +
                                      e.price}
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="fs-5">No Engines Added yet!</div>
                          )}
                        </div>
                        <hr className="border border-2"></hr>
                      </div>
                      <div className="col-3">
                        <AlbumOutlinedIcon className="fs-1" />
                        <div className="form-floating">
                          <input
                            type="number"
                            placeholder="Cylinder"
                            value={cylinder}
                            onChange={(e) => setCylinder(e.target.value)}
                            className="form-control"
                            id="cylinder"
                          />
                          <label htmlFor="cylinder">Number Of Cylinder</label>
                        </div>
                      </div>
                      <div className="col-3">
                        <BuildIcon className="fs-1" />
                        <div className="form-floating">
                          <input
                            type="number"
                            placeholder="Size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="form-control"
                            id="size"
                          />
                          <label htmlFor="size">Engine Size</label>
                        </div>
                      </div>
                      <div className="col-3">
                        <MergeTypeIcon className="fs-1" />
                        <div className="form-floating">
                          <input
                            type="text"
                            placeholder="TypeOfEngine"
                            value={typeOfEngine}
                            onChange={(e) => setTypeOfEngine(e.target.value)}
                            className="form-control"
                            id="toe"
                          />
                          <label htmlFor="toe">Type Of Engine</label>
                        </div>
                      </div>
                      <div className="col-3">
                        <AttachMoneyIcon className="fs-1" />
                        <div className="form-floating">
                          <input
                            type="number"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                            id="price"
                          />
                          <label htmlFor="price">Price</label>
                        </div>
                      </div>
                      <Link
                        className="btn btn-outline-danger mx-auto w-25 my-2"
                        onClick={() => {
                          setEngineComp();
                        }}
                      >
                        Add Engine
                      </Link>
                    </div>
                  </div>

                  <DescriptionIcon className="fs-1 mt-1" />
                  <div className="form-floating mb-1">
                    <textarea
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="1"
                      className="form-control"
                      id="desc"
                    ></textarea>
                    <label htmlFor="desc">Description</label>
                  </div>

                  <AccountTreeIcon className="fs-1 mt-1" />
                  <div>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control mb-1"
                    >
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <StorageIcon className="fs-1 mt-1" />
                  <div className="form-floating mb-1">
                    <input
                      type="number"
                      placeholder="Stock"
                      required
                      onChange={(e) => setStock(e.target.value)}
                      className="form-control"
                      id="stock"
                    />
                    <label className="stock">Stock</label>
                  </div>

                  <div className="my-2">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={createProductImagesChange}
                      multiple
                      className="form-control p-3"
                    />
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
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
