import '../assets/css/signup.css'

import { useRef } from 'react'
import { ref, push } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

import { db } from '../firebase'

const Login = () => {
    const usrNameRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    const addUser = () => {
        push(ref(db, '/users'), {
            name : usrNameRef.current.value,
            pass : passRef.current.value
        })
        alert(usrNameRef.current.value + " has been created successfully!")
        navigate('/login')
    }

    return(
        <div className='wrapper'>
            <div className='signup-card'>
                <label className='signup-text'>SIGN UP</label>
                <input className='signup-input usrname' placeholder='User Name'></input>
                <input className='signup-input password' placeholder='Password' type="password"></input>
                <button className='signup-button' onClick={addUser}>Add</button>
                <label className='signup-footer' onClick={() => navigate('/login')}>Already a user ?</label>
            </div>
        </div>
    )
}

export default Login