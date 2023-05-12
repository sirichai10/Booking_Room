import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/Authcontext';
import PanelMenuDemo from "./Sidebar";
import PanelMenuStaff from "./sidebarStaff";
import Headerbar from "./headerbar";
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

import { appdb } from '../utils/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore"

import '../Reserve.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

export default function DashboardAdmin() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [chartData2, setChartData2] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});

    const [chartData3, setChartData3] = useState({});
    const [chartOptions3, setChartOptions3] = useState({});

    const { staff } = useContext(UserContext);
    const [ schedules, setScheduls ] = useState([]);
    const [ dateLists, setDateLists ] = useState([]);
    const [ getDates, setGetDates ] = useState([]);
    const db = getFirestore(appdb);
    const docRef = collection(db,"bookingTable");
    const roomRef = collection(db,"rooms");
    const timeRef = collection(db,"d1_time1");
    let scheduletotal = [];
    let totalSchedule = schedules.length;
    let dataChart = [];
    let dataChart2 = [];
    let dataChart3 = [];
    let getDate = {};
    let timeCount = {};
    let hourtotal = [];
    let timetotal = [];

    let roomtotal = [];
    let dataSet = [0,0,0,0,0,0,0];
    let dateList = [];

    let monthofyear = []
    const getSchedule = async ()=>{
        getTime()
        setScheduls([]);
        const q = query(docRef,orderBy("DateBook","desc"))
        const dbtotal = await getDocs(q);
        scheduletotal = [];
        dbtotal.docs.map((item)=>{
            scheduletotal.push(item.data());
        })
        setScheduls(scheduletotal);
        calSchedule();
        dataChart2 = [];
        getChart2();
    }
    const getRoom = async ()=>{
        const q = query(roomRef)
        const dbtotal = await getDocs(q);
        roomtotal = []
        dbtotal.docs.map((item)=>{
            roomtotal.push(item.data())
        })
        dataChart= [];
        getChart();
    }

    const getTime = async ()=>{
        const q = query(timeRef)
        const dbtotal = await getDocs(q);
        hourtotal = [];
        timetotal = [];
        let item2;
        dbtotal.docs.map((item)=>{
            timetotal.push(item.data().time)
            item2 = item.data().time.split("-")
            hourtotal.push(item2[0])
            item2 = [];
        })
    }
    
    const calSchedule = ()=>{
        let dateAmount = 0;
        dataSet = [0,0,0,0,0,0,0];
        for(let i=0; i<scheduletotal.length; i++){
            let splittxt = scheduletotal[i].DateBook.split(" ");
            let splittxt2  = []
            if(i === scheduletotal.length -1){
                splittxt2 = scheduletotal[i].DateBook.split(" ");
                dateAmount++;
                getDate[scheduletotal[i].DateBook] = dateAmount;
            }
            else{
                splittxt2 = scheduletotal[i+1].DateBook.split(" ");
                if(scheduletotal[i].DateBook === scheduletotal[i+1].DateBook){
                    dateAmount++;
                    getDate[scheduletotal[i].DateBook] = dateAmount;
                }
                else{
                    dateAmount++
                    getDate[scheduletotal[i].DateBook] = dateAmount;
                    dateAmount = 0
                }
            }
            let find = monthofyear.findIndex((idex)=> idex === splittxt[1]);
            if(splittxt[1] === splittxt2[1]){
                if(find === -1){
                    monthofyear.push(splittxt[1])
                }
            }
            let find2 = dateList.findIndex((idex)=> idex === scheduletotal[i].DateBook);
            if(find2 === -1){
                dateList.push(
                    scheduletotal[i].DateBook
                )
            }
            
            if(scheduletotal[i].Room === "ห้องทบทวน 1"){
                dataSet[0]++;
            }
            else if(scheduletotal[i].Room === "ห้องทบทวน 2"){
                dataSet[1]++;
            }
            else if(scheduletotal[i].Room === "ห้องทบทวน 3"){
                dataSet[2]++;
            }
            else if(scheduletotal[i].Room === "ห้องทบทวน 4"){
                dataSet[3]++;
            }
            else if(scheduletotal[i].Room === "ห้องทบทวน 5"){
                dataSet[4]++;
            }
            else if(scheduletotal[i].Room === "ห้องทบทวน 6"){
                dataSet[5]++;
            }
            else if(scheduletotal[i].Room === "ห้องทบทวน 7"){
                dataSet[6]++;
            }

            let find3 = timetotal.findIndex((idex2)=> idex2 === scheduletotal[i].TimeBook);
            if(i === 0){
                timetotal.map((item3)=>{
                    timeCount[item3] = 0
                })
            }
            if(find3 !== -1){
                timeCount[scheduletotal[i].TimeBook]++;
            }
        }
        setDateLists(dateList);
        setGetDates(getDate)

        getChart3();
    }

    const getChart = ()=>{
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        for(let i=0; i<roomtotal.length; i++){
            dataChart.push(
                {
                    label: roomtotal[i].room,
                    data: [dataSet[i]]
                }
            )
        }
        const data = {
            labels: monthofyear,
            datasets: dataChart
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }

    const getChart3 = ()=>{
        dataChart3 = []
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        for(let i=0; i<timetotal.length; i++){
            dataChart3.push(
                {
                    label: hourtotal[i],
                    data: [timeCount[timetotal[i]]]
                }
            )
        }
        const data = {
            labels: ["amount (hour)"],
            datasets: dataChart3
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData3(data);
        setChartOptions3(options);
    }

    const getChart2 = () => {
        let dateSort = dateList.sort()
        for(let i=0; i<dateSort.length; i++){
            dataChart2.push(getDate[dateSort[i]])
        }
        const data = {
            labels: dateSort,
            datasets: [{data: dataChart2,}]
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData2(data);
        setChartOptions2(options);
    }

    useEffect(()=>{
        getSchedule();
        getRoom();
    },[]);

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            {staff.PermissName === "Admin" ?
                <PanelMenuDemo /> : <PanelMenuStaff />
            }
            <div style={{ width: '100%' }}>
                <Headerbar />
                <br/>
                <div className='chartbar'>
                    <div className="chartsize">
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                </div>
                <br/>
                <div className='chartbar'>
                    <div style={{width:'50%'}}>
                        <Chart type="pie" data={chartData2} options={chartOptions2} />
                    </div>
                    <div className='divCardview'>
                        <Card className='cardview' title={"Booking Total (Hours) : "+ totalSchedule}>
                            {dateLists.map((item, index)=>{
                                return(
                                    <p key={index} style={{fontSize:20}}>{item} : {getDates[item]}</p>
                                )
                            })}

                        </Card>
                    </div>
                </div>
                <br/>
                <div className='chartbar'>
                    <div className="chartsize">
                        <Chart type="bar" data={chartData3} options={chartOptions3} />
                    </div>
                </div>
                <br/>
            </div>
        </div>
    )
}