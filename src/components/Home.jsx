import React, { useEffect, useState } from "react";
import './Home.css'
import { useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import copy from "../assets/copy.svg"
import toast from "react-hot-toast";



const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");   //for content
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");    //to get query parameter from url
  const dispatch = useDispatch()

  //fetch all paste
  const allPastes = useSelector((state) => state.paste.pastes)

  //when we click edit button then the title and content should be not empty
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId)

      setTitle(paste.title)
      setValue(paste.content)
    }
  }, [pasteId])
  

  function createPaste(){
    if(title && value){
      const paste = {
        title: title,
        content: value,
        _id: pasteId ||
            Date.now().toString(36),
        createdAt: new Date().toISOString(),
      }

      if(pasteId){
        //update
        dispatch(updateToPaste(paste))
      }
      else{
        //create
        setTitle('')
        setValue('')
        dispatch(addToPaste(paste))
      }

      //after creation or updation
      setTitle('')
      setValue('')
      setSearchParams({})
    }
    else{
      toast.error("Please Write Something")
    }
  }

  function handleCopy(content){
    navigator.clipboard.writeText(content)
    toast.success("Copied to Clipboard")
  }

  useEffect(() => {
    if(!pasteId){
      setTitle('')
      setValue('')
    }
  }, [pasteId])
    


  return (
    <div className="flex flex-col h-full">
      <div className="input-btn flex flex-row gap-3 justify-evenly">
        <input
          type="text"
          placeholder="Enter the Title"
          className="homeInput rounded-3xl p-2 pl-4 w-[44%]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className="homeBtn">{pasteId ? "Update My Paste" : "Create My Paste"}</button>

      </div>

      <div className="mt-3 h-full flex flex-col gap-6">

        <div className="flex flex-row justify-between p-3 rounded-[40px] border border-gray-500 h-[50px]">

          <div className="w-[75%] flex justify-start items-center">{title}</div>

          <button className="flex justify-center items-center bg-transparent min-w-[16px]" onClick={() => handleCopy(value)}>
            <img src={copy} className="invert h-[15px]"/>
          </button>

        </div>

        <textarea
          value={value}
          placeholder="Write Your Content Here....." 
          onChange={(e) => setValue(e.target.value)}
          className="homeTextarea rounded p-2 min-w-full"
          // rows={14}
        >

        </textarea>
      </div>
    </div>
  );
};

export default Home;
