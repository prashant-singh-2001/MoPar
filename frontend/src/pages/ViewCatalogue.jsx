import React from "react";
import FootFet from "../components/footFet";
import CatalogueBan from "../components/CatalogueBan";
import Products from "../components/Products";
import Header from "../components/header";
import ModalTop from "../components/ModalTop";
import MetaData from "../js/MetaData";

const ViewCatalogue = () => {
  return (
    <>
      <MetaData title={"View Catalogue"} />

      <ModalTop />
      <div className="bg-dark">
        <div className="container-fluid">
          <Header active={"View Catalogue"} />
          <CatalogueBan />

          <div className="card card-body shadow-xl mx-1 mx-md-4 mt-n4 py-0 blur shadow-blur shadow-blur-out">
            <Products />
            {/* <div className="Page navigation example">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={(e) => {
                  setcurrentPage(e);
                }}
                nextPageText={
                  <Image
                    imageUrl={"../assets/Feather/chevron-right.svg"}
                    Hei={"20px"}
                    alternate={"Next"}
                  />
                }
                prevPageText={
                  <Image
                    imageUrl={"../assets/Feather/chevron-left.svg"}
                    Hei={"20px"}
                    alternate={"prev"}
                  />
                }
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
                activeLinkClass="active"
              />
            </div> */}
          </div>
          <FootFet white={true} />
        </div>
      </div>
    </>
  );
};

export default ViewCatalogue;
