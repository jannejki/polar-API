import { FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const Settings = () => {
    const [settings, setSettings] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const saveSettings = async (newSettings) => {
        try {

            const rsp = await axios.post('/web/user/settings', newSettings, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
        } catch (error) {
            alert(error);
        }
    }

    const switchHandler = async (e) => {
        // send settings state to db using axios post
        setSettings({ ...settings, [e.target.name]: JSON.stringify(e.target.checked) });

        await saveSettings({ ...settings, [e.target.name]: JSON.stringify(e.target.checked) });

    }

    const fetchSettings = async () => {
        setIsLoading(true);
        const res = await axios('/web/user/settings', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        setSettings({ AUTOSAVE: res.data.AUTOSAVE });
        setIsLoading(false);
    }

    useEffect(() => {
        // load settings from db
        fetchSettings();
    }, []);

    return (
        <section className='overlay container-sm'>
            <h1>Settings</h1>
            {isLoading ? <h2>Loading...</h2> : (
                <div className='d-flex flex-wrap'>
                    <FormControlLabel
                        control={<Switch checked={JSON.parse(settings.AUTOSAVE) || false} onChange={(e) => switchHandler(e)} />}
                        name='AUTOSAVE'
                        label="Autosave data"
                        labelPlacement="top"
                    />
                </div>
            )}
        </section>
    )
}

export default Settings;

