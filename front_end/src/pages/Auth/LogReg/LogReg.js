import React from 'react'
import Bottom from '../../../components/Home/Bottom'
import './LogReg.css'
import circle from '../../../assets/images/gradient_circle.svg'
import login from '../../../assets/images/login.svg'
import reg from '../../../assets/images/reg.svg'
import back from '../../../assets/images/back.svg'
import { Link } from 'react-router-dom'


export default function LogReg() {
  return (
    <div className='background'>
      <Link className="" to="/"><img className='back-button icon' src={back} alt="" /></Link>
        
        <div className='container'>
            
        
            <div className='login'>
            <Link className="" to="/auth/login"><img className='login-img icon' src={login} alt="" /></Link>
                
                
            </div>
            <div className='login-text'>
                    SIGN IN
                </div>
            <div className='reg'>
            <Link className="" to="/auth/reg"><img className='reg-img icon' src={reg} alt="" /></Link>

                
            </div>
            <div className='reg-text'>
                    SIGN UP
                </div>
            <img className='circle' src={circle} alt="" />
        </div>
        <Bottom/>
    </div>
  )
}
