import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Navigate, useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token')??"";
  useEffect(()=>{
    if(token===""){
      navigate('/');
    }
  },[])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          {
            token===""?<Navigate to="/" replace/>:<AppContent />
          
          }
          
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
