import React from 'react'
import SearchBack from '../../images/searchback_crop.jpg'
import './searchBar.css'

function SearchBar(){

    let styles= {
        backgroundImage: `url(${SearchBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return(
        
        <div className="searchBar " style={styles}>
            {/* <img className='SearchBarImg' src={SearchBack} alt=""/> */}
            <div className='SeachBarFormContainer'>
                <form className='SeachBarForm'action="">
                    
                        <input className='SearchBarInput'type="text" placeholder="Search"/>
                    
                    
                        <button className='SearchBarButton'>Search</button>
                    
                </form>
            </div>
        </div>

      
    )
}

export default SearchBar