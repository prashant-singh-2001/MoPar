import React, { useState } from "react";
import { useNavigate } from "react-router";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/ViewCatalogue/${keyword}`);
    } else {
      navigate("/ViewCatalogue");
    }
  };
  const setAll = (e) => {
    setKeyword(e.target.value);
    searchSubmitHandler(e);
  };

  return (
    <>
      <form className="container mt-0" onSubmit={searchSubmitHandler}>
        <div className="row justify-content-center ">
          <div className="col-md-6">
            <div className="input-group ">
              <input
                type="text"
                className="form-control s-2vh rounded-0"
                placeholder="Search Manufacturer..."
                onChange={setAll}
                id="search"
              />

              <div className="input-group-append ">
                <input
                  className="btn btn-outline-warning s-2vh rounded-0"
                  type="submit"
                  value={"Search"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;
