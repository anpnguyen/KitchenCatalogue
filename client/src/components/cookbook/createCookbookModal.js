import React, {useState} from 'react'
import './createCookbookModal.css'

function CreateCookbookModal(props) {

    const {setCreateCookbookModal} = props    

    const [formData, setFormData] = useState({cookbookName:""})

    const handleFormSubmit = (e)=>{
        e.preventDefault()
        console.log(formData.cookbookName)
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
                name='cookbookName' 
                value={formData.cookbookName}/>
                 <button >Create cook book</button>
        </form>

       

        <button onClick={(e)=>{
            e.preventDefault()
            setCreateCookbookModal(false)} }>X</button>
      </div>
    )
}



export default CreateCookbookModal

