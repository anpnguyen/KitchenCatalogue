import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const AddToCookbookSelect = (props)=> {

    const {cookbook, match} = props
    const [defaultCookbooks, setDefaultCookbooks] = useState();
    const [selectOptions, setSelectOptions] = useState();

    useEffect(() => {
      const result = cookbook.cookbooks.filter(individualCookbook =>
        individualCookbook.savedRecipes.includes(match.params.recipe_id)
      );
      
      const defaultOptions = result.map(defaultCookbook => ({value: defaultCookbook._id, label:defaultCookbook.cookbookTitle })) 
      // console.log(defaultOptions)
      setDefaultCookbooks(defaultOptions)


      // cookbooksIn !== undefined && console.log(cookbooksIn)

      let options = cookbook.cookbooks.map(individualCookbook => ({value: individualCookbook._id, label:individualCookbook.cookbookTitle }))
      // console.log(options)
      setSelectOptions(options)
      console.log(options)
     
    }, []);



    
  


    
let options2 = [
    { value: 'Color', label: 'Yellow' },
    { value: 'Fruit', label: 'Apple' },
    { value: 'Tool', label: 'Spanner' },
  ]
  return (

    selectOptions !== undefined && defaultCookbooks!== undefined &&
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      
      // defaultValue={[options[0], options[1]]}
      defaultValue={defaultCookbooks}
      isMulti
      options={selectOptions}
    //   onChange={()=> alert('has been changed')}
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

