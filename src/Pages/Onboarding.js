import '../App.css';
import {useState } from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

function Onboarding() {
    return (
        <div class="container">
            <div className='signupcontainer'>
                <Link to="/signup">
                    <button className='signupbutton'>Signup</button>
                </Link>
            </div>
            <div className='logincontainer'>
                <h2>Already have an account?</h2>
                <Link to="/login">
                    <button className='loginbutton'>Login</button>
                </Link> 
            </div>
        </div>
    )
}

export default Onboarding;