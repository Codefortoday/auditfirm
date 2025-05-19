import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'
const SignupPrompt = () => {
    return (
       
            <div className="text-center p-4 border rounded shadow-sm bg-light">
                 {!(localStorage.getItem("authToken"))?
                 <>
                   <h4>Sign Up to avail our services! </h4>
                   <p className="text-muted">Join us to unlock exclusive features!</p>
                   <Link to="/Createuser" className='m-3 btn btn-danger'>Signup Toady!!</Link>
          </>
            :''}
        </div>
       
    );
};

export default SignupPrompt;
