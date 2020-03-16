import React from "react";
import { TextField, Select, MenuItem, Button, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import "./App.scss";
import Repos from "components/Options/Repos";
import UserRepos from "components/Options/UserRepos";
import Bookmarks from "components/Options/Bookmarks";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  setSearch,
  setSelected,
  setPageNumber,
  resetPageNumber
} from "redux/appState/action";
import { fetchValidData } from "redux/repos/action";

const App = ({
  pageCount,
  loading,
  optionValue,
  searchVal,
  setSearch,
  setSelected,
  fetchValidData,
  setPageNumber,
  pageNumber,
  resetPageNumber
}) => {
  const renderOptions = actionType => {
    switch (actionType) {
      case "ReposByName": {
        return <Repos />;
      }
      case "ReposByUserName": {
        return <UserRepos />;
      }
      case "BookmarkedRepos": {
        return <Bookmarks />;
      }
    }
  };
  return (
    <div className="container">
      <Grid container>
        <Grid lg={6}>
          <TextField
            value={searchVal}
            onChange={event => setSearch(event.target.value)}
          />
          <Button
            className="search-button"
            variant="contained"
            onClick={() => {
              resetPageNumber();
              fetchValidData();
            }}
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            Search
          </Button>
        </Grid>

        <Grid className="optional-input-col" lg={6}>
          <Select
            labelId="demo-simple-select-label"
            value={optionValue}
            onChange={event => setSelected(event.target.value)}
          >
            <MenuItem value={"ReposByName"}>Get All Repositories</MenuItem>
            <MenuItem value={"ReposByUserName"}>
              Search Repositories By Name
            </MenuItem>
            <MenuItem value={"BookmarkedRepos"}>
              Bookmarked Repositories
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress className="spinner" />
      ) : (
        <>
          <div className="repos-wrapper">{renderOptions(optionValue)}</div>
          {optionValue !== "BookmarkedRepos" ? (
            pageCount ? (
              <Pagination
                page={pageNumber}
                count={Math.ceil(pageCount / 10)}
                onChange={(event, page) => {
                  setPageNumber(page);
                  fetchValidData();
                }}
              />
            ) : 
              null 
          ) : null}
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  setSearch,
  setSelected,
  fetchValidData,
  setPageNumber,
  resetPageNumber
};

const mapStateToProps = state => {
  return {
    loading: state.repos.loading,
    optionValue: state.appState.optionValue,
    searchVal: state.appState.searchVal,
    pageCount: state.repos.pageCount,
    pageNumber: state.appState.pageNumber
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
