import '../App.css';
import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // login authentication logic
    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signup email:", email, "password:", password);
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}required/>
                <input type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}required/>
                <input type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}required/>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Signup;