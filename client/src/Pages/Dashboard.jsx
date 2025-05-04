import { use, useEffect, useState } from "react";
import './Dashboard.css'
import TableItem from "../components/TableItem";
import { get } from "../shared/api";
import Form from "../components/Form";

const Dashboard = () => {
    const [newPass, setNewPass] = useState(false);
    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const { data } = await get('/passwords');

            setItems(data);
        }

        getItems();
    }, [items, refresh])

    const newDataButtonHandler = () => {
        setNewPass(true);
    }
    return (
        <>
            {!newPass
                ? <>
                    <table>
                        <thead>
                            <tr>
                                <th>Plattform/Anwendung</th>
                                <th>Benutzername</th>
                                <th>Passwort</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(i => <TableItem
                                key={i.id}
                                id={i.id}
                                plattform={i.plattform}
                                benutzername={i.benutzername}
                                passwort={i.passwort}
                                setItemDel={setRefresh}

                            />)}
                        </tbody>
                    </table>
                    <button
                        className="newPage"
                        onClick={newDataButtonHandler}
                    >Neue Zugangsdaten anlegen</button></>
                :
                <Form newPass={setNewPass}/>
            }

        </>
    )
}

export default Dashboard;