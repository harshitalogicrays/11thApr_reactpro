import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {
  FaHome,
  FaHouseUser,
  FaPenNib,
  FaSearch,
  FaShoppingBag,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, LogoutUser, selectUserName, selectUserRole } from "../store/slices/authSlice";
import { ShowOnLogin, ShowOnLogout } from "./HiddenLinks";
import { doc, getDoc } from "firebase/firestore";
import { selectCartItems } from "../store/slices/cartSlice";
import useFetchCollection from "../customhooks/useFetchCollection";
import { selectProducts, store_product } from "../store/slices/productSlice";
import { FILTER_BY_SEARCH } from "../store/slices/filterSlice";
const Header = () => {
  const [search,setSearch]=useState(null)

  let {data,isLoading}=useFetchCollection("products")
  let dispatch=useDispatch()
  let products=useSelector(selectProducts)
  useEffect(()=>{
      dispatch(store_product({products:data}))
  },[data,dispatch])


  const cartItems=useSelector(selectCartItems)
  const userrole=useSelector(selectUserRole)
  const username=useSelector(selectUserName)
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const uid = user.uid;
        const ref= doc(db,"users",uid)
        const docSnap=await getDoc(ref)
        if(docSnap.exists()){
         let role=docSnap.data().role
         let userName = user.email.slice(0, -10);
        dispatch(
          LoginUser({ email: user.email, userID: uid, userName: userName,role:role })
        );
        }
        
      } else {
        dispatch(LogoutUser());
      }
    });
  });

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Loggout successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // useEffect(()=>{
  //   dispatch(FILTER_BY_SEARCH({search,products}))
  // },[search,dispatch,products])

  let handleSearch=()=>{
    dispatch(FILTER_BY_SEARCH({search,products}))
  }
  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Navbar.Brand href="#home">MyShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <Link to="/" className="text-white text-decoration-none">
                {" "}
                <FaHouseUser /> Home{" "}
              </Link>
            </Nav.Link>
            <Nav.Link> <Link to='/products' className="text-white text-decoration-none">Products</Link></Nav.Link>
          </Nav>
          <div className="col-4">
            <InputGroup>
              <Form.Control placeholder="search by name or category" value={search}
              onChange={(e)=>setSearch(e.target.value)}/>{" "}
              <Button variant="danger" id="button-addon1" onClick={handleSearch}>
                <FaSearch />
              </Button>
            </InputGroup>
          </div>
          <Nav>
            <Nav.Link>
              {userrole != "admin" &&
              <Link to="/cart" className="text-white text-decoration-none">
                Cart <FaShoppingCart size={30} />
                <span
                  class="badge rounded-pill text-bg-danger"
                  style={{ position: "relative", top: "-10px" }}
                >
               {cartItems.length}
                </span>{" "}
              </Link> }
            </Nav.Link>

            <ShowOnLogout>
              <Nav.Link href="#home">
                <Link
                  to="/register"
                  className="text-white text-decoration-none"
                >
                  <FaPenNib /> Register
                </Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link to="/login" className="text-white text-decoration-none">
                  <FaUserAlt /> Login
                </Link>
              </Nav.Link>
            </ShowOnLogout>

            <ShowOnLogin>
            {userrole == "user" &&
            <Nav.Link href="#link">
                <Link to="/order-history" className="text-white text-decoration-none">
                  <FaShoppingBag/> My Orders
                </Link>
              </Nav.Link>
}
            <Nav.Link
                className="text-white text-decoration-none"
                onClick={handleLogout}
              >
               Welcome {username}
              </Nav.Link>

              <Nav.Link
                className="text-white text-decoration-none"
                onClick={handleLogout}
              >
                Logout
              </Nav.Link>
            </ShowOnLogin>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
