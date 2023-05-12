/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PanelMenuUser from './ViewSidebar';
import Headerbar from "./headerbar";
import dayjs, { Dayjs } from 'dayjs';
import moment from "moment";

import { appdb } from '../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

const ViewStudySchedule = () => {
    const [ schedules, setSchedules ] = useState([]);
    const db = getFirestore(appdb);
    const docRef = collection(db,"study_Schedule");

    let now = dayjs(new Date());
    let nowformat = moment(now.toDate().toDateString()).format("DD MMMM YYYY")
    let tomorrow = moment(dayjs().add(1,'day').toDate().toDateString()).format("DD MMMM YYYY");
    let tomorrowtwo = moment(dayjs().add(2,'day').toDate().toDateString()).format("DD MMMM YYYY");
    let dateList = [nowformat, tomorrow, tomorrowtwo];

    const columns = [
        {field: 'DateBook', header: 'DATE', sortable:true},
        {field: 'Subject', header: 'SUBJECT', sortable:true},
        {field: 'Room', header: 'ROOM', sortable:true},
        {field: 'TimeStart', header: 'START', sortable:true},
        {field: 'TimeEnd', header: 'END', sortable:true},
    ];

    const getSchedule = async ()=>{
        const q = query(docRef,where("DateBook" ,'in', dateList, orderBy("DateBook")), 
            where("Subject", "!=" , "*personal*")
        )
        const dbtotal = await getDocs(q);
        setSchedules(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    useEffect(()=>{
        getSchedule();
    },[]);

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} sortable={col.sortable} columnKey={i}/>;
    });

    return (
        <div style={{display:'flex'}}>
            <PanelMenuUser/>
            <div className="tableview">
                <Headerbar/>
                <br/>
                <div style={{width:'95%',margin:'auto'}}>
                    <p style={{fontSize:'24px',fontWeight:600}}>STUDY SCHEDULE</p>
                    <DataTable value={schedules} responsiveLayout="scroll">
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default ViewStudySchedule;