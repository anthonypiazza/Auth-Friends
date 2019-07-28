import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


import './Login.css';

function Login({ touched, errors }){
    
    return(
        <div>
            <Form>
                <div className='form-group'>
                    <label>Username:</label>
                    <Field 
                        type='username'
                        name='username'
                        autoComplete='off'
                    />
                    <p>{touched.username && errors.username}</p>
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <Field
                        type='password'
                        name='password'
                        autoComplete='off'
                    />
                    <p>{touched.password && errors.password}</p>
                </div>
                <button type='submit'>Submit &rarr;</button>
            </Form>
            
        </div>
    )
}

export default withFormik({
    mapPropsToValue(){
        return{
            username: '',
            password: ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().min(5).required(),
        password: Yup.string().min(3).required()
    }),
    handleSubmit(values, formikBag){

        axios
            .post('http://localhost:5000/api/login', {username: 'Lambda School', password: 'i<3Lambd4' })
            .then(res=>{
                localStorage.setItem('token', res.data.payload)
                formikBag.props.history.push('/profile');
                console.log(res.data.payload)
            })
            .catch(err =>{
                console.log(err.response.data);
            })
    }
})(Login);