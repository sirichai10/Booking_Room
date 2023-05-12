/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useContext } from 'react';
import DeletePopup from './popup/Delete_popUp';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PanelMenuDemo from "./Sidebar";
import PanelMenuStaff from "./sidebarStaff";
import Headerbar from "./headerbar";
import EditMemberPopup from './popup/Edit_Member_Staff';
import { UserContext } from '../context/Authcontext';

import { appdb } from '../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

const MemberList = () => {
    const [ members, setMembers ] = useState([]);
    const [ deleteRow, setDeleteRow ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);
    const [ rowdata, setRowdata ] = useState();
    const [ editRow, setEditRow ] = useState(false);
    const db = getFirestore(appdb);
    const docRef = collection(db,"students");
    const { staff } = useContext(UserContext);

    const handleDelete = async (id) => {
        setDeleteRow(true);
        setDeleteId(id);
    };
    const handleEdit = async (rowData) => {
        setEditRow(true);
        setRowdata(rowData);
    };

    const Action = (e) => {
        return (
            <div>
                <Button icon="pi pi-pencil" style={{marginRight:'5px'}} onClick={()=>{handleEdit(e)}}/>
                <Button icon="pi pi-trash" className="p-button-warning" onClick={()=>{handleDelete(e.id)}}/>
            </div>
        )
    }

    const columns = [
        {field: 'MemberId', header: 'MEMBER ID', sortable:true},
        {field: 'Firstname', header: 'FIRSTNAME', sortable:true},
        {field: 'Lastname', header: 'LASTNAME', sortable:true},
        {field: 'Email', header: 'EMAIL', sortable:true},
        {field: 'Age', header: 'AGE', sortable:false},
        {field: 'Tel', header: 'TEL', sortable:false},
        {header: 'ACTION', body:Action, sortable:false}
    ];

    const getMember = async ()=>{
        const dbtotal = await getDocs(docRef);
        setMembers(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    useEffect(()=>{
        getMember();
    },[]);

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} sortable={col.sortable} columnKey={i}/>;
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
                    <p style={{fontSize:'24px',fontWeight:600}}>MEMBER LIST</p>
                    <DataTable value={members} responsiveLayout="scroll">
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
            <DeletePopup deleteRow={deleteRow} setDeleteRow={setDeleteRow} deleteId={deleteId} 
                docCol={"students"} getData={getMember}/>
            { editRow &&
                <EditMemberPopup setEditRow={setEditRow} editRow={editRow} rowdata={rowdata} getData={getMember}/>
            }
        </div>
    );
}

export default MemberList;