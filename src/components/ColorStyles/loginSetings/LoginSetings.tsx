import React from 'react'
import  './LoginSetings.scss'

export const LoginSetings = () => {
  return (
    <div className='LoginSetings'>
        <div className="Setings-login">
            <h1>Types of coorporation</h1>
            <div>
                <span>Organizations only</span>
                <input type="checkbox"  />
            </div>
            <div>
                <span>Individuals only </span>
                <input type="checkbox"  />
            </div>
            <div>
                <span>Organizations and Individuals </span>
                <input type="checkbox"   />
            </div>
        </div>
        <div
        className='button-sayt'><button>Save</button></div>
    </div>
  )
}
