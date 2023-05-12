/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PanelMenuDemo from ".././Sidebar";
import PanelMenuStaff from ".././sidebarStaff";
import Headerbar from ".././headerbar";

import DeletePopup from '.././popup/Delete_popUp';
import EditSubjectPopup from '../popup/Edit_Subject_popup';
import AddSubjectPopup from '../popup/Add_Subject_popup';

import { UserContext } from '../../context/Authcontext';

import { appdb } from '../../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where, orderBy} from "firebase/firestore"

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

const SubjectList = () => {
    const [ subjects, setSubjects ] = useState([]);
    const [ deleteRow, setDeleteRow ] = useState(false);
    const [ editRow, setEditRow ] = useState(false);
    const [ addData, setAddData ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);
    const [ rowdata, setRowdata ] = useState();
    const db = getFirestore(appdb);
    const docRef = collection(db,"subjects");
    const { user, staff } = useContext(UserContext);

    const handleDelete = async (id) => {
        setDeleteRow(true);
        setDeleteId(id);
    };
    const handleEdit = async (rowData) => {
        setEditRow(true);
        setRowdata(rowData);
    };
    const handleAdd = async () => {
        setAddData(true);
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
        {field: 'code', header: 'SUBJECT CODE', sortable:true},
        {field: 'subject', header: 'SUBJECT NAME', sortable:true},
        {header: 'ACTION', body:Action , sortable:false}
    ];

    const getSubject = async ()=>{
        const q = query(docRef,orderBy("code"));
        const dbtotal = await getDocs(q);
        setSubjects(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    useEffect(()=>{
        getSubject();
    },[]);

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} 
            sortable={col.sortable} style={{textAlign:'center'}} alignHeader={'center'}
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
                <Button style={{float:"right"}} onClick={()=>{handleAdd()}}>ADD</Button>
                    <p style={{fontSize:'24px',fontWeight:600}}>SUBJECT LIST</p>
                    <DataTable value={subjects} responsiveLayout="scroll">
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
            <DeletePopup deleteRow={deleteRow} setDeleteRow={setDeleteRow} deleteId={deleteId} 
                docCol={"subjects"} getData={getSubject}/>
            { editRow && 
                <EditSubjectPopup setEditRow={setEditRow} editRow={editRow} rowdata={rowdata} getData={getSubject} />
            }
            { addData &&
                <AddSubjectPopup setAddData={setAddData} addData={addData} getData={getSubject}/>
            }
        </div>
    );
}

export default SubjectList;