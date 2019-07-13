import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const AddToCookbookSelect = (props)=> {

    const {cookbook, setAddedCookbooks} = props
    
    const [selectOptions, setSelectOptions] = useState();
    

    const handleSelectChange = (e)=>{
      
      
      setAddedCookbooks(e)
      
     
    }

    

    useEffect(() => {
      // const result = cookbook.cookbooks.filter(individualCookbook =>
      //   individualCookbook.savedRecipes.includes(match.params.recipe_id)
      // );
      
      // const defaultOptions = result.map(defaultCookbook => ({value: defaultCookbook._id, label:defaultCookbook.cookbookTitle })) 
      // console.log(defaultOptions)
      // setDefaultCookbooks(defaultOptions)


      // cookbooksIn !== undefined && console.log(cookbooksIn)

      let options = cookbook.cookbooks.map(individualCookbook => ({value: individualCookbook, label:individualCookbook.cookbookTitle }))
      setSelectOptions(options)
      // console.log(options)
     
    }, []);



    
  


    
// let options2 = [
//     { value: 'Color', label: 'Yellow' },
//     { value: 'Fruit', label: 'Apple' },
//     { value: 'Tool', label: 'Spanner' },
//   ]
  return (

    selectOptions !== undefined  &&
    <Select
      closeMenuOnSelect={true}
      components={animatedComponents}
         
      isMulti
      options={selectOptions}
      onChange= {e=> handleSelectChange(e)}
  
    />
  
  )
  ;
}



const mapStateToProps = state => ({
  
  cookbook: state.cookbook
});

export default 
  withRouter(connect(
    mapStateToProps,
    { }
  )(AddToCookbookSelect))

