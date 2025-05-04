import { useState } from "react";
import { post } from "../shared/api";

import './Login.css'

const Login = (props) => {

    const [masster, setMasster] = useState('');
    const [error, setError] = useState('');

    const changeHandler = (e) => {
        setError('')
        setMasster(e.target.value);
    }

    const clickHandler = async () => {
            const data = await post('/login', { managerpass: masster });

        if (data.status !== 200) {
            setError(data);
            return;
        }
        
        sessionStorage.setItem('isLogged', true);
        props.setIsLogged(true);
    }

    return (
        <>
            <div className="login-wrapper">
                <input
                    className="masster"
                    type="text"
                    value={masster}
                    placeholder="Masterpasswort eingeben..."
                    onChange={changeHandler}
                />
                <button
                    onClick={clickHandler}
                >Start</button>
            </div>
            <p style={{ color: "red" }}
                className="error"
            >{error}</p>
        </>
    )
}

export default Login;