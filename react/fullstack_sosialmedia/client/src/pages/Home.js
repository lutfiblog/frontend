import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function Home() {
    const [ListOfPosts, setListOfPosts] = useState([]);
    let history = useHistory();

    useEffect(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data);
        console.log(response.data);
      });
    }, []);


    return (
        <div className="App"> 
        {ListOfPosts.map((value, key) => {
            return (
                <div key={key} className="post" onClick={() => {history.push(`/post/${value.id}`)}}>
                    <div className="title">{value.title}</div>
                    <div className="body">{value.postText}</div>
                    <div className="footer">{value.username}</div>
                </div>
            )
        })}
        </div>
    )
}

export default Home
