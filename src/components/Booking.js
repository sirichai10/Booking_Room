import "../App.css";
import { useEffect, useState, useContext } from "react";
import { collection,getDocs,getFirestore, orderBy, query} from "firebase/firestore";
import { appdb } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import moment from "moment";
import { UserContext } from "../context/Authcontext";

function Booking(){
    // const [array,setArray] = useState([]);
    const [arrayBook,setArrayBook] = useState([]);
    const db = getFirestore(appdb);
    const docRef = collection(db,"booking");
    const {user} = useContext(UserContext);
    const navigate = useNavigate()
    
    // const getData = async ()=>{
    //   const dbtotal = await getDocs(docRef);
    //   setArray(dbtotal.docs.map((item)=>{
    //     return {...item.data(),id: item.id}
    //   }));
    // }
    
    const getQbook = async () =>{
      const q = query(docRef, orderBy("time_st"), orderBy("date"));
      const dbtotal = await getDocs(q);
      setArrayBook(dbtotal.docs.map((item)=>{
          return {...item.data(),id: item.id}
      }));
  }

    const handleLogin = async ()=>{
      try {
        if(user != null){
          if(user.email === "admin@gmail.com"){
            navigate('/bookingadmin');
          }
          else{
            navigate('/bookingcreate');
          }
        }
        else{
          navigate('/login');
        }
      } catch (e) {
        console.log(e.message);
      }
   }

    // const handleLogout = async () => {
    //   try {
    //     await logout();
    //     navigate('/');
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // };
    useEffect(()=>{
      // getData();
      getQbook();
    },[])
    return (
      <div>
        <div className="titlename">
          <h1>ระบบจองห้องทบทวน</h1>
        </div>
        <Container className="tablepaper" style={{width:1000}}>
        <h3 className="txtwelcome">welcome: {user && user.email}</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="containers">
                <TableRow>
                  <TableCell width="20%">
                    <h3 className="dttable">ห้องทบทวน</h3>
                  </TableCell>
                  <TableCell  width="15%">
                    <h3 className="dttable">วันที่</h3>
                  </TableCell>
                  <TableCell width="15%">
                    <h3 className="dttable">เวลาเริ่ม</h3>
                  </TableCell>
                  <TableCell width="15%">
                    <h3 className="dttable">เวลาสิ้นสุด</h3>
                  </TableCell>
                  <TableCell width="20%">
                    <h3 className="dttable">วิชา</h3>
                  </TableCell>
                  <TableCell width="15%">
                    <h3 className="dttable">ผู้สอน</h3>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {arrayBook.map((item) => {
                return(
                  <TableRow key={item.id}>
                    <TableCell><h3 className="dttable">{item.room}</h3></TableCell>
                    <TableCell><h3 className="dttable">{moment(item.date.toDate().toDateString()).format("DD/MM/YYYY")}</h3></TableCell>
                    <TableCell><h3 className="dttable">{item.time_st}</h3></TableCell>
                    <TableCell><h3 className="dttable">{item.time_end}</h3></TableCell>
                    {/* <TableCell align="center"><h3>{moment(item.time_st.toDate()).format("HH:mm")}</h3></TableCell>
                    <TableCell align="center"><h3>{moment(item.time_end.toDate()).format("HH:mm")}</h3></TableCell> */}
                    <TableCell><h3 className="dttable">{item.subject}</h3></TableCell>
                    <TableCell><h3 className="dttable">{item.tutor}</h3></TableCell>
                  </TableRow>
                )
              })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="btlogin">
          {/* <Button style={{backgroundColor:"#F75D59",padding:10,
            float:"left",
            width:80}}
            onClick={handleLogout}
            variant="contained"
            color="primary">
              Logout
          </Button> */}
          <Button style={{backgroundColor:"#B6B6B4",
            padding:13,width:90}}
            onClick={handleLogin}
            variant="contained"
            color="primary">
              Login
          </Button>
          </div>
        </Container>
      </div>
    );
}

export default Booking;
