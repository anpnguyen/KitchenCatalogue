import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import { clearRecipe } from '../../actions/recipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './navBar.css'


function NavBar(props){
  const node = useRef()
  const { logout, clearRecipe} = props
  const [showMenu, setShowMenu ] = useState(false)
    
  function handleToggle(){
      setShowMenu(!showMenu)
      
  }

  function handleLogout(){
      clearRecipe()
      logout()       
  }


  useEffect(() => {
    const handleClickOutside = e => {          
      if (node.current.contains(e.target ||   
        <div className="navBarButton " >
            
        </div>)) {
            
          return;
        }
          
      setShowMenu(false);
    };
      
      if (showMenu) {
        document.addEventListener("mousedown", handleClickOutside);
      } 
      else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showMenu]
  );

      
 

  return(
        
    <div className="navBar">
      <div className="navBarLogo">
          <p className="navBarLogoText">
              <Link to='/'>Kitchen Catalogue</Link>
          </p>
      </div>
      <div className='navBarContainer' ref={node}>
  
          <div className="navButton" onClick={handleToggle}>
              <FontAwesomeIcon icon={faBars} height="2em" />
          </div>
          <div className="">
              <ul className={`NavList ${!showMenu ? "slide": "" }`}>
                  <li className="">
                      <h2 className='pacifico'>Kitchen Catalogue</h2></li>
                  <li className="" onClick={()=>setShowMenu(false)}>
                      <Link to='/recipe/new'>Create A Recipe</Link>
                  </li>
                  <li className="" onClick={()=>setShowMenu(false)}>
                      <Link to='/recipe'>View All Recipes</Link>
                  </li>
  
                  <li className="navBarListItem" onClick={handleLogout}>Logout</li>
              </ul>
          </div>
  
      </div>
    </div>
   )
}

NavBar.propTypes = {
  
  auth: PropTypes.object.isRequired,
  clearRecipe: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout, clearRecipe})(NavBar)