import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import { appdb } from '../../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore"

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

const DeletePopup = (props) =>{
    const toast = useRef(null);
    const db = getFirestore(appdb);

    const handleDelete = async () => {
        props.setDeleteRow(true);
        const userDoc = doc(db,props.docCol,props.deleteId);

        await deleteDoc(userDoc)
        .then(async ()=>{
            deleteSuccess()
            await props.getData()
            onHide()
        })
        .catch((e)=>{
            deleteError(e.message)
        })
    };
    
    const onHide = () => {
       props.setDeleteRow(false);
    }

    const deleteSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Delete Success', life: 2000});
    }
    const deleteError = (message) => {
        toast.current.show({severity:'error', summary: 'Error', detail:message, life: 2000});
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="cancel" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button label="delete" icon="pi pi-check" onClick={() => handleDelete()} className="p-button-warning" />
            </div>
        );
    }

    return(
        <div>
            <Toast ref={toast} />
            <Dialog header="Confirm Delete" visible={props.deleteRow} style={{ width: '30vw' }} 
                footer={renderFooter()} onHide={() => onHide()} >
                <div style={{textAlign:"center"}}>
                    <i className='pi pi-info-circle' style={{fontSize:"40px"}}></i>
                    <h4>Do you want to delete this record?</h4>
                </div>
            </Dialog>
        </div>
    );
}

export default DeletePopup;