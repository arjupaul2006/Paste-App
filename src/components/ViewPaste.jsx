import React from 'react'
import './ViewPaste.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import copy from "../assets/copy.svg"
import toast from 'react-hot-toast'

const ViewPaste = () => {

  const {id} = useParams()
  console.log(id)

  const allPastes = useSelector((state) => state.paste.pastes)

  const paste = allPastes.find((p) => p._id === id)


  function handleCopy(content){
    navigator.clipboard.writeText(content)
    toast.success("Copied to Clipboard")
  }

  return (
    <div className="flex flex-col h-full mt-5">
      <div className="flex flex-row justify-between p-3 rounded-[40px] border border-gray-500 h-[50px]">
        <input
          type="text"
          placeholder="Enter the Title"
          className="w-[75%] flex justify-start items-center bg-transparent"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="flex justify-center items-center bg-transparent outline-0" onClick={() => handleCopy(paste.content)}>
          <img src={copy} className="invert h-[15px]"/>
        </button>

      </div>

      <div className="mt-3 h-full">
            <textarea
             value={paste.content}
             disabled
             placeholder="Enter Content Here" 
             onChange={(e) => setValue(e.target.value)}
             className="viewTextarea rounded p-2 min-w-full"
            //  rows={17}
            >

             </textarea>
        </div>
    </div>
  )
}

export default ViewPaste
