import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useForm } from "react-hook-form";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import { appdb } from '../../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc, collection,getDocs } from "firebase/firestore"

const EditStaffPopup = (props) =>{
    const { handleSubmit, formState:{errors}} = useForm();
    const [ permiss, setPermiss ] = useState();
    const db = getFirestore(appdb);
    const toast = useRef(null);

    const [ firstname, setFirstname ] = useState(props.rowdata.Firstname);
    const [ lastname, setLastname ] = useState(props.rowdata.Lastname);
    const [ email, setEmail ] = useState(props.rowdata.Email);
    const [ tel, setTel ] = useState(props.rowdata.Tel);
    const [ selectpermiss, setselectPermiss ] = useState(props.rowdata.Permission);

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

    const onHide = () => {
       props.setEditRow(false);
    }

    const onSaveBooking = async () =>{
        console.log(props.rowdata);
        let staffRef = doc(db, "members", props.rowdata.id);
        await updateDoc(staffRef, {
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            Tel: tel,
            Permission: selectpermiss,
            PermissName: selectpermiss.Permiss
        }).then(async ()=>{
            accept()
            await props.getData()
            onHide()
        })
        .catch((e)=>{
            reject(e.message)
        })
    }

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Update Success', life: 3000 });
    }
    const reject = (message) => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: message, life: 3000 });
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="cancel" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button label="save" icon="pi pi-check" onClick={() => onSaveBooking()}  />
            </div>
        );
    }

    useEffect(()=>{
        getPermission();
    },[]);

    return(
        <div>
            <Toast ref={toast} />
            <Dialog header="EDIT STAFF" visible={props.editRow} style={{ width: '60vw' }}
                footer={renderFooter()} onHide={() => onHide()}>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "80px" }}>Firstname</p>
                    <InputText style={{ width: "250px" }} value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <p style={{ width: "80px",marginLeft:'30px' }}>Lastname</p>
                    <InputText style={{ width: "250px" }} value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <p className='errors'> {errors.tutor?.type === "required" && "staff is required"}</p>
                </div>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "80px" }}>Email</p>
                    <InputText style={{ width: "250px" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p style={{ width: "80px",marginLeft:'30px' }}>Tel</p>
                    <InputText style={{ width: "250px" }} value={tel} onChange={(e) => setTel(e.target.value)} />
                    <p className='errors'> {errors.tutor?.type === "required" && "staff is required"}</p>
                </div>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "80px" }}>Permission</p>
                    <Dropdown style={{ width: "250px" }} filter filterBy="Permiss"
                        showClear value={selectpermiss} options={permiss}  optionLabel="Permiss" onChange={onPermissChange}
                    />
                    <p style={{ width: "80px",marginLeft:'30px' }}>Password</p>
                    <InputText style={{ width: "250px" }} value={props.rowdata.Password} disabled={true} type={'password'} />
                </div>
            </Dialog>
        </div>
    );
}

export default EditStaffPopup;