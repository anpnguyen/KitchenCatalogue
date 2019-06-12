import React ,{useState}from 'react'

import {Link} from 'react-router-dom'
import './navBar.css'

function NavBar(){

    const [toggle, setToggle ] = useState(false)
    
    function handleToggle(){
        setToggle(!toggle)
    }
    return(
        <div className="navBar">
            <div className="navBarLogo">
                <p className="navBarLogoText"><Link to='/'>Kitchen Catalogue</Link></p>
            </div>

            <div className="navBarButton " onClick={handleToggle}>
                <div className="burgerButton"></div>
                 <div className="burgerButton"></div>
                 <div className="burgerButton"></div>
            </div>

            <div className='navBarContainer'>
                <ul className={`navBarList ${toggle? 'display': ""}`}>
                    
                    
                    
                    <li className="navBarListItem"><Link to='/recipe/new'>Create A Recipe</Link></li>
                    <li className="navBarListItem"><Link to='/recipe'>View All Recipes</Link></li>
                    <li className="navBarListItem"><Link to='/recipe/favourites'>View Facourites</Link></li>
                    <li className="navBarListItem"><Link to='/home'>Search</Link></li>
                   
                    
                
                    
                </ul>
            </div>
        
        </div>
    )
}

export default NavBar