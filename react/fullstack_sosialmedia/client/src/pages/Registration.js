import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

function Registration() {

    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Harus diisi"),
        password: Yup.string().min(5).max(20).required()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            console.log(response.data)
        });
    };

    return (
        <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Username: </label>
                <ErrorMessage name="username" component="span" />
                <Field id="inputCreatePost" name="username" placeholder="Tambah nama" autocomplete="off" />
                <label>Password: </label>
                <ErrorMessage name="password" component="span" />
                <Field id="inputCreatePost" type="password" name="password" placeholder="Tambah password" autocomplete="off" />
               
                <button type="submit">Register</button>
            </Form>
        </Formik>
    </div>
    )
}

export default Registration
