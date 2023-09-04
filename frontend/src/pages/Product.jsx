import React, { useEffect } from "react";
import ModalTop from "../components/ModalTop";
import Header from "../components/header";
import BreadCrumbs from "../components/BreadCrumbs";
import Carousel from "../components/Carousel";
import ProductDescription from "../components/ProductDescription";
import RecommendedCard from "../components/RecommendedCard";
import MetaData from "../js/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../actions/productAction";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { useAlert } from "react-alert";
import FootFet from "../components/footFet";

const Product = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);
  const recom = [
    {
      name: "CAR1",
      img: "../assets/img/Cars/LaFerrari/2-58-1024x683.jpg",
      id: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      name: "CAR1",
      img: "../assets/img/Cars/LaFerrari/3-58-1024x683.jpg",
      id: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      name: "CAR1",
      img: "../assets/img/Cars/LaFerrari/4-58-1024x683.jpg",
      id: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      name: "CAR1",
      img: "../assets/img/Cars/LaFerrari/1-57-1024x683.jpg",
      id: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      name: "CAR1",
      img: "../assets/img/Cars/LaFerrari/2-58-1024x683.jpg",
      id: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
  ];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.manufacturer + " " + product.model} />
          <ModalTop />
          <div className="bg-dark-subtle">
            <div className="container pb-4">
              <div className="row">
                <Header />
              </div>
              <div className="row mt-5">
                <BreadCrumbs />
              </div>
              <div className="row rounded-1 blur">
                <div className="col-12 heading big-font-m">
                  {product.manufacturer + " " + product.model}
                </div>
                <div className="col-12 container-fluid">
                  <div className="row">
                    <div className="col-7 ">
                      <Carousel id={id} images={product.images} />
                    </div>
                    <div className="col-5">
                      <ProductDescription product={product} />
                    </div>
                  </div>
                </div>
                <hr className="border border-3 blur"></hr>
                <div className="col-12 my-2">
                  <RecommendedCard
                    getCategory={"Similar Horsepower"}
                    products={recom}
                    classes={"bg-warning-subtle  rounded-2"}
                  />
                </div>
                <div className="col-12 my-2 ">
                  <RecommendedCard
                    getCategory={"From the same brand : "}
                    products={recom}
                    classes={"bg-light-subtle  rounded-2"}
                  />
                </div>
              </div>
              <FootFet white={true} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
