import React from 'react'
import SearchBack from '../../images/searchback_crop3.jpg'
import './searchBar.css'

function SearchBar(){
    return(
        
        <div className="searchBar ">
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