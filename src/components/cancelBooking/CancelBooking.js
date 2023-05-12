import "../../Reserve.css";
import Select from "@mui/material/Select";
import dayjs, { Dayjs } from 'dayjs';
import moment from "moment";
import HashLoader from "react-spinners/HashLoader";
import { appdb } from '../../utils/firebase';
import { useEffect, useState} from "react";
import { getDocs, getFirestore, collection} from "firebase/firestore";
import PanelMenuDemo from ".././Sidebar";
import PanelMenuStaff from ".././sidebarStaff";
import Headerbar from ".././headerbar";
import { UserContext } from '../../context/Authcontext';
import { useContext } from 'react';

import CancelBookingDay1 from "./CancelBookingDay1";
import CancelBookingDay2 from "./CancelBookingDay2";
import CancelBookingDay3 from "./CancelBookingDay3";

function CancelBooking(){
    const [data,setData] = useState({});
    const [load,setLoad] = useState(false);
    

    moment.locale();
    let now = dayjs(new Date());
    let nowformat = moment(now.toDate().toDateString()).format("DD MMMM YYYY")
    let tomorrow = moment(dayjs().add(1,'day').toDate().toDateString()).format("DD MMMM YYYY");
    let tomorrowtwo = moment(dayjs().add(2,'day').toDate().toDateString()).format("DD MMMM YYYY");
    const { user, staff } = useContext(UserContext);
    const db = getFirestore(appdb);

    const handleInputs = (event)=>{
        console.log(staff)
        let inputs = {[event.target.id] : event.target.value}
        setData({...data, ...inputs});

        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        }, 500);
    }

    const onLoader = ()=>{
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        }, 200);
    }

    // useEffect(()=>{
    //     getRoom();
    // },[]);
    
    if(data.dateselect === tomorrowtwo){
        return (
            <div>
                {load ?
                    <div className="loading">
                        <HashLoader color={"#40E0D0"} loading={load} size={120} />
                    </div>
                    :
                    <div style={{ display: 'flex' }}>
                        {staff.PermissName === "Admin" ? 
                            <PanelMenuDemo /> : <PanelMenuStaff />
                        }
                        <div style={{ overflowX: 'scroll' }}>
                            <Headerbar />
                            <div className="titledate"><h2>วันที่ต้องการจอง</h2></div>
                            <div className="dateTime">
                                <Select style={{ height: 40 }}
                                    id="dateselect"
                                    native
                                    value={data.dateselect}
                                    onChange={event => handleInputs(event)}
                                >
                                    <option aria-label="None" value={nowformat}>
                                        {nowformat}
                                    </option>
                                    <option aria-label="None" value={tomorrow}>
                                        {tomorrow}
                                    </option>
                                    <option aria-label="None" value={tomorrowtwo}>
                                        {tomorrowtwo}
                                    </option>
                                </Select>
                            </div>
                            <CancelBookingDay3 isview = {false} onLoader={onLoader} dateselect={data.dateselect}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
    else if(data.dateselect === tomorrow){
        return (
            <div>
                {load ?
                    <div className="loading">
                        <HashLoader color={"#40E0D0"} loading={load} size={120} />
                    </div>
                    :
                    <div style={{ display: 'flex' }}>
                        {staff.PermissName === "Admin" ? 
                            <PanelMenuDemo /> : <PanelMenuStaff />
                        }
                        <div style={{ overflowX: 'scroll' }}>
                            <Headerbar />
                            <div className="titledate"><h2>วันที่ต้องการจอง</h2></div>
                            <div className="dateTime">
                                <Select style={{ height: 40 }}
                                    id="dateselect"
                                    native
                                    value={data.dateselect}
                                    onChange={event => handleInputs(event)}
                                >
                                    <option aria-label="None" value={nowformat}>
                                        {nowformat}
                                    </option>
                                    <option aria-label="None" value={tomorrow}>
                                        {tomorrow}
                                    </option>
                                    <option aria-label="None" value={tomorrowtwo}>
                                        {tomorrowtwo}
                                    </option>
                                </Select>
                            </div>
                            <CancelBookingDay2 isview = {false} onLoader={onLoader} dateselect={data.dateselect}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
    else{
        data.dateselect = nowformat;
        return(
            <div>
                {load ?
                    <div className="loading">
                        <HashLoader color={"#40E0D0"} loading={load} size={120} />
                    </div>
                    :
                    <div style={{ display: 'flex' }}>
                        {staff.PermissName === "Admin" ? 
                            <PanelMenuDemo /> : <PanelMenuStaff />
                        }
                        <div style={{ overflowX: 'scroll' }}>
                            <Headerbar />
                            <div className="titledate"><h2>วันที่ต้องการจอง</h2></div>
                            <div className="dateTime">
                                <Select style={{ height: 40 }}
                                    id="dateselect"
                                    native
                                    value={data.dateselect}
                                    onChange={event => handleInputs(event)}
                                >
                                    <option aria-label="None" value={nowformat}>
                                        {nowformat}
                                    </option>
                                    <option aria-label="None" value={tomorrow}>
                                        {tomorrow}
                                    </option>
                                    <option aria-label="None" value={tomorrowtwo}>
                                        {tomorrowtwo}
                                    </option>
                                </Select>
                            </div>
                            <CancelBookingDay1 isview={false} onLoader={onLoader} dateselect={data.dateselect}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default CancelBooking;