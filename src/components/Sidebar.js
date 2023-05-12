import React, {useContext} from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { UserContext } from '../context/Authcontext';

const PanelMenuDemo = () => {
    const { logout, staff } = useContext(UserContext);

    const itemsAdmin = [
        {
            label: staff.Firstname + " " + staff.Lastname,
            icon:'pi pi-fw pi-user',
            //disabled: true
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
        {disabled: true},
        {
            label:'Dashboard',
            icon:'pi pi-fw pi-chart-bar',
            command:(e) => {
                window.location.href = "/overview"
            }
        },
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
            label:'Staffs',
            icon:'pi pi-fw pi-user',
            items:[
                {
                    icon:'pi pi-fw pi-bars',
                    label:'List',
                    command:(e) => {
                        window.location.href = "/staff_List"
                    }
                },
                {
                    label:'New',
                    icon:'pi pi-fw pi-user-plus',
                    command:(e) => {
                        window.location.href = "/createuser"
                    }
                }
            ]
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
        },
        {
            label:'Data Management',
            icon:'pi pi-fw pi-folder-open',
            items:[
                {
                    label:'Subject',
                    icon:'pi pi-fw pi-book',
                    command:(e) => {
                        window.location.href = "/parameter_subject"
                    }
                }
            ]
        }
    ]

    return (
        <div>
            <div className="card" style={{backgroundColor:"#F5F5F5",width:"17rem",height:"100%"}}>
                <PanelMenu model={itemsAdmin} 
                    style={{ width: '17rem',paddingTop:'85px'}}
                />
            </div>
        </div>
    );
}

export default PanelMenuDemo;