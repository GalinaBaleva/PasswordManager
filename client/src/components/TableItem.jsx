import { Link } from 'react-router-dom';
import './TableItem.css';
import { useState } from 'react';
import { get, post } from '../shared/api';

const TableItem = (props) => {
    const [pass, setPass] = useState('');

    const viewHandler = async () => {
        const response = await get('/passwords/' + props.id)

        if (response.status !== 200) {
            return;
        }

        const {data} = response;
        setPass(data.message);
    }

    const deleteHandler = async(e) => {
        e.preventDefault();
        const response = await get('/passwords/delete/'+ props.id);
        props.setItemDel([true]);
    }

    return (
        <tr id={props.id}>
            <td>{props.plattform}</td>
            <td>{props.benutzername}</td>
            <td>
                <div className='passField'>
                    <p>{pass.length === 0 ? props.passwort : pass}</p>
                    <Link onClick={viewHandler}><i className="fa-solid fa-eye show"></i></Link>
                </div>
            </td>
            <td><a href='/' onClick={deleteHandler}>löschen</a></td>
        </tr>
    )
}

export default TableItem;