import React, {useState} from 'react'
import PropTypes from 'prop-types'
import SearchBack from '../../images/searchback_crop.jpg'
import {connect} from 'react-redux'
import {getRecipes} from '../../actions/recipe'
import {searchRecipes} from '../../actions/search'
import './searchBar.css'

function SearchBar(props){

    const { history, searchRecipes} = props

    let styles= {
        backgroundImage: `url(${SearchBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const [formData, setFormData] = useState("")

    function handleSearchChange(e){
        setFormData( e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault();
        formData&&
        
        searchRecipes(formData, history)
        console.log(formData)

    }

    return(
        
        <div className="searchBar " style={styles}>
            
            <div className='SeachBarFormContainer'>
                <form className='SeachBarForm' onSubmit={handleSubmit}>
                    <input className='SearchBarInput'type="text" placeholder="Search By Title..." value={formData} onChange={handleSearchChange}/>                               
                    <button className='SearchBarButton'>Search</button>                   
                </form>
            </div>
        </div>

      
    )
}

SearchBar.propTypes = {
  
    getRecipes: PropTypes.func.isRequired,    
    searchRecipes: PropTypes.func.isRequired,    
  }


  const mapStateToProps = state => ({

    search: state.search
})

export default connect(mapStateToProps, {getRecipes, searchRecipes})(SearchBar)