import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "c8769f09-c7c4-4ff1-80ea-a49352b36235",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
                setLoading(false);
        })
        .catch(()  => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users/',
                formdata,
                {
                    headers : {"private-key" : "af78bc29-89bf-4c68-b2e8-e0471a868a58"}
                }
                ).then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user, history]);


    return (
        <div className="chat-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Lutfi Messenger
                </div>
                <div
                    onClick={handleLogout}
                    className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                heigt="calc(100vh - 66px)"
                projectID="c8769f09-c7c4-4ff1-80ea-a49352b36235"
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    )
}

export default Chats;