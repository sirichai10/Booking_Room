/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PanelMenuDemo from "./Sidebar";
import PanelMenuStaff from "./sidebarStaff";
import Headerbar from "./headerbar";
import { UserContext } from '../context/Authcontext';

import { appdb } from '../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore"

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

const BookingList = () => {
    const [ members, setMembers ] = useState([]);
    const db = getFirestore(appdb);
    const docRef = collection(db,"bookingTable");
    const { staff } = useContext(UserContext);

    const columns = [
        {field: 'DateBook', header: 'วันที่', sortable:true},
        {field: 'Subject', header: 'วิชา', sortable:false},
        {field: 'Room', header: 'ห้องทบทวน', sortable:true},
        {field: 'TimeBook', header: 'เวลา', sortable:true},
        {field: 'Tutor', header: 'ผู้สอน', sortable:false},
        {field: 'BookingBy', header: 'ผู้จอง', sortable:false},
    ];

    const getMember = async ()=>{
        const q = query(docRef,orderBy("DateBook","desc"))
        const dbtotal = await getDocs(q);
        setMembers(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    useEffect(()=>{
        getMember();
    },[]);

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} 
                    sortable={col.sortable} columnKey={i}
                />;
    });

    return (
        <div style={{display:'flex'}}>
            {staff.PermissName === "Admin" ? 
                <PanelMenuDemo /> : <PanelMenuStaff />
            }
            <div className="tableview">
                <Headerbar/>
                <br/>
                <div style={{width:'95%',margin:'auto'}}>
                    <p style={{fontSize:'24px',fontWeight:600}}>HISTORY BOOKING</p>
                    <DataTable value={members} responsiveLayout="scroll" paginator first={0} rows={10}>
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default BookingList;