import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import "./individualRecipe.css";

const AddToCookbookSelect = props => {
  const { cookbook, setAddedCookbooks } = props;
  const [selectOptions, setSelectOptions] = useState();

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
  }, [cookbook.cookbooks]);

  return (
    selectOptions !== undefined && (
      <div className="favouriteSelect">
        <Select
          closeMenuOnSelect={true}          
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
