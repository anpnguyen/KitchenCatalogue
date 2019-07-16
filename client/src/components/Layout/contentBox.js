import React, { Fragment, useState, useEffect} from "react";
import uuid from 'uuid/v4'
import ContentCard from "./contentCard";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./contentBox.css";
import PageNavigation from "./pageNavigation";

const ContentBox = props => {
  const { title, text, showAll, history, isSearch, searchData, recipes, isLoading, option } = props;
  
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
    if (
      
      index < navigation.end &&
      index >= navigation.start &&
      index !== totalItems - 1
    ) {
      return (
        <ContentCard
          recipe={recipe}
          showAll={showAll}
          text={text}
          key={uuid() + 'first'}
          option={option}
        />
      );
    } else if (
      
      index < navigation.end &&
      index >= navigation.start &&
      index === totalItems - 1
    ) {
      return (
        
        <Fragment key={uuid()}>
          <ContentCard
            recipe={recipe}
            showAll={showAll}
            text={text}
            key={uuid() + 'second'}
            option={option}
          />
          
          <ContentCard
            {...props}
            titleText="Create New Recipe"
            onClick={handleRedirect}
            key={uuid() + "create"}
            option={option}
          />
        

        </Fragment>
      
        
      );
    } else {
      return <Fragment key={uuid()} />;
    }
  });

 

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="contentBox ">
      <div className="contentBoxContent">
      
        
        
        <hr className="width80" />

        <section className="contentBoxCard">
          
          {recipes.length === 0 || null ? (
            
              option !== 'cookbookRecipes' && 

            <ContentCard
            {...props}
            titleText="Create New Recipe"
            onClick={handleRedirect}
            key={uuid() + "create"}
            individualRecipe=''
          />
            
          ):
          mappedData}

          
        </section>
        <hr className="width80" />
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
  // recipe: state.recipe,
  // search: state.search
});

export default connect(
  mapStateToProps,
  {}
)(ContentBox);
