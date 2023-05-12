/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useRef, useContext } from 'react';
import { Toast } from 'primereact/toast';
import PanelMenuDemo from "./Sidebar";
import PanelMenuStaff from "./sidebarStaff";
import Headerbar from "./headerbar";
import { UserContext } from '../context/Authcontext';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import { appdb } from '../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection,addDoc} from "firebase/firestore"
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';

function CreateMember(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ tel, setTel ] = useState('');
    const [ memberId, setMemberId ] = useState('');
    const [ age, setAge ] = useState(0);
    const toast = useRef(null);
    let dataForm = {}

    const { staff } = useContext(UserContext);

    const db = getFirestore(appdb);
    const docRef = collection(db,"students");

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Create Success', life: 2000 });
    }
    const reject = (message) => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: message, life: 2000 });
    }


    const createSubmit = async ()=>{
        dataForm = {
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            Tel: tel,
            MemberId: memberId,
            Age: age
        }
        try{
            await addDoc(docRef,dataForm);
            accept();
            onClear();
        }
        catch(err){
            reject(err.message);
        }
    }

    const onClear = () =>{
        setFirstname('');
        setLastname('');
        setEmail('');
        setTel('');
        setMemberId('');
        setAge(0);
        dataForm = {}
    }

    return(
        <div style={{display:"flex"}}>
            <Toast ref={toast} />
            {staff.PermissName === "Admin" ? 
                <PanelMenuDemo /> : <PanelMenuStaff />
            }
            <div className='pagePaper'>
                <Headerbar/>
                <Paper className='loginpage' elevation={3}>
                    <h2 className='text'>Create Member Page</h2>
                    <div className='positionfiled'>
                        <div className='blockfiled'>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>Firstname</p>
                                <InputText className='textfiled' style={{marginRight:"30px"}} placeholder='firstname' value={firstname}
                                    {...register("Firstname",{ required: true })} 
                                    onChange={(e) => setFirstname(e.target.value)}/>
                                <p className='errors'> {errors.Firstname?.type === "required" && "Firstname is required"}</p>
                            </div>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>E-mail</p>
                                <InputText className='textfiled' style={{marginRight:"30px"}} placeholder='Email' type="email" value={email}
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
                            <p className='labelfiled'>Member ID</p>
                                <InputText className='textfiled' placeholder='Member ID' value={memberId}
                                    {...register("MemberId",{ required: true })}
                                    onChange={(e) => setMemberId(e.target.value)}/>
                                <p className='errors'> {errors.MemberId?.type === "required" && "Member ID is required"}</p>
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
                                    id='Tel' {...register("Tel",{ required: true,pattern: /^[0-9]{10}/i })}
                                    onChange={(e) => setTel(e.target.value)}/>
                                <p className='errors'>
                                    {errors.Tel?.type === "required" && "Tel is required"}
                                    {errors.Tel?.type === "pattern" && "Entered Tel is in wrong format"}
                                </p>
                            </div>
                            <div style={{height:"100px"}}>
                                <p className='labelfiled'>Age</p>
                                <InputText className='textfiled' placeholder='age' type="number"
                                  value={age} min={0} onChange={(e) => setAge(e.target.value)}/>
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
                        <Button style={{backgroundColor:"#40E0D0",padding:8,width:"100px",float:"right"}}
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

export default CreateMember;