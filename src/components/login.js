import '../assets/css/login.css'

import { useRef } from 'react'
import { ref, onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

import { db } from '../firebase'

const Login = () => {
    const usrNameRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    const checkUser = () => {
        const userObjs = []
        const keys = []
        onValue(ref(db, "/users"), (snapshot) => {
            snapshot.forEach(child => {
                userObjs.push(child.val())
                keys.push(child.key)
            })
        })
        if(userObjs.filter(usr => usr.name === usrNameRef.current.value).length > 0) {
            const usrObj = userObjs.filter(usr => usr.name === usrNameRef.current.value)[0]
            const index = userObjs.findIndex(el => el === usrObj)
            if(usrObj.pass === passRef.current.value) {
                localStorage.setItem('usrkey', keys.filter((key, i) => i===index))
                localStorage.setItem('usrName', usrObj.name)
                navigate('/')
            }
        }
    }
    

    return(
        <div className='wrapper'>
            <div className='login-card'>
                <label className='login-text'>LOGIN</label>
                <input className='login-input usrname' placeholder='User Name' ref={usrNameRef}></input>
                <input className='login-input password' placeholder='Password' type="password" ref={passRef}></input>
                <button className='login-button' onClick={checkUser}>Submit</button>
                <label className='login-footer' onClick={() => navigate('/signup')}>New User?</label>
            </div>
        </div>
    )
}

export default Login