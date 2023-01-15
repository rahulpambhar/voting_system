import React, { useState } from 'react';
import { Formik, Form, Field, label, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios'
import { useAlert } from 'react-alert'
import { positions } from 'react-alert'


const SignupSchema = Yup.object().shape({
  // UserName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // lastName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});


function App() {
  const alert = useAlert()
  const [isLoad, setIsLoad] = useState(true)




  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }} >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11 ">
              <div className="card text-black" style={{ borderRadius: '100px' }}>
                <div className="card-body p-md-5 ">
                  <div className="row justify-content-center  " >

                    {
                      isLoad ?

                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1  " style={{ height: '500px' }}>
                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>

                          <Formik
                            initialValues={{
                              username: '',
                              email: '',
                              password: '',
                              confirmPassword: ''
                            }}
                            // validationSchema={SignupSchema}
                            onSubmit={async (values) => {

                              const data = {
                                email: values.email,
                                password: values.password
                              }
                              try {

                                const result = await axios.post('http://localhost:8000/login', data)
                               
                                localStorage.setItem('userMailId', result.data.result.email);
                                localStorage.setItem('Token', result.data.token);

                                alert.success('login successfull', {
                                  position: positions.TOP_CENTER,
                                  timeout: 5000,
                                })

                              } catch (error) {
                                alert.error('login failed', {
                                  position: positions.TOP_CENTER,
                                  timeout: 5000,
                                })
                              }

                            }}
                          >
                            {({ errors, touched }) => (

                              <Form className="mx-1 mx-md-4">

                                <div className="d-flex flex-row align-items-center mt-5 ">
                                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                  <div className="form-outline flex-fill mb-0 mt-5">
                                    <Field name="email" placeholder="email" className="form-control" />
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw text-danger">
                                      {errors.email && touched.email ? (
                                        <div>{errors.email}</div>
                                      ) : null}
                                    </i>
                                  </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-1 ">
                                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                  <div className="form-outline flex-fill mb-0 mt-2">
                                    <Field name="password" placeholder="Password" className="form-control" />
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw text-danger">
                                      {errors.password && touched.password ? (
                                        <div>{errors.password}</div>
                                      ) : null}
                                    </i>
                                  </div>
                                </div>

                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                  <button type="submit" className="btn btn-primary btn-lg mt-5">log in..</button>
                                  <button type="button" className="btn btn-success btn-lg mt-5 mx-2" onClick={() => setIsLoad(false)}>sign Up</button>
                                </div>

                              </Form>
                            )}
                          </Formik>
                        </div>

                        :
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1  " style={{ height: '700px' }}>
                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</p>
                        <Formik
                          initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                          }}
                          // validationSchema={SignupSchema}

                          onSubmit={async (values) => {
                            const data = {
                              username: values.username,
                              email: values.email,
                              password: values.confirmPassword
                            }
                            try {
                              const result = await axios.post('http://localhost:8000/signup', data)
                              localStorage.setItem('userMailId', result.data.result.email);
                              localStorage.setItem('Token', result.data.token);

                              alert.success('signup successfull', {
                                position: positions.TOP_CENTER,
                                timeout: 5000,
                              })
                            } catch (error) {
                              alert.error('signup failed', {
                                position: positions.TOP_CENTER,
                                timeout: 5000,
                              })
                            }
                          }}
                        >
                          {({ errors, touched }) => (

                            <Form>

                              <div className="d-flex flex-row align-items-center mb-1 ">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0 mt-2">
                                  <Field name="username" placeholder="User Name" className="form-control" />
                                  <i className="fas fa-envelope fa-lg me-3 fa-fw text-danger">
                                    {errors.username && touched.username ? (
                                      <div>{errors.username}</div>
                                    ) : null}
                                  </i>
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center mb-1 ">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0 mt-2">
                                  <Field name="email" placeholder="email" className="form-control" />
                                  <i className="fas fa-envelope fa-lg me-3 fa-fw text-danger">
                                    {errors.email && touched.email ? (
                                      <div>{errors.email}</div>
                                    ) : null}
                                  </i>
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center m1-4 ">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0 mt-2">
                                  <Field name="password" placeholder="Password.." className="form-control" />
                                  <i className="fas fa-envelope fa-lg me-3 fa-fw text-danger">
                                    {errors.password && touched.password ? (
                                      <div>{errors.password}</div>
                                    ) : null}
                                  </i>
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center mb-1 ">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0 mt-2">
                                  <Field name="confirmPassword" placeholder="Confirm Password" className="form-control" />
                                  <i className="fas fa-envelope fa-lg me-3 fa-fw text-danger">
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                      <div>{errors.confirmPassword}</div>
                                    ) : null}
                                  </i>
                                </div>
                              </div>

                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" className="btn btn-primary btn-lg mt-5">Register</button>
                                <button type="button" className="btn btn-success btn-lg mt-5 mx-2" onClick={() => setIsLoad(true)}>LogIn</button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                        </div>
                    }



                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 " >
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid  " style={{ borderRadius: '1000px' }} alt="" />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
