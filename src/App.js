/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Loginpage from './components/Loginpage';
import Createuser from './components/Createuser';

import Newbooking from './components/Newbooking';
import StaffList from './components/StaffList';
import MemberList from './components/MemberList';
import CreateMember from './components/createMember';
import ViewBooking from './components/ViewBooking';
import BookingList from './components/BookingList';
import CancelBooking from './components/cancelBooking/CancelBooking'
import StudySchedule from './components/StudySchedule';
import ViewStudySchedule from './components/ViewStudySchedule';
import DashboardAdmin from './components/Dashboard'
import SubjectList from './components/parameter/Subject';

import { AuthContextPovider } from './context/Authcontext';

function App() {
  return (
    <div className='allbody'>
      <AuthContextPovider>
      <Router>
          <Routes>
            <Route path="/" element={<ViewBooking/>}/>
            <Route path="/login" element={<Loginpage />}/>
            <Route path="/createuser" element={<Createuser/>}/>
            <Route path="/newbooking" element={<Newbooking/>}/>
            <Route path="/staff_List" element={<StaffList/>}/>
            <Route path="/member_List" element={<MemberList/>}/>
            <Route path="/createMember" element={<CreateMember/>}/>
            <Route path="/booking_List" element={<BookingList/>}/>
            <Route path="/cancel_Booking" element={<CancelBooking/>}/>
            <Route path="/study_schedule" element={<StudySchedule/>}/>
            <Route path="/studySchedule" element={<ViewStudySchedule/>}/>
            <Route path="/overview" element={<DashboardAdmin/>}/>
            <Route path="/parameter_subject" element={<SubjectList/>}/>
          </Routes>
      </Router>
      </AuthContextPovider>
    </div>
  );
}

export default App;
