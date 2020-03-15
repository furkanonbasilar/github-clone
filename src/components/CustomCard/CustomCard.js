import React, { useState } from "react";
import { connect } from "react-redux";
import { toggleBookmark } from "redux/repos/action";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Menu from "@material-ui/core/Menu";
import "./CustomCard.scss";

const CustomCard = ({ categories, data, toggleBookmark }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Menu Handling
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="custom-card">
      <h3 className="card-name">{data.full_name}</h3>
      <div className="card-description">{data.description}</div>
      <span className="card-language">{data.language}</span>
      <span className="card-stars">
        <i className="fas fa-star"></i> {data.stargazers_count}
      </span>
      <i
        className="fas fa-bookmark"
        onClick={event => {
          handleClick(event);
        }}
      ></i>

      <Menu
        id="simple-menu"
        onClose={handleClose}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={categories.find(x => x === "Android") ? true : false}
              value="Android"
              onChange={() => toggleBookmark("Android", data)}
            />
          }
          label="Android"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={categories.find(x => x === "Angular") ? true : false}
              value="Angular"
              onChange={() => toggleBookmark("Angular", data)}
            />
          }
          label="Angular"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={
                categories.find(x => x === "Artificial Intelligience")
                  ? true
                  : false
              }
              value="Artificial Intelligience"
              onChange={() => toggleBookmark("Artificial Intelligience", data)}
            />
          }
          label="Artificial Intelligience"
        />
      </Menu>
    </div>
  );
};

const mapDispatchToProps = {
  toggleBookmark
};

export default connect(null, mapDispatchToProps)(CustomCard);
