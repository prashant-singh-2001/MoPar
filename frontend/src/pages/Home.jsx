import React, { useEffect } from "react";
import ShowBoard from "../components/showBoard";
import HomeCardProduct from "../components/homeCardProduct";
import BannerFont from "../components/BannerFont";
import FootFet from "../components/footFet";
import ServiceBanners from "../components/ServiceBanners";
import Feature6 from "../components/Feature6";
import ModalTop from "../components/ModalTop";
import Header from "../components/header";
import MetaData from "../js/MetaData";
import Loader from "../components/Loader";
import { clearErrors, getProduct } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
const MainContainer = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title={"MoPar"} />

      <ModalTop />
      <div className="container-fluid banner-body">
        <Header active={"home"} />
        <ShowBoard />
      </div>
      <div className="bg-dark">
        <div className="card card-body shadow-xl mx-3 mx-md-4 mt-n8 blur shadow-blur">
          <div className="container-fluid">
            <div className="section text-center">
              <div className="row flex justify-content-center text-center text-colorFull">
                <BannerFont
                  BanValue="10K"
                  Whoa="Happy and Returning customers"
                />
                <BannerFont BanValue="900" Whoa="Weeks of success" />
                <BannerFont
                  BanValue="2K"
                  Whoa="Models for each manufacturers"
                />
                <BannerFont BanValue="80" Whoa="Listed Manumfacturers" />
                <BannerFont BanValue="4" Whoa="Global Awards in eCommerce!" />
              </div>
              <div className="row flex flex-body justify-content-around mx-4 mt-5">
                <div className="col-12">
                  <div className="text-capitalize big-font-m">
                    Deals like Cake just out of Oven!
                  </div>
                </div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {product &&
                      product.map((e, i) => {
                        return (
                          <div className="col-md-4 my-3 mid-image" key={i}>
                            <HomeCardProduct product={e} />
                          </div>
                        );
                      })}
                    {/* <div className="col-md-4 my-3 mid-image">
                      <HomeCardProduct
                        productName={"Eagle Speedster"}
                        productDesc={
                          " Some quick example text to build on the card title and make up the bulk of the card's content."
                        }
                        prouctImage={"../assets/img/eagle.jpg"}
                      />
                    </div>
                    <div className="col-md-4 my-3 mid-image">
                      <HomeCardProduct
                        productName={"Ford Mustang"}
                        productDesc={
                          " Some quick example text to build on the card title and make up the bulk of the card's content."
                        }
                        prouctImage={"../assets/img/mustang70.jpg"}
                      />
                    </div>
                    <div className="col-md-4 my-3 mid-image">
                      <HomeCardProduct
                        productName={"BMW 1M"}
                        productDesc={
                          " Some quick example text to build on the card title and make up the bulk of the card's content."
                        }
                        prouctImage={"../assets/img/1m.jpg"}
                      />
                    </div>
                    <div className="col-md-4 my-3 mid-image">
                      <HomeCardProduct
                        productName={"Maserrati Gran Trusimo"}
                        productDesc={
                          " Some quick example text to build on the card title and make up the bulk of the card's content."
                        }
                        prouctImage={"../assets/img/gtmaserrati.jpg"}
                      />
                    </div>
                    <div className="col-md-4 my-3 mid-image">
                      <HomeCardProduct
                        productName={"Ford Fiest 2015"}
                        productDesc={
                          " Some quick example text to build on the card title and make up the bulk of the card's content."
                        }
                        prouctImage={"../assets/img/fiest2015.jpg"}
                      />
                    </div> */}
                  </>
                )}
              </div>
              <div className="row flex flex-row justify-content-around mx-5 mt-10">
                <div className="col-12">
                  <div className="text-capitalize big-font-m">
                    Features that keeps you wanting more!
                  </div>
                </div>

                <ServiceBanners
                  image={"image1"}
                  location={"top-right-service"}
                  text={"Help availabel on the road anywhere!"}
                />

                <ServiceBanners
                  image={"image2"}
                  location={"top-left-service"}
                  text={"Enhance your experience with cutting edge technology"}
                />
                <ServiceBanners
                  image={"image3"}
                  location={"bottom-right-service"}
                  text={"Servicing like never imagined"}
                />
                <ServiceBanners
                  image={"image4"}
                  location={"bottom-left-service"}
                  text={"Latest arrivals with fastest deliveries"}
                />
              </div>
              <div className="row flex flex-row justify-content-around mx-5 mt-10">
                <div className="col-12">
                  <div className="text-capitalize big-font-m">
                    We got you covered!
                  </div>
                </div>
                <Feature6
                  imageUrl={"../assets/Feather/calendar.svg"}
                  text={"On Time Delivery! With least Waiting!"}
                />
                <Feature6
                  imageUrl={"../assets/Feather/settings.svg"}
                  text={
                    "Servicing available from the best mechanic in Industry"
                  }
                />
                <Feature6
                  imageUrl={"../assets/Feather/credit-card.svg"}
                  text={"Pay as you use!"}
                />
                <Feature6
                  imageUrl={"../assets/Feather/thumbs-up.svg"}
                  text={"Most reviewed site with highest average rating!"}
                />
                <Feature6
                  imageUrl={"../assets/Feather/monitor.svg"}
                  text={"We maintain record so you can be free!"}
                />
                <Feature6
                  imageUrl={"../assets/Feather/shield.svg"}
                  text={"Minimum 12 months guareente!"}
                />
              </div>
            </div>
          </div>
        </div>
        <FootFet white={true} />
      </div>
    </>
  );
};

export default MainContainer;
