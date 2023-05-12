import React from 'react'
import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { UserContext } from '../context/Authcontext';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import Headerbar from './headerbar';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

function Loginpage(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signIn} = useContext(UserContext);
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = async ()=>{
       await signIn(email, password)
        .then(() => {
            navigate("/newbooking")
        })
        .catch((err) => {
            alert(err.message)
        })
    };

    const onClear = ()=>{
        setEmail('');
        setPassword('');
    }
    
    return(
        <div>
            <Headerbar />
            <div className='pagePaper'>
                <Paper className='loginpage' elevation={3}>
                    <br />
                    <h2 className='text'>Login Page</h2>
                    <div className='positionfiled'>
                        <div className='blockfiled'>
                            <div style={{ height: "100px" }}>
                                <p className='labelfiled'>E-mail</p>
                                <InputText className='textfiled' style={{ marginRight: "30px" }} placeholder='Email'
                                    id='Email' type="email" value={email}
                                    {...register("Email", {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                    })}
                                    onChange={event => setEmail(event.target.value)} />
                                <p className='errors'>
                                    {errors.Email?.type === "required" && "Email is required"}
                                    {errors.Email?.type === "pattern" && "Entered email is in wrong format"}
                                </p>
                            </div>
                            <div style={{ height: "100px" }}>
                                <p className='labelfiled'>Password</p>
                                <InputText className='textfiled' style={{ marginRight: "30px" }} placeholder='password'
                                    id='Password' type="password" value={password}
                                    {...register("Password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 15,
                                    })}
                                    onChange={event => setPassword(event.target.value)} />
                                <p className='errors'>
                                    {errors.Password?.type === "required" && "Password is required"}
                                    {errors.Password?.type === "minLength" && "Entered password is less than 6 characters"}
                                    {errors.Password?.type === "maxLength" && "Entered password is more than 15 characters"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style={{ width: "180px", margin: "auto" }}>
                        <Button style={{backgroundColor:"#82CAFF",padding:8}}
                            onClick={onClear}
                            color='primary' variant="contained" >
                            Clear
                        </Button>
                        <Button style={{ backgroundColor: "#40E0D0", padding: 8, float:"right" }}
                            onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                            Log In
                        </Button>
                    </div>
                    <br />
                </Paper>
            </div>
        </div>
    );
}
export default Loginpage;