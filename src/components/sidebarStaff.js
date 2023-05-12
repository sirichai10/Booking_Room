import React, {useContext} from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { UserContext } from '../context/Authcontext';

const PanelMenuStaff = () => {
    const { logout, staff } = useContext(UserContext);
    const itemsStaff = [
        {
            label: staff.Firstname + " " + staff.Lastname,
            icon:'pi pi-fw pi-user',
            items:[
                {
                    label:'Log out',
                    icon:'pi pi-fw pi-sign-out',
                    command:(e) => {
                        window.location.href = "/login"
                        logout()
                    }
                },
            ]
        },
        {disabled: true,},
        {
            label:'Booking',
            icon:'pi pi-fw pi-file',
            items:[
                {
                    label:'Booking Schedule',
                    icon:'pi pi-fw pi-calendar-plus',
                    command:(e) => {
                        window.location.href = "/newbooking"
                    }
                },
                {
                    label:'Cancel Booking',
                    icon:'pi pi-fw pi-calendar-minus',
                    command:(e) => {
                        window.location.href = "/cancel_Booking"
                    }
                },
                {
                    label:'History Booking',
                    icon:'pi pi-fw pi-history',
                    command:(e) => {
                        window.location.href = "/booking_List"
                    }
                }
            ]
        },
        {
            label:'Study Schedule',
            icon:'pi pi-fw pi-calendar',
            command:(e) => {
                window.location.href = "/study_schedule"
            }
        },
        {
            label:'Members',
            icon:'pi pi-fw pi-user',
            items:[
                {
                    icon:'pi pi-fw pi-bars',
                    label:'List',
                    command:(e) => {
                        window.location.href = "/member_List"
                    }
                },
                {
                    label:'New',
                    icon:'pi pi-fw pi-user-plus',
                    command:(e) => {
                        window.location.href = "/createMember"
                    }
                }
            ]
        }
    ]

    return (
        <div>
            <div className="card" style={{backgroundColor:"#F5F5F5",width:"17rem",height:"100%"}}>
                <PanelMenu model={itemsStaff} 
                    style={{ width: '17rem',paddingTop:'85px'}}
                />
            </div>
        </div>
    );
}

export default PanelMenuStaff;