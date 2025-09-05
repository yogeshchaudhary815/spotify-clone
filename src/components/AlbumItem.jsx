import React from 'react'
import { useNavigate } from 'react-router-dom'

function AlbumItem( { image, name,desc,id } ) {

    const navigate = useNavigate()
  return (
    <div onClick={ () => navigate(`/album/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold'>{name}</p>
        <p className='text-[15px]'>{desc}</p>
    </div>
  )
}

export default AlbumItem