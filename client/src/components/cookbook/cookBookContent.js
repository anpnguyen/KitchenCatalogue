import React, { Fragment, useState, useEffect } from "react";
import uuid from "uuid/v4";
import Spinner from "../Layout/spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../Layout/contentBox.css";
import PageNavigation from "../Layout/pageNavigation";
// import CookbookCard from "./cookbookCard";
import {getCookbooks} from '../../actions/cookbook';
// import CreateNewCookbook from './createNewCookBook'

const CookbookContent = props => {
  const {
    title,        
    showAll,
    isSearch,
    search,    
    cookbook,
    getCookbooks
  } = props;

  const { cookbooks } = cookbook;
  const [pageLimit, setPageLimit] = useState(12);
  const [navigation, setNavigation] = useState({
    start: 0,
    end: pageLimit,
    current: 1
  });
  const totalItems = cookbooks.length;
  const totalPages = Math.floor(cookbooks.length / pageLimit) + 1;

  useEffect(() => {
    setNavigation({ start: 0, end: pageLimit, current: 1 });
  }, [setNavigation, pageLimit]);




  const cookbookData = cookbooks.map((c, i) => {
    if (!showAll && i < 4 ) {
      return <CookbookCard c={c} i={i} key={uuid()} />;
    }

    if (
      showAll &&
      i < navigation.end &&
      i >= navigation.start &&
      i !== totalItems -1 ){
     
     
      return (
      <>
      <CookbookCard c={c} i={i} key={uuid()}/>
      
      </>)
      
      ;
    } 

    if (
      showAll &&
      i < navigation.end &&
      i >= navigation.start &&
      i === totalItems -1 ){
     
     
      return (
      <>
      <CookbookCard c={c} i={i} key={uuid()}/>
      <CreateNewCookbook/>
      
      
      </>)
      
      ;
    } 
    

    else {
      return <Fragment key={uuid()} />;
    }
  });
  // console.log(cookbooks[0])


  return cookbook.loading ? (
    <Spinner />
  ) : (
    <div className="contentBox ">
      <div className="contentBoxContent">
        {showAll && (
          <>
            <h1 className="text-center">
              {isSearch === true ? "Search Results" : title}
            </h1>
            <hr className="width80" />
            <div className="contentBoxHeader">
              <div>
                <p className="searchNumber">
                  {" "}
                  {totalItems} {totalItems === 1 ? "cookbook" : "cookbooks"} found{" "}
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
          </>
        )}

        <section className="contentBoxCard">
          {cookbookData}

          {totalItems === 0 && <CreateNewCookbook/>}

         

          {showAll && <hr className="width80" />}
        </section>

        {showAll && (
          <>
            <PageNavigation
              pageLimit={pageLimit}
              totalPages={totalPages}
              navigation={navigation}
              setNavigation={setNavigation}
            />
          </>
        )}
      </div>
    </div>
  );
};

CookbookContent.propTypes = {
  recipe: PropTypes.object.isRequired,
  cookbook: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  cookbook: state.cookbook,
  search: state.search
});

export default connect(
  mapStateToProps,
  {getCookbooks}
)(CookbookContent);
