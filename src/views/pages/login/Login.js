import React,{useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import {loginAdmin} from '../../../redux/thunks/adminThunk';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false)
  const token = window.localStorage.getItem('token')??"";
  useEffect(()=>{
    if(token!==""){
      navigate('/dashboard');
    }
  },[])

  const handleSubmit = (event) => {
  const form = event.currentTarget
    if (form.checkValidity() === true) {
      const email = event.target.email.value;
      const password = event.target.password.value;
      dispatch(loginAdmin({email,password})).then((res)=>{
        const token = res.payload.data.accessToken;
        window.localStorage.setItem('token',token);
      });
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      navigate('/dashboard');
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className='needs-validation'  
                  validated={validated}
                  onSubmit={handleSubmit} >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput  
                          type="text"
                          defaultValue=""
                          id="email"
                          name="email"
                          required
                          />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        defaultValue=""
                        feedbackValid="Looks good!"
                        id="password"
                        name="password"
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Veterinary Ecommerce</h2>
                    <p>
                      It's a all type of product selling ecommerce website
                    </p>
                    <Link to="/">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Welcome
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
