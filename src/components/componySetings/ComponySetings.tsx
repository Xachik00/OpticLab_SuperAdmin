import React from 'react'

export const ComponySetings = () => {
  return (
    <div className='ComponySetings'>
      <div className="Setings-sayt">
            <h3>COMPONY SETTINGS</h3>
            <div>
                <span>LOGO: </span>
                <img src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/logo/b7450cf1-6369-4a6a-a2f8-3a2bfe1b23ac.jpg/:/rs=h:80,cg:true,m/qt=q:95" alt="" />
            </div>
            <div>
                <span>ADDRESS: </span>
                <input type="text" />
            </div>
            <div>
                <span>Director: </span>
                <input type="text" />
            </div>
            <div>
                <span>COMPONY NAME: </span>
                <input type="text" />
            </div>
            <div>
                <span>COMPONY ADDRESS: </span>
                <input type="text" />
            </div>
        </div>
    </div>
  )
}
