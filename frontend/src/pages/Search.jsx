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
      <form class="container mt-0" onSubmit={searchSubmitHandler}>
        <div class="row justify-content-center ">
          <div class="col-md-6">
            <div class="input-group ">
              <input
                type="text"
                class="form-control s-2vh rounded-0"
                placeholder="Search Manufacturer..."
                onChange={setAll}
                id="search"
              />

              <div class="input-group-append ">
                <input
                  class="btn btn-outline-warning s-2vh rounded-0"
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
