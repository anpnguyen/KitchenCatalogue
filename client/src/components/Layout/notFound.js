import React, {useEffect}from 'react';
import NavBar from './navBar'
import {Link} from 'react-router-dom'
import './notFound.css'
function NotFound(props){
    
   

    return(
        <div>
            <NavBar/>
            <div className='notFound'>
                <h1>Sorry, we could not find the page you were looking for</h1>
                <h3>Press <Link to='/'>here</Link>   to go back to the homepage</h3>
            </div>
        </div>
    )
}

export default NotFound