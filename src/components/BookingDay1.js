import "../Reserve.css";
import { useForm } from "react-hook-form";
import { appdb } from '../utils/firebase';
import { useEffect, useState} from "react";
import { getDocs, getFirestore, collection} from "firebase/firestore";
import { Button } from 'primereact/button';
import BookingPopup from "./popup/Booking_popUp";

function BookingDay1(props){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [popup,setPopup] = useState(false);
    const [bkList,setBkList] = useState([]);
    const [bkTimeList,setBkTimeList] = useState([]);
    let bookingList = [];
    let totalTimeList = [];
    let toDay = new Date();

    const [rooms,setRoom] = useState([]);
    const [d1_time1,setD1_time1] = useState([]);
    const [d1_time2,setD1_time2] = useState([]);
    const [d1_time3,setD1_time3] = useState([]);
    const [d1_time4,setD1_time4] = useState([]);
    const [d1_time5,setD1_time5] = useState([]);
    const [d1_time6,setD1_time6] = useState([]);
    const [d1_time7,setD1_time7] = useState([]);

    const db = getFirestore(appdb);
    const docRoom = collection(db,'rooms');

    const docD1_time1 = collection(db,'d1_time1');
    const docD1_time2 = collection(db,'d1_time2');
    const docD1_time3 = collection(db,'d1_time3');
    const docD1_time4 = collection(db,'d1_time4');
    const docD1_time5 = collection(db,'d1_time5');
    const docD1_time6 = collection(db,'d1_time6');
    const docD1_time7 = collection(db,'d1_time7');

    const getRoom = async ()=>{
        const dbtotal = await getDocs(docRoom);
        setRoom(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    const getTimetoday = async ()=>{
        const dbD1_time1 = await getDocs(docD1_time1);
        const dbD1_time2 = await getDocs(docD1_time2);
        const dbD1_time3 = await getDocs(docD1_time3);
        const dbD1_time4 = await getDocs(docD1_time4);
        const dbD1_time5 = await getDocs(docD1_time5);
        const dbD1_time6 = await getDocs(docD1_time6);
        const dbD1_time7 = await getDocs(docD1_time7);

        setD1_time1(dbD1_time1.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
        setD1_time2(dbD1_time2.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
        setD1_time3(dbD1_time3.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
        setD1_time4(dbD1_time4.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
        setD1_time5(dbD1_time5.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
        setD1_time6(dbD1_time6.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
        setD1_time7(dbD1_time7.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }

    function onClickselect(timeselect, collect, room) {
        const status = document.querySelector('.reserve_tb');
        status.addEventListener('click',(e) => {
            if(e.target.classList.contains('status_free')){
                e.target.classList.add('status_over');
            }
        });
        let fIndex = bookingList.findIndex((select) => select === timeselect)
            if(fIndex === -1){
                timeselect["collect"] = collect;
                timeselect["room"] = room;
                timeselect["dateselect"] = props.dateselect;
                bookingList.push(timeselect);
            }
            
    }

    const onClickPopup = () => {
        setBkList(bookingList);
        setPopup(true);
        let collectList = []
        let timeList = []
        let tmp = []
        for(let i=0; i<bookingList.length; i++){
            let index = collectList.findIndex((select) => select === bookingList[i].collect)
            timeList.push(bookingList[i].time)

            if(index === -1){
                timeList = [];
                timeList.push(bookingList[i].time)
                collectList.push(bookingList[i].collect);
                totalTimeList.push(
                    {
                        room: bookingList[i].room, 
                        dateselect: bookingList[i].dateselect,
                        timeList: timeList
                    }
                )
                if(totalTimeList.length >= 2){
                    totalTimeList[totalTimeList.length-2]["timeList"] = tmp;
                }
                tmp =[]
            }
            else{
                tmp = timeList;
            }
        }
        setBkTimeList(totalTimeList);
    }

    useEffect(()=>{
        getRoom();
        getTimetoday();
    },[]);
    return (
        <div>
            <div className="boxes">
                <div className="box_body">
                    <table className="reserve_tb">
                        <tbody>
                            <tr className="columnTop">
                                <th>ห้อง/เวลา</th>
                                <th>9:00-10:00</th>
                                <th>10:00-11:00</th>
                                <th>11:00-12:00</th>
                                <th>12:00-13:00</th>
                                <th>13:00-14:00</th>
                                <th>14:00-15:00</th>
                                <th>15:00-16:00</th>
                                <th>16:00-17:00</th>
                                <th>17:00-18:00</th>
                                <th>18:00-19:00</th>
                                <th>19:00-20:00</th>
                                <th>20:00-21:00</th>
                                <th>21:00-22:00</th>
                            </tr>
                            {rooms.map((item) => {
                                if (item.id === '1') {
                                    let collect = "d1_time1";
                                    return (
                                        <tr key={item.id}>
                                            <td className="room_label">{item.room}</td>
                                            {d1_time1.map((item1) => {
                                                let sp = item1.time.split("-")
                                                let changeMonth = toDay.getMonth()<=9 ? "0"+(toDay.getMonth()+1):(toDay.getMonth()+1)+"";
                                                let changeDate = toDay.getDate()<=9 ? "0"+toDay.getDate():toDay.getDate().toString();
                                                let checkDate = new Date(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00")
                                                if (props.isview === true) {
                                                    if(toDay > checkDate){
                                                        if(item1.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className={item1.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                    key={item1.id} >
                                                                    {item1.append}<br />
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item1.id} >
                                                                    {item1.append}<br />
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else{
                                                        return (
                                                            <td className={item1.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                key={item1.id} >
                                                                {item1.append}<br />
                                                            </td>
                                                        )
                                                    }
                                                }
                                                else {
                                                   if(toDay > checkDate){
                                                        if(item1.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className="unselectable" key={item1.id} >
                                                                    {item1.append}<br />{item1.BookingBy !== "" ? <span>{item1.BookingBy}</span> : <span>{item1.Subject}</span>}
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item1.id} >
                                                                    {item1.append}<br />{item1.BookingBy !== "" ? <span>{item1.BookingBy}</span> : <span>{item1.Subject}</span>}
                                                                </td>
                                                            )
                                                        }
                                                   }
                                                   else{
                                                    return (
                                                        <td className={item1.append === "ห้องไม่ว่าง" ? "unselectable" : "status_free"}
                                                            key={item1.id} onClick={() => { onClickselect(item1, collect, item.room) }} >
                                                            {item1.append}<br />{item1.BookingBy !== "" ? <span>{item1.BookingBy}</span> : <span>{item1.Subject}</span>}
                                                        </td>
                                                    )
                                                   }
                                                }
                                            })}
                                        </tr>
                                    )
                                }
                                else if (item.id === '2') {
                                    let collect = "d1_time2"
                                    return (
                                        <tr key={item.id}>
                                            <td className="room_label">{item.room}</td>
                                            {d1_time2.map((item2) => {
                                                let sp = item2.time.split("-")
                                                let changeMonth = toDay.getMonth()<=9 ? "0"+(toDay.getMonth()+1):(toDay.getMonth()+1)+"";
                                                let changeDate = toDay.getDate()<=9 ? "0"+toDay.getDate():toDay.getDate().toString();
                                                let checkDate = new Date(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00")
                                                console.log(toDay);
                                                console.log(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00");
                                                if (props.isview === true) {
                                                    if(toDay > checkDate){
                                                        if(item2.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className={item2.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                    key={item2.id} >
                                                                    {item2.append}
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item2.id} >
                                                                    {item2.append}
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else{
                                                        return (
                                                            <td className={item2.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                key={item2.id} >
                                                                {item2.append}<br />
                                                            </td>
                                                        )
                                                    }
                                                }
                                                else {
                                                    if(toDay > checkDate){
                                                         if(item2.append === "ห้องไม่ว่าง"){
                                                             return (
                                                                 <td className="unselectable" key={item2.id} >
                                                                     {item2.append}<br />{item2.BookingBy !== "" ? <span>{item2.BookingBy}</span> : <span>{item2.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                         else{
                                                             return (
                                                                 <td className="status_passTime" key={item2.id} >
                                                                     {item2.append}<br />{item2.BookingBy !== "" ? <span>{item2.BookingBy}</span> : <span>{item2.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                    }
                                                    else{
                                                     return (
                                                         <td className={item2.append === "ห้องไม่ว่าง" ? "unselectable" : "status_free"}
                                                             key={item2.id} onClick={() => { onClickselect(item2, collect, item.room) }} >
                                                             {item2.append}<br />{item2.BookingBy !== "" ? <span>{item2.BookingBy}</span> : <span>{item2.Subject}</span>}
                                                         </td>
                                                     )
                                                    }
                                                 }
                                            })}
                                        </tr>
                                    )
                                }
                                else if (item.id === '3') {
                                    let collect = "d1_time3"
                                    return (
                                        <tr key={item.id}>
                                            <td className="room_label">{item.room}</td>
                                            {d1_time3.map((item3) => {
                                                let sp = item3.time.split("-")
                                                let changeMonth = toDay.getMonth()<=9 ? "0"+(toDay.getMonth()+1):(toDay.getMonth()+1)+"";
                                                let changeDate = toDay.getDate()<=9 ? "0"+toDay.getDate():toDay.getDate().toString();
                                                let checkDate = new Date(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00")
                                                if (props.isview === true) {
                                                    if(toDay > checkDate){
                                                        if(item3.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className={item3.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                    key={item3.id} >
                                                                    {item3.append}<br />
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item3.id} >
                                                                    {item3.append}<br />
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else{
                                                        return (
                                                            <td className={item3.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                key={item3.id} >
                                                                {item3.append}<br />
                                                            </td>
                                                        )
                                                    }
                                                }
                                                else {
                                                    if(toDay > checkDate){
                                                         if(item3.append === "ห้องไม่ว่าง"){
                                                             return (
                                                                 <td className="unselectable" key={item3.id} >
                                                                     {item3.append}<br />{item3.BookingBy !== "" ? <span>{item3.BookingBy}</span> : <span>{item3.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                         else{
                                                             return (
                                                                 <td className="status_passTime" key={item3.id} >
                                                                     {item3.append}<br />{item3.BookingBy !== "" ? <span>{item3.BookingBy}</span> : <span>{item3.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                    }
                                                    else{
                                                     return (
                                                         <td className={item3.append === "ห้องไม่ว่าง" ? "unselectable" : "status_free"}
                                                             key={item3.id} onClick={() => { onClickselect(item3, collect, item.room) }} >
                                                             {item3.append}<br />{item3.BookingBy !== "" ? <span>{item3.BookingBy}</span> : <span>{item3.Subject}</span>}
                                                         </td>
                                                     )
                                                    }
                                                 }
                                            })}
                                        </tr>
                                    )
                                }
                                else if (item.id === '4') {
                                    let collect = "d1_time4"
                                    return (
                                        <tr key={item.id}>
                                            <td className="room_label">{item.room}</td>
                                            {d1_time4.map((item4) => {
                                                let sp = item4.time.split("-")
                                                let changeMonth = toDay.getMonth()<=9 ? "0"+(toDay.getMonth()+1):(toDay.getMonth()+1)+"";
                                                let changeDate = toDay.getDate()<=9 ? "0"+toDay.getDate():toDay.getDate().toString();
                                                let checkDate = new Date(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00")
                                                if (props.isview === true) {
                                                    if(toDay > checkDate){
                                                        if(item4.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className={item4.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                    key={item4.id} >
                                                                    {item4.append}
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item4.id} >
                                                                    {item4.append}
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else{
                                                        return (
                                                            <td className={item4.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                key={item4.id} >
                                                                {item4.append}
                                                            </td>
                                                        )
                                                    }
                                                }
                                                else {
                                                    if(toDay > checkDate){
                                                         if(item4.append === "ห้องไม่ว่าง"){
                                                             return (
                                                                 <td className="unselectable" key={item4.id} >
                                                                     {item4.append}<br />{item4.BookingBy !== "" ? <span>{item4.BookingBy}</span> : <span>{item4.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                         else{
                                                             return (
                                                                 <td className="status_passTime" key={item4.id} >
                                                                     {item4.append}<br />{item4.BookingBy !== "" ? <span>{item4.BookingBy}</span> : <span>{item4.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                    }
                                                    else{
                                                     return (
                                                         <td className={item4.append === "ห้องไม่ว่าง" ? "unselectable" : "status_free"}
                                                             key={item4.id} onClick={() => { onClickselect(item4, collect, item.room) }} >
                                                             {item4.append}<br />{item4.BookingBy !== "" ? <span>{item4.BookingBy}</span> : <span>{item4.Subject}</span>}
                                                         </td>
                                                     )
                                                    }
                                                 }
                                            })}
                                        </tr>
                                    )
                                }
                                else if (item.id === '5') {
                                    let collect = "d1_time5"
                                    return (
                                        <tr key={item.id}>
                                            <td className="room_label">{item.room}</td>
                                            {d1_time5.map((item5) => {
                                                let sp = item5.time.split("-")
                                                let changeMonth = toDay.getMonth()<=9 ? "0"+(toDay.getMonth()+1):(toDay.getMonth()+1)+"";
                                                let changeDate = toDay.getDate()<=9 ? "0"+toDay.getDate():toDay.getDate().toString();
                                                let checkDate = new Date(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00")
                                                if (props.isview === true) {
                                                    if(toDay > checkDate){
                                                        if(item5.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className={item5.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                    key={item5.id} >
                                                                    {item5.append}
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item5.id} >
                                                                    {item5.append}
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else{
                                                        return (
                                                            <td className={item5.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                key={item5.id} >
                                                                {item5.append}
                                                            </td>
                                                        )
                                                    }
                                                }
                                                else {
                                                    if(toDay > checkDate){
                                                         if(item5.append === "ห้องไม่ว่าง"){
                                                             return (
                                                                 <td className="unselectable" key={item5.id} >
                                                                     {item5.append}<br />{item5.BookingBy !== "" ? <span>{item5.BookingBy}</span> : <span>{item5.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                         else{
                                                             return (
                                                                 <td className="status_passTime" key={item5.id} >
                                                                     {item5.append}<br />{item5.BookingBy !== "" ? <span>{item5.BookingBy}</span> : <span>{item5.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                    }
                                                    else{
                                                     return (
                                                         <td className={item5.append === "ห้องไม่ว่าง" ? "unselectable" : "status_free"}
                                                             key={item5.id} onClick={() => { onClickselect(item5, collect, item.room) }} >
                                                             {item5.append}<br />{item5.BookingBy !== "" ? <span>{item5.BookingBy}</span> : <span>{item5.Subject}</span>}
                                                         </td>
                                                     )
                                                    }
                                                 }
                                            })}
                                        </tr>
                                    )
                                }
                                else if (item.id === '6') {
                                    let collect = "d1_time6"
                                    return (
                                        <tr key={item.id}>
                                            <td className="room_label">{item.room}</td>
                                            {d1_time6.map((item6) => {
                                                let sp = item6.time.split("-")
                                                let changeMonth = toDay.getMonth()<=9 ? "0"+(toDay.getMonth()+1):(toDay.getMonth()+1)+"";
                                                let changeDate = toDay.getDate()<=9 ? "0"+toDay.getDate():toDay.getDate().toString();
                                                let checkDate = new Date(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00")
                                                if (props.isview === true) {
                                                    if(toDay > checkDate){
                                                        if(item6.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className={item6.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                    key={item6.id} >
                                                                    {item6.append}
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item6.id} >
                                                                    {item6.append}
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else{
                                                        return (
                                                            <td className={item6.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                key={item6.id} >
                                                                {item6.append}
                                                            </td>
                                                        )
                                                    }
                                                }
                                                else {
                                                    if(toDay > checkDate){
                                                         if(item6.append === "ห้องไม่ว่าง"){
                                                             return (
                                                                 <td className="unselectable" key={item6.id} >
                                                                     {item6.append}<br />{item6.BookingBy !== "" ? <span>{item6.BookingBy}</span> : <span>{item6.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                         else{
                                                             return (
                                                                 <td className="status_passTime" key={item6.id} >
                                                                     {item6.append}<br />{item6.BookingBy !== "" ? <span>{item6.BookingBy}</span> : <span>{item6.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                    }
                                                    else{
                                                     return (
                                                         <td className={item6.append === "ห้องไม่ว่าง" ? "unselectable" : "status_free"}
                                                             key={item6.id} onClick={() => { onClickselect(item6, collect, item.room) }} >
                                                             {item6.append}<br />{item6.BookingBy !== "" ? <span>{item6.BookingBy}</span> : <span>{item6.Subject}</span>}
                                                         </td>
                                                     )
                                                    }
                                                 }
                                            })}
                                        </tr>
                                    )
                                }
                                else if (item.id === '7') {
                                    let collect = "d1_time7"
                                    return (
                                        <tr key={item.id}>
                                            <td className="room_label">{item.room}</td>
                                            {d1_time7.map((item7) => {
                                                let sp = item7.time.split("-")
                                                let changeMonth = toDay.getMonth()<=9 ? "0"+(toDay.getMonth()+1):(toDay.getMonth()+1)+"";
                                                let changeDate = toDay.getDate()<=9 ? "0"+toDay.getDate():toDay.getDate().toString();
                                                let checkDate = new Date(toDay.getFullYear()+"-"+changeMonth+"-"+changeDate+"T"+sp[0]+":00")
                                                if (props.isview === true) {
                                                    if(toDay > checkDate){
                                                        if(item7.append === "ห้องไม่ว่าง"){
                                                            return (
                                                                <td className={item7.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                    key={item7.id} >
                                                                    {item7.append}
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <td className="status_passTime" key={item7.id} >
                                                                    {item7.append}
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else{
                                                        return (
                                                            <td className={item7.append === "ห้องไม่ว่าง" ? "unselectable_read" : "status_free_read"}
                                                                key={item7.id} >
                                                                {item7.append}
                                                            </td>
                                                        )
                                                    }
                                                }
                                                else {
                                                    if(toDay > checkDate){
                                                         if(item7.append === "ห้องไม่ว่าง"){
                                                             return (
                                                                 <td className="unselectable" key={item7.id} >
                                                                    {item7.append}<br />{item7.BookingBy !== "" ? <span>{item7.BookingBy}</span> : <span>{item7.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                         else{
                                                             return (
                                                                 <td className="status_passTime" key={item7.id} >
                                                                     {item7.append}<br />{item7.BookingBy !== "" ? <span>{item7.BookingBy}</span> : <span>{item7.Subject}</span>}
                                                                 </td>
                                                             )
                                                         }
                                                    }
                                                    else{
                                                     return (
                                                         <td className={item7.append === "ห้องไม่ว่าง" ? "unselectable" : "status_free"}
                                                             key={item7.id} onClick={() => { onClickselect(item7, collect, item.room) }} >
                                                             {item7.append}<br />{item7.BookingBy !== "" ? <span>{item7.BookingBy}</span> : <span>{item7.Subject}</span>}
                                                         </td>
                                                     )
                                                    }
                                                 }
                                            })}
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                    <br />
                    <div className="input-submit">
                        {props.isview === true? 
                            <div></div>
                            :
                            <div style={{ width: '20%' }}>
                            <Button className="p-button-secondary" style={{ float: 'left',width:'100px'}}
                                onClick={props.onLoader}
                            >
                                Clear
                            </Button>
                            <Button className="p-button-success" style={{ float: 'right',width:'100px' }} onClick={onClickPopup}>
                                Booking
                            </Button>
                        </div>
                        }
                    </div>
                </div>
                <BookingPopup display={popup} setPopup={setPopup} bookingList={bkList} onLoader={props.onLoader} 
                    bkTimeList={bkTimeList} getData1={getRoom} getData2={getTimetoday}
                />
            </div>
        </div>
    )
}

export default BookingDay1;