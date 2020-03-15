import React from "react";
import CustomCard from "components/CustomCard/CustomCard";
import { connect } from "react-redux";

const Repos = ({ data }) => {
  const renderRepos = () => {
    return data.map(repo => <CustomCard data={repo} />);
  };
  return <>{renderRepos()}</>;
};

const mapStateToProps = state => {
  return {
    data: state.repos.repos
  };
};

export default connect(mapStateToProps)(Repos);
