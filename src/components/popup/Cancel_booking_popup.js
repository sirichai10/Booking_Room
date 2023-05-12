import React, { useState, useEffect, useRef, useContext } from 'react';
import { Toast } from 'primereact/toast';
import { useForm } from "react-hook-form";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import { appdb } from '../../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore"

const CancelBookingPopup = (props) =>{
    const {register, handleSubmit, formState:{errors}} = useForm();
    const db = getFirestore(appdb);
    const toast = useRef(null);

    const onHide = () => {
       props.setPopup(false);
    }

    const onSaveBooking = async () =>{
        props.bookingList.map(async (item)=>{
            let bookingRef = doc(db, item.collect, item.id);
            if(item.append === "ห้องไม่ว่าง"){
                await updateDoc(bookingRef, {
                    BookingBy: '',
                    append: "ห้องว่าง",
                    Staff: '',
                    Subject: '',
                });
                    
                // await addDoc(collection(db,"bookingTable"),{
                //     //BookingBy: selectStaff.Firstname,
                //     DateBook: item.dateselect,
                //     Room: item.room,
                //     //Subject: selectSubject.subject,
                //     TimeBook: item.time,
                //     //Tutor: tutor
                // })
            }
        });
        props.getData();
        accept()
        onHide()
        //props.onLoader()
    }

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Update Success', life: 3000 });
    }
    const reject = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Update Unsuccess', life: 3000 });
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="cancel" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button label="save" icon="pi pi-check" onClick={() => onSaveBooking()}  />
            </div>
        );
    }

    return(
        <div>
            <Toast ref={toast} />
            <Dialog header="Confirm cancel Booking" visible={props.display} style={{ width: '30vw' }}
                footer={renderFooter()} onHide={() => onHide()}>
                <div style={{textAlign:"center"}}>
                    <i className='pi pi-info-circle' style={{fontSize:"40px"}}></i>
                    <h4>Do you want to cancel Booking?</h4>
                </div>
            </Dialog>
        </div>
    );
}

export default CancelBookingPopup;