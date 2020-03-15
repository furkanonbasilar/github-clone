import React from "react";
import CustomCard from "components/CustomCard/CustomCard";
import { connect } from "react-redux";

const UserRepos = ({ data, bookmarks }) => {
  const renderRepos = () => {
    return data.map(repo => {
      const bookmark = bookmarks.find(x => x.repoData.id === repo.id);
      return (
        <CustomCard
          data={repo}
          categories={bookmark ? bookmark.categories : []}
        />
      );
    });
  };

  return <>{renderRepos()}</>;
};

const mapStateToProps = state => {
  return {
    data: state.repos.repos,
    bookmarks: state.repos.bookmarks
  };
};

export default connect(mapStateToProps)(UserRepos);
