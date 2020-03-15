import React, { useState } from "react";
import { connect } from "react-redux";
import { addRepoToBookmarks } from "redux/repos/action";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Menu from "@material-ui/core/Menu";
import "./CustomCard.scss";

const CustomCard = ({ addRepoToBookmarks, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({
    android: false,
    angular: false,
    artIntel: false
  });

  // Menu Handling

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  // Sending Data to Bookmark Array
  const sendData = {
    id: data.id,
    full_name: data.full_name,
    description: data.description,
    stargazers_count: data.stargazers_count,
    language: data.language
  };
  return (
    <div className="custom-card">
      <h3 className="card-name">{data.full_name}</h3>
      <div className="card-description">{data.description}</div>
      <span className="card-stars">star {data.stargazers_count}</span>
      <span className="card-language">{data.language}</span>
      <i
        className="fas fa-bookmark"
        onClick={event => {
          handleClick(event);
          addRepoToBookmarks("angular", sendData);
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
              checked={state.android}
              value="android"
              onChange={handleChange("android")}
            />
          }
          label="Android"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.angular}
              value="angular"
              onChange={handleChange("angular")}
            />
          }
          label="Angular"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.artIntel}
              value="artIntel"
              onChange={handleChange("artIntel")}
            />
          }
          label="Artificial Intelligience"
        />
      </Menu>
    </div>
  );
};

const mapDispatchToProps = {
  addRepoToBookmarks
};

export default connect(null, mapDispatchToProps)(CustomCard);
