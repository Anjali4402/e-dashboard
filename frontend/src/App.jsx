
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Footer from './Footer'
import SignUp from './components/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>

        <Route path='/' element={<h1>Dashbaord  Router Home here</h1>} />
        <Route path='/add' element={<h1>Add the Product</h1>} />
        <Route path='/update' element={<h1>Update the Proudct</h1>} />
        <Route path='/logout' element={<h1>Logout the user</h1>} />
        <Route path='/profile' element={<h1>This is my Profile Page</h1>} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
