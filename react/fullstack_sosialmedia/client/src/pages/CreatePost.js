import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useHistory } from "react-router-dom";

function CreatePost() {
    let history = useHistory();

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Harus diisi"),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            history.push("/");
        });
    };

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="Tambah title" autocomplete="off" />
                    <label>Post Text: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="Tambah post" autocomplete="off" />
                    <label>User Name: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="Tambah username" autocomplete="off" />

                    <button type="submit">Kirim</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
