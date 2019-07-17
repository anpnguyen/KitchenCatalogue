import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
// import makeAnimated from "react-select/animated";
import './individualRecipe.css'
// const animatedComponents = makeAnimated();


const AddToCookbookSelect = props => {
  const { cookbook, setAddedCookbooks } = props;
  const [selectOptions, setSelectOptions] = useState();


  // this sets the selected cookbooks into an array
  const handleSelectChange = e => {
    
    setAddedCookbooks(e);
    
  };

  // this sets the options for the dropDown
  useEffect(() => {
    let options = cookbook.cookbooks.map(individualCookbook => ({
      value: individualCookbook,
      label: individualCookbook.cookbookTitle
    }));
    setSelectOptions(options);
  }, []);





  return (
    selectOptions !== undefined && (
      <div className='favouriteSelect'>
      <Select
        closeMenuOnSelect={true}
        // components={animatedComponents}
        // isMulti
        options={selectOptions}
        onChange={e => handleSelectChange(e)}
        
      />
      </div>
    )
  );
};

const mapStateToProps = state => ({
  cookbook: state.cookbook
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(AddToCookbookSelect)
);
