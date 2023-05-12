/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import PanelMenuDemo from "./Sidebar";
import PanelMenuStaff from './sidebarStaff';
import Headerbar from "./headerbar";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import { appdb } from '../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection,addDoc, getDocs} from "firebase/firestore"
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { UserContext } from '../context/Authcontext';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

function Createuser(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {createUser, staff} = useContext(UserContext);
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ tel, setTel ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ permiss, setPermiss ] = useState();
    const [ selectpermiss, setselectPermiss ] = useState(null);
    const toast = useRef(null);
    let dataForm = {};

    const db = getFirestore(appdb);
    const docRef = collection(db,"members");
    const docPermiss = collection(db,"permission");

    const getPermission = async ()=>{
        const dbtotal = await getDocs(docPermiss);
        setPermiss(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    const onPermissChange = (e) => {
        setselectPermiss(e.value);
    }

    const onClear = () =>{
        setFirstname('');
        setLastname('');
        setEmail('');
        setTel('');
        setPassword('');
        setselectPermiss(null);
    }

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Create Success', life: 2000 });
        onClear();
    }
    const reject = (message) => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: message, life: 2000 });
    }

    const createSubmit = async ()=>{
        dataForm = {
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            Password: password,
            Tel: tel,
            Permission: selectpermiss,
            PermissName: selectpermiss.Permiss
        }
        try{
            await createUser(dataForm.Email, dataForm.Password);
            await addDoc(docRef,dataForm);
            accept();
            onClear();
        }
        catch(err){
            reject(err.message);
        }
    }

    useEffect(()=>{
        getPermission();
    },[]);

    return(
        <div style={{display:"flex"}}>
            {staff.PermissName === "Admin" ? 
                <PanelMenuDemo /> : <PanelMenuStaff />
            }
            <Toast ref={toast} />
            <div className='pagePaper'>
                <Headerbar/>
                <Paper className='loginpage' elevation={3}>
                    <h2 className='text'>Create Staff Page</h2>
                    <div className='positionfiled'>
                        <div className='blockfiled'>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>Firstname</p>
                                <InputText className='textfiled' style={{marginRight:"30px"}} placeholder='firstname'
                                    
                                    {...register("Firstname",{ required: true })} value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                                <p className='errors'> {errors.Firstname?.type === "required" && "Firstname is required"}</p>
                            </div>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>E-mail</p>
                                <InputText className='textfiled' style={{marginRight:"30px"}} placeholder='Email'
                                    value={email} type="email"
                                    {...register("Email", {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                    })}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <p className='errors'>
                                    {errors.Email?.type === "required" && "Email is required"}
                                    {errors.Email?.type === "pattern" && "Entered email is in wrong format"}
                                </p>
                            </div>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>Password</p>
                                <InputText className='textfiled' style={{marginRight:"30px"}} placeholder='password' type="password" value={password}
                                    {...register("Password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 15,
                                    })}
                                    onChange={(e) => setPassword(e.target.value)}/>
                                <p className='errors'>
                                    {errors.Password?.type === "required" && "Password is required"}
                                    {errors.Password?.type === "minLength" && "Entered password is less than 6 characters"}
                                    {errors.Password?.type === "maxLength" && "Entered password is more than 15 characters"}
                                </p>
                            </div>
                        </div>
                        <div className='blockfiled'>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>Lastname</p>
                                <InputText className='textfiled' placeholder='lastname' value={lastname}
                                    {...register("Lastname",{ required: true })}
                                    onChange={(e) => setLastname(e.target.value)}/>
                                <p className='errors'> {errors.Lastname?.type === "required" && "Lastname is required"}</p>
                            </div>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>Tel</p>
                                <InputText className='textfiled' placeholder='tel' value={tel}
                                    {...register("Tel",{ required: true,pattern: /^[0-9]{10}/i })}
                                    onChange={(e) => setTel(e.target.value)}/>
                                <p className='errors'> {errors.Tel?.type === "required" && "Tel is required"}
                                    {errors.Tel?.type === "pattern" && "Entered Tel is in wrong format"}
                                </p>
                            </div>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>Permission</p>
                                <Dropdown className='textfiled' placeholder='permission' filter filterBy="Permiss"
                                    value={selectpermiss} options={permiss} optionLabel="Permiss" 
                                    {...register("Permission",{ required: true })} onChange={onPermissChange}
                                />
                                <p className='errors'> {errors.Permission?.type === "required" && "Permission is required"}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div style={{width:"250px",margin:"auto"}}>
                    <Button style={{backgroundColor:"#A9A9A9",padding:8,width:"100px"}}
                            onClick={()=>onClear()}
                            variant="contained"
                            color="primary">
                            clear
                        </Button>
                        <Button style={{backgroundColor:"#40E0D0",padding:8,float:"right",width:"100px"}}
                            onClick={handleSubmit(createSubmit)}
                            variant="contained"
                            color="primary">
                            Create
                        </Button>
                    </div>
                    <br/>
                </Paper>
            </div>
        </div>
    );
}

export default Createuser;