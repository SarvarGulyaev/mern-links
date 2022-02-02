import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const {request} = useHttp()

    const [link, setLink] = useState('')

    const pressHandler = async e => {
        if(e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                navigate(`/detail/${data.link._id}`)
                console.log(data)
            } catch (e) {

            }
        }
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
