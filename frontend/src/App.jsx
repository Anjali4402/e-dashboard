
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Footer from './Footer'
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>

        <Route element={<PrivateRoute/>} >
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update' element={<h1>Update the Proudct</h1>} />
        <Route path='/logout' element={<h1>Logout the user</h1>} />
        <Route path='/profile' element={<h1>This is my Profile Page</h1>} />

        {/* edit product router */}
        <Route path='/edit/:_id' element={<AddProduct />} />
        </Route>

        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
