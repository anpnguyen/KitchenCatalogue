import React, {useState} from 'react'
import SearchBack from '../../images/searchback_crop.jpg'
import './searchBar.css'
import {connect} from 'react-redux'
import {getRecipes} from '../../actions/recipe'

function SearchBar(props){

    const {getRecipes} = props

    let styles= {
        backgroundImage: `url(${SearchBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const [searchData, setSearchData] = useState("")

    function handleSearchChange(e){
        setSearchData( e.target.value)
        console.log(searchData)
    }

    function handleSubmit(e){
        e.preventDefault();
        getRecipes(searchData)
    }

    return(
        
        <div className="searchBar " style={styles}>
            {/* <img className='SearchBarImg' src={SearchBack} alt=""/> */}
            <div className='SeachBarFormContainer'>
                <form className='SeachBarForm' onSubmit={handleSubmit}>
                    
                        <input className='SearchBarInput'type="text" placeholder="Search" value={searchData} onChange={handleSearchChange}/>
                    
                    
                        <button className='SearchBarButton'>Search</button>
                    
                </form>
            </div>
        </div>

      
    )
}

export default connect(null, {getRecipes})(SearchBar)