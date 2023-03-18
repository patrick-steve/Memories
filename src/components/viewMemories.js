import '../assets/css/viewMemories.css'

import { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

import Header from './header'

import plusIcon from '../assets/images/plus.png'

import { storage } from '../firebase'

const ViewMemories = () => {
    const [imgUrls, setImgUrls] = useState([])
    const navigate = useNavigate()

    const checkUserValidation = () => {
        if(localStorage.getItem('usrkey')) { 
            return localStorage.getItem('usrkey')
        }
        else {
            navigate('/login')
        }
    }

    
    useEffect(() => {
        const key = checkUserValidation()
        const fetchImages = async () => {
            const bucketRef = ref(storage, key+"")
            const res = await listAll(bucketRef)
            const urlPromises = res.items.map((imgRef) => getDownloadURL(imgRef))
    
            return Promise.all(urlPromises)
        }
    
        const loadImages = async () => {
            const urls = await fetchImages()
            setImgUrls(urls)
        }
    
        loadImages()
    }, [])


    return (
        <div className='view-container'>
            <Header usrName={localStorage.getItem('usrName')}/>
            <div className='view-body'>
                {
                    imgUrls.map((imgUrl, i)=> <MemoryCard className="card-img" key={i} imgUrl={imgUrl}/>)
                }
            </div>
            <img className='add-button' src={plusIcon} alt="add" onClick={() => navigate('/add')}/>
        </div>
    )
}

const MemoryCard = (props) => {
    return( 
        <img style={{ width: "300px", height: "300px", border: "1px solid white", margin: "50px", borderRadius: "20px" }} src={props.imgUrl}/>
    )
}

export default ViewMemories