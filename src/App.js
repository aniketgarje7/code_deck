import React from 'react'
import { Suspense } from 'react'

import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
const Home = React.lazy(()=>import('./pages/Home'))
const PlayGround = React.lazy(()=>import('./pages/PlayGround'))
const Page404 = React.lazy(()=>import('./pages/Page404'))



const App = () => {
  const Loader = () => {
    <div className='flex justify-center items-center'>
      <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ' role="status">
        <span className='visually-hidden'>Loading .... </span>
      </div>
    </div>
  }
  return (
  
    <Suspense fallback={Loader()}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/code_deck' element={<Home/>}/>
          <Route path='/playground/:folderId/:playgroundId' element={<PlayGround/>}/>
          <Route path='*' element={<Page404/>}/>
        </Routes>
    </Router> 
    </Suspense>
   
  )
}

export default App
