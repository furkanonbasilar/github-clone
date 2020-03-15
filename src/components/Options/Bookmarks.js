import React, { useState } from "react";
import CustomCard from "components/CustomCard/CustomCard";
import InputLabel from "@material-ui/core/InputLabel";
import { Select, MenuItem } from "@material-ui/core";
import "./Bookmarks.scss";
import { connect } from "react-redux";

const Bookmarks = ({ bookmarks }) => {
  const [optionValue, setOptionValue] = useState("");

  const renderRepos = () => {
    return filterData().map(x => (
      <CustomCard data={x.repoData} categories={x.categories} />
    ));
  };

  const filterData = () => {
    return bookmarks.filter(repo =>
      repo.categories.find(x => x === optionValue)
    );
  };
  return (
    <>
      <Select
        value={optionValue}
        displayEmpty
        className="category-input"
        labelId="demo-simple-select-label"
        onChange={event => setOptionValue(event.target.value)}
      >
        <MenuItem value="" disabled>
          Categories
        </MenuItem>
        <MenuItem value={"Android"}>Android</MenuItem>
        <MenuItem value={"Angular"}>Angular</MenuItem>
        <MenuItem value={"Artificial Intelligience"}>
          Artificial Intelligience
        </MenuItem>
      </Select>
      {renderRepos()}
    </>
  );
};

const mapStateToProps = state => {
  return {
    bookmarks: state.repos.bookmarks
  };
};

export default connect(mapStateToProps, null)(Bookmarks);
