import React, { Fragment, useState, useEffect} from "react";
import ContentCard from "./contentCard";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./contentBox.css";
import PageNavigation from "./pageNavigation";

const ContentBox = props => {
  const { title, text, recipe, showAll, history, isSearch, search } = props;
  const { recipes, loading } = recipe;
  const [pageLimit, setPageLimit] = useState(12);
  const [navigation, setNavigation] = useState({
    start: 0,
    end: pageLimit,
    current: 1
  });
  const totalItems = recipes.length;
  const totalPages = Math.floor(recipes.length / pageLimit) + 1;


  
  useEffect(() => {
    setNavigation({start: 0, end: pageLimit, current: 1 })
  }, [setNavigation, pageLimit]);

  



  const handleRedirect = () => {
    history.push("/recipe/new");
  };

  const mappedData = recipes.map((recipe, index) => {
    if (!showAll && index < 4) {
      return (
        <ContentCard
          recipe={recipe}
          showAll={showAll}
          text={text}
          key={recipe._id}
        />
      );
    } else if (
      showAll &&
      index < navigation.end &&
      index >= navigation.start &&
      index !== totalItems - 1
    ) {
      return (
        <ContentCard
          recipe={recipe}
          showAll={showAll}
          text={text}
          key={recipe._id}
        />
      );
    } else if (
      showAll &&
      index < navigation.end &&
      index >= navigation.start &&
      index === totalItems - 1
    ) {
      return (
        <>
          <ContentCard
            recipe={recipe}
            showAll={showAll}
            text={text}
            key={recipe._id}
          />
          <ContentCard
            {...props}
            titleText="Create New Recipe"
            onClick={handleRedirect}
            key={recipe._id + "create"}
          />
        </>
      );
    } else {
      return <Fragment key={recipe._id} />;
    }
  });

 

  return loading ? (
    <Spinner />
  ) : (
    <main className="contentBox ">
      <div className="contentBoxContent">
        <h1 className="text-center">
          {isSearch === true ? "Search Results" : title}
        </h1>
        <hr className="width80" />
        <div className="contentBoxHeader">
          <div>
            <p className="searchNumber">
              {" "}
              {totalItems} {totalItems === 1 ? "recipe" : "recipes"} found{" "}
              {isSearch === true && ` for '${search.searchData}'`}
            </p>
          </div>
          <div>
            <select
              className="navigationSelect"
              name="itemsPerPage"
              onChange={e => setPageLimit(parseInt(e.target.value))}
              value={pageLimit}
            >
              <option value={12}>12 items per page</option>
              <option value={16}>16 items per page</option>
              <option value={20}>20 items per page</option>
              <option value={48}>48 items per page</option>
            </select>
          </div>
        </div>
        <hr className="width80" />

        <section className="contentBoxCard">
          {mappedData}
          {recipes.length === 0 && (
            <ContentCard
              {...props}
              titleText="Create New Recipe"
              onClick={handleRedirect}
            />
          )}

          <hr className="width80" />
        </section>

       <PageNavigation
        pageLimit={pageLimit}
        totalPages={totalPages}  
        navigation= {navigation}
        setNavigation={setNavigation}

      />
      </div>
    </main>
  );
};

ContentBox.propTypes = {
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  search: state.search
});

export default connect(
  mapStateToProps,
  {}
)(ContentBox);
