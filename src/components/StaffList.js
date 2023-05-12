/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PanelMenuDemo from "./Sidebar";
import Headerbar from "./headerbar";

import DeletePopup from './popup/Delete_popUp';
import EditStaffPopup from './popup/Edit_Staff_popup';
import PanelMenuStaff from "./sidebarStaff";
import { UserContext } from '../context/Authcontext';

import { appdb } from '../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query , orderBy} from "firebase/firestore"

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

const StaffList = () => {
    const [ staffs, setStaffs ] = useState([]);
    const [ deleteRow, setDeleteRow ] = useState(false);
    const [ editRow, setEditRow ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);
    const [ rowdata, setRowdata ] = useState();
    const db = getFirestore(appdb);
    const docRef = collection(db,"members");
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
        {field: 'Firstname', header: 'FIRSTNAME', sortable:true},
        {field: 'Lastname', header: 'LASTNAME', sortable:true},
        {field: 'Email', header: 'EMAIL', sortable:true},
        {field: 'Tel', header: 'TEL', sortable:false},
        {field: 'Permission.Permiss', header: 'PERMISSION', sortable:true},
        {header: 'ACTION', body:Action , sortable:false}
    ];

    const getStaff = async ()=>{
        const q = query(docRef,orderBy("Permission.Permiss"))
        const dbtotal = await getDocs(q);
        setStaffs(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    useEffect(()=>{
        getStaff();
    },[]);

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} sortable={col.sortable}/>;
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
                    <p style={{fontSize:'24px',fontWeight:600}}>STAFF LIST</p>
                    <DataTable value={staffs} responsiveLayout="scroll">
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
            <DeletePopup deleteRow={deleteRow} setDeleteRow={setDeleteRow} deleteId={deleteId} 
                docCol={"members"} getData={getStaff}/>
            { editRow &&
                <EditStaffPopup setEditRow={setEditRow} editRow={editRow} rowdata={rowdata} getData={getStaff}/>
            }
        </div>
    );
}

export default StaffList;