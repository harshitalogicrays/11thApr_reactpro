import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Pagenotfound from './components/Pagenotfound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Admin from './components/Admin/Admin';
import AddProduct from './components/Admin/AddProduct';
import ViewProducts from './components/Admin/ViewProducts';
import Products from './components/Products';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import CheckoutDetails from './components/CheckoutDetails';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import OrderHistory from './components/OrderHistory';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';
function App() {
  return (
  <>
  <ToastContainer/>
  <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}>
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path='viewproducts' element={<ViewProducts/>}/>
        <Route path='editproduct/:id' element={<AddProduct/>}/>
        <Route path='orders' element={<Orders/>}/>
        <Route path='order-details/:id/:orderStatus' element={<OrderDetails/>}/>
      </Route>
      <Route path='/products' element={<Products/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/details/:id' element={<ProductDetails/>}/>
      <Route path='/checkout-details' element={<CheckoutDetails/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/order-history' element={<OrderHistory/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
  </>
  );
}

export default App;
