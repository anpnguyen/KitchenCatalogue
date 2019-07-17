import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createNewCookbook} from '../../actions/cookbook'
import './createCookbookModal.css'

function CreateCookbookModal(props) {

    const {setCreateCookbookModal, createNewCookbook} = props    

    const [formData, setFormData] = useState({cookbookTitle:""})

    const handleFormSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
        setCreateCookbookModal(false)
        createNewCookbook(formData)
    }

    const handleFormChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    return (
        <div className='createCookBookModal'>
        <h1>create cookbook</h1>

        <form onSubmit={handleFormSubmit}>a
            <input 
                type="text" 
                placeholder='cookbook name' 
                onChange={handleFormChange} 
                name='cookbookTitle' 
                value={formData.cookbookTitle}/>
                 <button >Create cook book</button>
        </form>

       

        <button onClick={(e)=>{
            e.preventDefault()
            setCreateCookbookModal(false)} }>X</button>
      </div>
    )
}



export default connect(null, {createNewCookbook}) (CreateCookbookModal)

