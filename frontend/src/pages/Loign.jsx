import { useState } from 'react';
import logo from "../images/logo.png"
import { Link } from 'react-router-dom';
import { api_base_url } from '../helper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      }
      else {
        setError(data.msg)
      }
    })
  }

  return (
    <>
      <div className="con flex flex-col items-center justify-center h-screen bg-[#070707]">
        <form onSubmit={submitForm} className='w-[26vw] min-h-[auto] bg-[#0f0e0e] rounded-2xl p-5 flex flex-col items-center'>
          <img className='-mt-3 w-[240px] h-[100px] object-cover' src={logo} alt="" />
          <div className='w-full'>

            <p className='text-[gray] text-[14px] mt-3'>Email</p>
            <div className="inputBox">
              <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required />
            </div>

            <p className='text-[gray] text-[14px] mt-3'>Password</p>
            <div className="inputBox">
              <input onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' required />
            </div>

            <p className='text-[14px] text-[gray] mt-3'>Don&apos;t have an account <Link to="/signUp" className='text-purple-600'>Sign Up</Link></p>

            <p className='text-[14px] text-red-500 mt-1 mb-3'>{error}</p>
            <button className="btnNormal w-full">Login</button>

          </div>
        </form>
      </div>
    </>
  )
}

export default Login