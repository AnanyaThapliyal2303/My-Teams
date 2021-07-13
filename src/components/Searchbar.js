import React from "react";
import "./css/Searchbar.css";
import { Form, FormControl } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";

//searchbar in header
function Searchbar() {
  return (
    <div class="container">
      <Form>
        <div id="searchBar">
          <SearchIcon
            className="icon"
            id="searchicon"
            style={{ fontSize: 27.1 }}
          />
          <FormControl
            type="text"
            id="searching"
            placeholder="Search"
            className="form-center"
          />
        </div>
      </Form>
    </div>
  );
}

export default Searchbar;
