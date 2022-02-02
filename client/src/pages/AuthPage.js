import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {

    const auth = useContext(AuthContext)

    const message = useMessage()

    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    
    const registerHandler = async e => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async e => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Сократи Ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    value={form.email}
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    className="yellow-input"
                                    name='email'
                                    onChange={changeHandler}
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    value={form.password}
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            onClick={loginHandler}
                            className='btn yellow darken-4' style={{
                            marginRight: 10
                        }}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            onClick={registerHandler}
                            className='btn grey lighten-1 black-text'
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
