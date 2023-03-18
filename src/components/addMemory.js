import '../assets/css/addMemory.css'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

import backIcon from '../assets/images/back.png'

import Header from './header'
import { storage } from '../firebase'

const AddMemory = () => {
    const [usr, setUsr] = useState({})
    const navigate = useNavigate()

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
           uploadBytes(ref(storage, usr.key+"/"+uuidv4()+".jpeg"), e.dataTransfer.files[0]).then(snapshot => {
                alert("Image Has Been Uploaded!!")
                navigate('/')
           })
        }
    }

    const checkUserValidation = () => {
        if(localStorage.getItem('usrkey')) {
            return { "key" : localStorage.getItem('usrkey'), "name" : localStorage.getItem('usrName') }
        }
        else { navigate('/login') }
    }

    useEffect(() => {
        const usrObj = checkUserValidation()
        setUsr(usrObj)
    }, [])

    return (
        <div className='add-container'>
            <Header usrName={usr.name}/>
            <div className='add-body'>
                <div className='add-card'>
                    <label className='add-heading'>Add a Memory</label>
                    <div className='add-file' onDragEnter={(e) => e.preventDefault()} onDragOver={ (e) => e.preventDefault() } onDrop={e => handleDrop(e)}>
                        Drop Your Memory here!
                    </div>
                </div>
            </div>
            <div className='back-button' onClick={() => navigate('/')}>
                <label style={{ color: 'white' }}>Back</label><img src={backIcon} style={{ width: "10px", height: "10px", marginLeft: "5px" }}/>
            </div>
        </div>
    )
}

export default AddMemory