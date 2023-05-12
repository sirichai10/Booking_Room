import React, { useState, useRef } from 'react';
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
import { addDoc, collection } from "firebase/firestore"

const AddSubjectPopup = (props) =>{
    const { handleSubmit, formState:{errors} } = useForm();
    const db = getFirestore(appdb);
    const docRef = collection(db,"subjects");
    const toast = useRef(null);
    const [ subjectCode, setSubjectCode ] =  useState('');
    const [ subjectName, setSubjectName ] =  useState('');

    const onHide = () => {
       props.setAddData(false);
    }

    const onSaveSubject = async () =>{
        let dataForm = {
            code: subjectCode,
            subject: subjectName
        }
        await addDoc(docRef,dataForm).then(async ()=>{
            accept();
            await props.getData();
            setTimeout(()=>onHide(),100);
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
                <Button label="Add" icon="pi pi-check" onClick={() => onSaveSubject()} />
            </div>
        );
    }

    return(
        <div>
            <Toast ref={toast} />
            <Dialog header="ADD SUBJECT" visible={props.addData} style={{ width: '40vw' }}
                footer={renderFooter()} onHide={() => onHide()}>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "120px" }}>Subject Code</p>
                    <InputText style={{ width: "250px" }} value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}/>
                </div>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "120px" }}>Subject Name</p>
                    <InputText style={{ width: "250px" }} value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
                </div>
            </Dialog>
        </div>
    );
}

export default AddSubjectPopup;