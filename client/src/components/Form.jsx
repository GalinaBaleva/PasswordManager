import { useState } from 'react';
import { post } from '../shared/api';
import './Form.css';

const Form = (props) => {
    const [formData, setFormData] = useState({
        plattform: "",
        benutzername: "",
        passwort: ""
    })

    const [err, setErr] = useState('');

    const changeHandler = (e) => {
        setErr('');
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (formData.plattform.length < 4 || formData.benutzername.length < 4 || formData.passwort.length < 4) {
            setErr('Alle Felder sind Pflichtfelder und die Mindestlänge beträgt 4 Zeichen!');
            return;
        }
        const response = await post('/passwords', formData)

        props.newPass(false);
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="plattform">Plattform/Anwendung</label>
            <input
                type="text"
                name="plattform"
                value={formData.plattform}
                onChange={changeHandler}
                required
            />
            <label htmlFor="benutzername">Benutzername</label>
            <input
                type="text"
                name="benutzername"
                value={formData.benutzername}
                onChange={changeHandler}
                required
            />
            <label htmlFor="passwort">Passwort</label>
            <input
                type="password"
                name="passwort"
                value={formData.passwort}
                onChange={changeHandler}
                required
            />
            <p style={{"color": "red"}}>{err}</p>
            <button type="submit">Anlegen</button>
        </form>
    )
}

export default Form;