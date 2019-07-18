import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { axiosWithAuth } from './axioswithAuth';


function FriendList({ touched, errors }){
    
    return(
        <div>
            <Form>
                <div className='form-group'>
                    <label>Name:</label>
                    <Field 
                        type='name'
                        name='name'
                        autoComplete='off'
                    />
                    <p>{touched.name && errors.name}</p>
                </div>
                <div className='form-group'>
                    <label>Age:</label>
                    <Field
                        type='age'
                        name='age'
                        autoComplete='off'
                    />
                    <p>{touched.age && errors.age}</p>
                </div>
                <div className='form-group'>
                    <label>Email:</label>
                    <Field
                        type='email'
                        name='email'
                        autoComplete='off'
                    />
                    <p>{touched.email && errors.email}</p>
                </div>
                <button type='submit'>Submit &rarr;</button>
            </Form>
            
        </div>
    )
}

export default withFormik({
    mapPropsToValue(){
        return{
            name: '',
            age: null,
            email: ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(2).required(),
        age: Yup.number().required(),
        email: Yup.string().min(6).required()
    }),
    handleSubmit(values, token){
        axios
            .post('http://localhost:5000/api/friends', values, {headers: { Authorization: token }})
            .then(res=>{
                console.log(res.data.payload)
            })
            .catch(err =>{
                console.log(err.response.data);
            })
    }
})(FriendList);