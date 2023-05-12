import "../Reserve.css";
import Select from "@mui/material/Select";
import dayjs, { Dayjs } from 'dayjs';
import moment from "moment";
import HashLoader from "react-spinners/HashLoader";
import { useState} from "react";
import PanelMenuUser from "./ViewSidebar";
import Headerbar from "./headerbar";

import BookingDay1 from './BookingDay1';
import BookingDay2 from './BookingDay2';
import BookingDay3 from './BookingDay3';

function ViewBooking(){
    const [data,setData] = useState({});
    const [load,setLoad] = useState(false);

    moment.locale();
    let now = dayjs(new Date());
    let nowformat = moment(now.toDate().toDateString()).format("DD MMMM YYYY")
    let tomorrow = moment(dayjs().add(1,'day').toDate().toDateString()).format("DD MMMM YYYY");
    let tomorrowtwo = moment(dayjs().add(2,'day').toDate().toDateString()).format("DD MMMM YYYY");

    const handleInputs = (event)=>{
        let inputs = {[event.target.id] : event.target.value}
        setData({...data, ...inputs});

        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        }, 500);
    }
    
    if(data.dateselect === tomorrowtwo){
        return (
            <div>
                {load ?
                    <div className="loading">
                        <HashLoader color={"#40E0D0"} loading={load} size={120} />
                    </div>
                    :
                    <div style={{ display: 'flex' }}>
                        <PanelMenuUser />
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
                            <BookingDay3 isview={true}/>
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
                        <PanelMenuUser />
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
                            <BookingDay2 isview={true}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
    else{
        return(
            <div>
                {load ?
                    <div className="loading">
                        <HashLoader color={"#40E0D0"} loading={load} size={120} />
                    </div>
                    :
                    <div style={{ display: 'flex' }}>
                        <PanelMenuUser />
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
                            <BookingDay1 isview={true}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ViewBooking;