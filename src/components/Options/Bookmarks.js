import React from "react";
import CustomCard from "components/CustomCard/CustomCard";
import { connect } from "react-redux";

const Bookmarks = ({ repos }) => {
  const renderRepos = () => {
    return repos.all.map(data => <CustomCard data={data} />);
  };

  return <>{renderRepos()}</>;
};

const mapStateToProps = state => {
  return {
    repos: state.repos.bookmarks[0]
  };
};

export default connect(mapStateToProps)(Bookmarks);
