import React, { useState, useEffect, useRef, useContext } from 'react';
import { Toast } from 'primereact/toast';
import { useForm } from "react-hook-form";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { UserContext } from '../../context/Authcontext';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import { appdb } from '../../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, updateDoc, addDoc, query, orderBy} from "firebase/firestore"

const BookingPopup = (props) =>{
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [ staffs, setStaffs ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);
    const [ selectStaff, setselectStaff ] = useState(null);
    const [ selectSubject, setselectSubject ] = useState(null);
    const [ tutor, setTutor ] = useState('');
    const [ isPrivate, setIsPrivate ] = useState(false);
    const db = getFirestore(appdb);
    const docRef = collection(db,"students");
    const subjectRef = collection(db,"subjects");
    const toast = useRef(null);
    const { staff } = useContext(UserContext);

    const getStaff = async ()=>{
        const dbtotal = await getDocs(docRef);
        setStaffs(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id,codeName: item.data().MemberId+" - "+item.data().Firstname}
        }));
    }
    const getSubject = async ()=>{
        const q = query(subjectRef, orderBy("code"))
        const dbtotal = await getDocs(q);
        setSubjects(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    const onHide = () => {
       props.setPopup(false);
    }
    const onStaffChange = (e) => {
        setselectStaff(e.value);
    }
    const onSubjectChange = (e) => {
        setselectSubject(e.value);
        if(e.value.code === "PS00"){
            setIsPrivate(true);
        }
        else{
            setIsPrivate(false);
        }
    }

    const onSaveBooking = async () =>{
        props.bookingList.map(async (item)=>{
            let bookingRef = doc(db, item.collect, item.id);
            if(item.append === "ห้องว่าง"){
                if(selectSubject.code === "PS00"){
                    await updateDoc(bookingRef, {
                        BookingBy: selectStaff.Firstname,
                        append: "ห้องไม่ว่าง",
                        //Staff: staff.Firstname
                    });
                    await addDoc(collection(db,"bookingTable"),{
                        BookingBy: selectStaff.Firstname,
                        DateBook: item.dateselect,
                        Room: item.room,
                        Subject: selectSubject.subject,
                        TimeBook: item.time,
                        Tutor: "-"
                    })
                }
                else{
                    await updateDoc(bookingRef, {
                        //BookingBy: selectStaff.Firstname,
                        append: "ห้องไม่ว่าง",
                        Subject: selectSubject.subject,
                        //Staff: staff.Firstname
                    });
                    await addDoc(collection(db,"bookingTable"),{
                        BookingBy: "-",
                        DateBook: item.dateselect,
                        Room: item.room,
                        Subject: selectSubject.subject,
                        TimeBook: item.time,
                        Tutor: tutor,
                        //Staff: staff.Firstname
                    })
                }
            }
        });
        for(let i=0; i<props.bkTimeList.length; i++){
            let subStart = props.bkTimeList[i].timeList[0].split("-");
            let subEnd;
            let j = props.bkTimeList[i].timeList.length;
            if(i === props.bkTimeList.length-1){
                subEnd = props.bkTimeList[i].timeList[j-1].split("-")
            }
            else{
                subEnd = props.bkTimeList[i].timeList[j-2].split("-")
            }
            await addDoc(collection(db,"study_Schedule"),{
                DateBook: props.bkTimeList[i].dateselect,
                Room: props.bkTimeList[i].room,
                Subject: selectSubject.subject,
                TimeStart: subStart[0],
                TimeEnd: subEnd[1]
            })
        }
        props.getData2()
        accept()
        onHide()
        setselectStaff(null)
        setselectSubject(null)
        setTutor('')
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

    useEffect(()=>{
        getStaff();
        getSubject();
    },[]);

    return(
        <div>
            <Toast ref={toast} />
            <Dialog header="Confirm Booking" visible={props.display} style={{ width: '50vw' }}
                footer={renderFooter()} onHide={() => onHide()}>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                    <p style={{ width: "100px" }}>Subject</p>
                    <Dropdown style={{ width: "250px" }} placeholder='select subject' filter filterBy="subject"
                        showClear value={selectSubject} options={subjects} optionLabel="subject"
                        {...register("subject", { required: true })} onChange={onSubjectChange}
                    />
                    <p className='errors'> {errors.subject?.type === "required" && "staff is required"}</p>
                </div>

                { isPrivate &&
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                        <p style={{ width: "100px" }}>Booking By</p>
                        <Dropdown style={{ width: "250px" }} placeholder='select staff' filter filterBy="codeName"
                            showClear value={selectStaff} options={staffs} optionLabel="codeName"
                            {...register("staff", { required: true })} onChange={onStaffChange}
                        />
                        <p className='errors'> {errors.staff?.type === "required" && "staff is required"}</p>
                    </div>
                }

                {!isPrivate &&
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom:"20px" }}>
                        <p style={{ width: "100px" }}>Tutor</p>
                        <InputText style={{ width: "250px" }} value={tutor} {...register("tutor", { required: true })}
                            onChange={(e) => setTutor(e.target.value)} />
                        <p className='errors'> {errors.tutor?.type === "required" && "staff is required"}</p>
                    </div>
                }
            </Dialog>
        </div>
    );
}

export default BookingPopup;