import React, {Fragment, useState, useEffect} from 'react'
import ContentCard from './contentCard'
import './contentBox.css'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../Layout/spinner'


function ContentBox(props){

    const {title, text, recipe, showAll} = props
    const {recipes, loading} = recipe
    const [pageLimit, setPageLimit] = useState(5)
    const [navigation, setNavigation] = useState({start:0, end: pageLimit, current: 1})
    const totalItems = recipes.length
    const totalPages = Math.floor((recipes.length/pageLimit)) + 1

    

    useEffect(
        ()=>{
        setNavigation({...navigation, start: 0, end:pageLimit, current:1})
        
    },[pageLimit, navigation]
    )
    function setFirst(){
        setNavigation({start:0, end: pageLimit, current: 1})
    }

    function setNext(){
        let newNavigation = {start: navigation.start + pageLimit, end: navigation.end + pageLimit , current: navigation.current +1 } 
        setNavigation(newNavigation)
    }

    function setBack(){
        let newNavigation = {start: navigation.start - pageLimit,  end: navigation.end - pageLimit, current: navigation.current -1 } 
        setNavigation(newNavigation)
    }
    
    function setLast(){
        let newNavigation = {start: (totalPages-1)*pageLimit ,  end: totalPages* pageLimit, current: totalPages } 
        setNavigation(newNavigation)
    }

    function handleNavigationClick(e,i){
        console.log(e.target.value)
        console.log(i)
        
        if(e.target.value !== navigation.current){
            let newNavigation = {start: (i)*pageLimit ,  end: (i+1)* pageLimit, current: i+1 } 
        
            
        setNavigation(newNavigation)
        console.log(navigation)
        }
    }
    const mappedData = recipes.map((recipe, index) =>{
           
        if(!showAll && index <4)
            {
            return <ContentCard title="Chicken Curry" recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
        } else if(showAll && index < navigation.end  && index>= navigation.start ){
            return <ContentCard title="Chicken Curry" recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
        } else {
            return <Fragment key={recipe._id}></ Fragment>
        }
       
    })

    function navigationNumbers(){
        let navItems = []
    
    for(let i =0; i< totalPages  ; i++){
        if(i < totalPages  && i >=0 )
        navItems.push(
       

        <div className={` arrows ${navigation.current === i+1 && 'navigationActive'}`} key= {i + "navButton" }onClick={e=>handleNavigationClick(e,i)} value={i+1}> {i+1} </div>
        
        
        
        )
    }
    return navItems
    }

   
    return(
        
        loading? 
        
        <Spinner/>:



        <div className="contentBox" >
            
            <div className="contentBoxContent ">
                <h1 className="text-center">{title}</h1>  
                <hr className="width80"/>
                <div className='contentBoxHeader' >
                    <div>
                    <p className='searchNumber'> {totalItems} total recipes </p>
                    </div>
                    <div>
                <select className='navigationSelect' name="itemsPerPage" onChange={(e)=>setPageLimit(parseInt(e.target.value))} value={pageLimit}>    
                        <option value={5}>5 items per page</option>
                        <option value={10}>10 items per page</option>
                        <option value={20}>20 items per page</option>
                        <option value= {50}>50 items per page</option>
                    </select> 
                    </div>
                </div>
                <hr className="width80"/>
                



                <div className="contentBoxCard">
                    {mappedData}
                    <hr className="width80"/>
                </div>

                <div className="contentBoxNavigation">

                
                
                <div className={` arrows  ${navigation.current ===1 && 'navigationDisable'}`}   onClick={setFirst} > {"<<"}  </div>
                <div className={` arrows mr2 ${navigation.current ===1 && 'navigationDisable'}`} onClick={setBack} > {'<'} </div>

                {navigationNumbers()}

                <div className={` arrows ml2 ${navigation.current === pageLimit && 'navigationDisable'}`} onClick={setNext} > > </div>
                <div className={` arrows  ${navigation.current === pageLimit && 'navigationDisable'}`} onClick={setLast} > >> </div>
                
                <div className="navigationSelectContainer">
                     
                    </div>
                </div>
                
            </div>
            
        </div>


                
            
            
            
    )
}


ContentBox.propTypes = {
    recipe: PropTypes.object.isRequired
 
}


const mapStateToProps = state => ({

    recipe: state.recipe
})

export default connect(mapStateToProps, {})(ContentBox)



