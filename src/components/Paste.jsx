import React, { useState } from 'react'
import './Paste.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeToPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import edit from '../assets/edit.svg'
import view from '../assets/view.svg';
import Delete from '../assets/delete.svg';
import share from '../assets/share.svg'
import copy from '../assets/copy.svg'

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes)
  // console.log(pastes)

  const dispatch = useDispatch();

  //for searching
  const [searchData, setSearchData] = useState('')

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchData.toLowerCase())
  )

  //to handle delete function
  function handleDelete(pasteId){
    dispatch(removeToPaste(pasteId))
    toast.success("The Paste is Deleted")
  }

  //to handle copy function
  function handleCopy(pasteContent){
    navigator.clipboard.writeText(pasteContent)
    toast.success("Copied to Clipboard")
  }

  return (
    <div>
      <input
        className='p-2 rounded-2xl m-2 w-[66vw] min-w-[16px] min-h-[16px]'
        type="text" 
        placeholder='Search Title'
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
      />

      <div className='flex flex-col gap-5 m-4'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='flex flex-col items-start gap-3 p-3 border max-h-[170px]' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>

                  <div className='text-xs text-gray-400 overflow-hidden'>
                    {paste.content}
                  </div>

                  <div className='flex flex-row gap-3'>
                    <button>
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        <img src={edit} className='invert min-w-[16px] min-h-[16px]' />
                      </NavLink>
                    </button>

                    <button>
                      <NavLink to={`/pastes/${paste?._id}`} className={"text-white"}>
                        <img src={view} className='invert min-w-[16px] min-h-[16px]' />
                      </NavLink>
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}>
                      <img src={Delete} className='invert min-w-[16px] min-h-[16px]' />
                    </button>

                    <button onClick={() => handleCopy(paste?.content)}>
                      <img src={copy} className='invert min-w-[16px] min-h-[16px]' />
                    </button>

                    <button>
                      <img src={share} className='invert min-w-[16px] min-h-[16px]' />
                    </button>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
