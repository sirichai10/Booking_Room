import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useForm } from "react-hook-form";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import { appdb } from '../../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc, collection,getDocs } from "firebase/firestore"

const EditMemberPopup = (props) =>{
    const { handleSubmit, formState:{errors}} = useForm();
    const db = getFirestore(appdb);
    const toast = useRef(null);

    const [ firstname, setFirstname ] = useState(props.rowdata.Firstname);
    const [ lastname, setLastname ] = useState(props.rowdata.Lastname);
    const [ tel, setTel ] = useState(props.rowdata.Tel);
    const [ age, setAge ] = useState(props.rowdata.Age);

    const onHide = () => {
       props.setEditRow(false);
    }

    const onSaveBooking = async () =>{
        let staffRef = doc(db, "students", props.rowdata.id);
        await updateDoc(staffRef, {
            Firstname: firstname,
            Lastname: lastname,
            Tel: tel,
            Age: age
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

    // useEffect(()=>{
    //     getPermission();
    // },[]);

    return(
        <div>
            <Toast ref={toast} />
            <Dialog header="EDIT STAFF" visible={props.editRow} style={{ width: '60vw' }}
                footer={renderFooter()} onHide={() => onHide()}>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "80px" }}>Member Id</p>
                    <InputText style={{ width: "250px" }} value={props.rowdata.MemberId} disabled={true} />
                    <p style={{ width: "80px",marginLeft:'30px' }}>Email</p>
                    <InputText style={{ width: "250px" }} value={props.rowdata.Email} disabled={true} />
                    <p className='errors'> {errors.tutor?.type === "required" && "staff is required"}</p>
                </div>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "80px" }}>Firstname</p>
                    <InputText style={{ width: "250px" }} value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <p style={{ width: "80px",marginLeft:'30px' }}>Lastname</p>
                    <InputText style={{ width: "250px" }} value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <p className='errors'> {errors.tutor?.type === "required" && "staff is required"}</p>
                </div>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "80px" }}>Age</p>
                    <InputText style={{ width: "250px" }} value={age} onChange={(e) => setAge(e.target.value)} type={'number'} />
                    <p style={{ width: "80px",marginLeft:'30px' }}>Tel</p>
                    <InputText style={{ width: "250px" }} value={tel} onChange={(e) => setTel(e.target.value)} />
                </div>
            </Dialog>
        </div>
    );
}

export default EditMemberPopup;