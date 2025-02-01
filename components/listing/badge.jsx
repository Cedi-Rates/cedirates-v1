import React from 'react'
import "@/style.css"
import Image from 'next/image'

const Badge = ({ icon, key, label, onClick, selected }) => {
    return (
        <button key={key} onClick={onClick} className={`px-4 ${selected === true && 'bg-blue-950 border-slate-200 text-slate-200'} py-2 rounded-full flex items-center flex-row gap-2 border-[1px] w-fit`}>
            <Image 
                className={`w-auto h-4 ${selected && label.toLowerCase() === 'forex bureau' && 'invert'}`} 
                src={icon}
                alt='Badge' 
            /> 
            <span className='font-gellix-medium'>{label}</span>
        </button>
    )
}

export default Badge