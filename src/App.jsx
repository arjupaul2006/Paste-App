import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path : "/",
      element :
      <div  className='flex flex-col gap-2 h-full'>
        <Navbar />
        <Home />
      </div>,
    },

    {
      path : "/pastes",
      element :
      <div>
        <Navbar />
        <Paste />
      </div>,
    },

    {
      path : "/pastes/:id",
      element :
      <div>
        <Navbar />
        <ViewPaste />
      </div>,
    },
  ]
)

function App() {

  return (
    <div className='container h-full w-[70vw]'> 
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App
