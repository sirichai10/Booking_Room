import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';

const PanelMenuUser = () => {
    const items = [
        {
            label: 'Booking Schedule',
            icon: 'pi pi-fw pi-book',
            command: (e) => {
                window.location.href = "/"
            }
        },
        {
            label: 'Study Schedule',
            icon: 'pi pi-fw pi-file',
            command: (e) => {
                window.location.href = "/studySchedule"
            }
        }
    ];

    return (
        <div>
            <div className="card" style={{backgroundColor:"#F5F5F5",width:"17rem",height:"100%"}}>
                <PanelMenu model={items} style={{ width: '17rem',paddingTop:'85px'}}/>
            </div>
        </div>
    );
}

export default PanelMenuUser;