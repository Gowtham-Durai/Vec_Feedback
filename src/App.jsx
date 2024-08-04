import React, { Suspense } from 'react'; 
import { Routes, Route } from 'react-router-dom'; 
 
// Import components using React.lazy 
const StudentLogin = React.lazy(() => import('./Components/StudentLogin')); 
const StaffLogin = React.lazy(() => import('./Components/StaffLogin')); 
const NewStaff = React.lazy(() => import('./Components/Security/NewStaff')); 
const Staff = React.lazy(() => import('./Components/Staff')); 
const AdminLogin = React.lazy(() => import('./Components/AdminLogin')); 
const NewAdmin = React.lazy(() => import('./Components/Security/NewAdmin')); 
const AdminPortal = React.lazy(() => import('./Components/AdminPortal')); 
const StudentFeedback = React.lazy(() => import('./Components/StudentFeedback')); 
const CreateCourseDept = React.lazy(() => import('./Components/CreateCourseDept')); 
const ResultDetails = React.lazy(() => import('./Components/ResultDetails'));
// const FeedbackResult = React.lazy(() => import('./Components/FeedbackResult')); 
const Mainportal = React.lazy(() => import('./Components/Mainportal')); 
import FeedbackResult from './Components/FeedbackResult';
import FeedbackTruncate from './Components/FeedbackTruncate';
// import Mainportal from './Components/mainportal';
const StaffSubjects = React.lazy(() => import('./Components/StaffSubjects')); 
const NotFound = React.lazy(() => import('./Components/Security/NotFound')); 
const DBView=React.lazy(()=>import("./Components/DBView"));
const Navbar = React.lazy(() => import('./Components/Navbar')); 
 
const routes = [ 
  { path: '/', element: <StudentLogin />, index: true }, 
  { path: '/FeedTruncate', element: <FeedbackTruncate /> }, 
  { path: '/mainportal', element: <Mainportal /> }, 
  { path: '/stafflogin', element: <StaffLogin /> }, 
  { path: '/newStaff', element: <NewStaff /> }, 
  { path: '/staff', element: <Staff /> }, 
  { path: '/admin', element: <AdminLogin /> }, 
  { path: '/newAdmin', element: <NewAdmin /> }, 
  { path: '/View', element: <DBView /> }, 
  { path: '/adminPortal', element: <AdminPortal /> }, 
  { path: '/feedback', element: <StudentFeedback /> }, 
  { path: '/create', element: <CreateCourseDept /> }, 
  { path: '/resultDetails', element: <ResultDetails /> }, 
  { path: '/result', element: <FeedbackResult /> }, 
  { path: '/staffSubject', element: <StaffSubjects /> }, 
]; 
 
function App() { 
  
  return ( <>
    <Navbar/>
    <Suspense fallback={
    <div className='flex justify-center items-center h-[88%] '>
      <h2 className='spinner'>
      
      </h2>
      
      </div>}> 
      <Routes> 
        {routes.map((route, index) => ( 
          <Route key={index} path={route.path} element={route.element} /> 
        ))} 
        <Route path="*" element={<NotFound />} /> 
      </Routes> 
    </Suspense> 
    </>
  ); 
} 
 
export default App; 