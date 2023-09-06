import React from 'react'
import './loader.css'
import loadimg from '../assets/loader.gif' 
import  ReactDOM  from 'react-dom'
const Loader = () => {
    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='loader'>
                <img src={loadimg} alt='Loading'/>
            </div>
        </div>,document.getElementById('loader')
      )
}

export default Loader
