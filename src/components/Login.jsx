import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { toast } from 'react-toastify';
import Loader from './Loader'
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../store/slices/cartSlice';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading,setIsLoading]=useState(false)
    const saveurl=useSelector(selectPreviousURL)
    console.log(saveurl)
    let redirectURL=()=>{
      if(saveurl.includes('cart')){
        return navigate('/cart')
      }
      else 
      return navigate('/')
    }

    const navigate=useNavigate()
    let loginUser=(e)=>{
      e.preventDefault()
      setIsLoading(true)
      signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
        const user = userCredential.user;
        const ref= doc(db,"users",userCredential.user.uid)
        const docSnap=await getDoc(ref)
        if(docSnap.exists()){
            if(docSnap.data().role=="admin"){
              navigate('/admin')
            }
            else if(docSnap.data().role=="user"){
              // navigate('/')
              redirectURL()
            }
        }
            setIsLoading(false)
            toast.success("loggedIn successfully")
           
  })
  .catch((error) => { 
    setIsLoading(false)
    toast.error(error.message)
  });

    }
    const provider = new GoogleAuthProvider();
    let LoginUsingGoogle=(e)=>{
      e.preventDefault();
      setIsLoading(true)
      signInWithPopup(auth, provider)
      .then((result) => {
        setIsLoading(false)
        toast.success("loggedIn successfully")
        // navigate('/')
        redirectURL()
      }).catch((error) => { 
        setIsLoading(false)
        toast.error(error.message)
      });
    }
  return (
    <div className='container'>
      {isLoading && <Loader/>}
       <div class="card mt-5 shadow">
        <div className='card-body row'>
        <div className='col-4'>
        <img src={require('../assets/login.png')} alt="Title" style={{height:"300px"}}/>
        </div>
        <div class="col-6">
          <h1>Login User</h1><hr/>
        <form >
              <input
                type="text"
                placeholder="Email"
                required className='form-control mt-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required className='form-control mt-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div class="d-grid gap-2 mt-2">
                <button type="submit" name="" id="" class="btn btn-primary" onClick={loginUser} >Login</button>
              </div>
              <div className="form-group">
                <Link to="/reset">Forgot Password?</Link>
              </div>
              <p className='m-2'>------Or------</p>
              <div class="d-grid gap-2">
                <button type="submit" name="" id="" class="btn btn-danger" onClick={LoginUsingGoogle}>Login with Google</button>
              </div>
            </form>
            <span>
              Create an account?
              <Link to="/register">Sign Up</Link>
            </span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Login
