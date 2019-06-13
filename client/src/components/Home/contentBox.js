import React, {Fragment, useState, useEffect} from 'react'
import ContentCard from './contentCard'
import './contentBox.css'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
        
    },[pageLimit]
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

    function handleNavigationClick(e){
        let newNavigation = {start: (e.target.value-1)*pageLimit ,  end: (e.target.value)* pageLimit, current: e.target.value } 
        setNavigation(newNavigation)
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
        if(i < totalPages -1 && i >0 )
        navItems.push(
        <button key= {i + "navButton" }onClick={handleNavigationClick} value={i+1}>{i+1}</button>        )
    }
    return navItems
    }

    return(
        loading? <h1> loading</h1>:
        <div className="contentBox">
            
            <div className="contentBoxContent ">
                <h1 className="text-center">{title}</h1>  
                <hr className="width80"/>
                <p class='searchNumber'> {totalItems} total recipes </p>
                <hr className="width80"/>
                {/* <div className="contentBoxNavigation">

                   {navigation.current!==1 ? <button onClick={setFirst}>First</button> : 'Filler'  }
                    {navigation.current!==1 ? <button onClick={setBack}>Back</button> : "filler"  }
                    <button onClick={setNext}>Next</button>   
                    <button onClick={setLast}>Last</button> 
 
                   <select name="cars" onChange={(e)=>setPageLimit(parseInt(e.target.value))} value={pageLimit}>    
                        <option value={5}>5 items per Page</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value= {50}>50</option>
                    </select>  



                {navigationNumbers()}

                    <hr className="width80"/>
                </div> */}



                <div className="contentBoxCard">
                    {mappedData}
           
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



