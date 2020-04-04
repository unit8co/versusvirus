import React, { useState } from "react";
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

export interface IState {
    printer: string | null;
    experience: string;
    hasPetG: boolean;
    abs: boolean;
    pla: boolean;
}

const ProviderRegisterForm = ({ user }: { user: any }) => {
    const options = [
        { value: 'hobbist', label: 'Hobbist' },
        { value: 'professional', label: 'Professional' },
    ];

    const [printer, setPrinter] = useState(undefined as unknown as string);
    const [experience, setExperience] = useState(options[0] as unknown as { value: string, label: string } | undefined);
    const [hasPetG, setHasPetG] = useState(false);
    const [hasAbs, setHasAbs] = useState(false);
    const [hasPla, setHasPla] = useState(false);
    const registerAsProvider = () => {
        console.log({
            user: user.uid,
            printer,
            experience: experience!.value,
            hasPetG,
            hasAbs,
            hasPla
        })
    }
    return (
        <div className="provider-register-form">
            <TextField
                label="Printer"
                defaultValue="Printer model"
                value={printer}
                onChange={(e) => setPrinter(e.currentTarget.value)} />
            <span> I am: </span>
            <Select
                value={experience}
                onChange={(a: any) => setExperience(a)}
                options={options}
            />
            <FormControlLabel
                control={<Checkbox checked={hasPetG} onChange={e => setHasPetG(e.currentTarget.checked)} />}
                label="PET-G"
            />
            <FormControlLabel
                control={<Checkbox checked={hasAbs} onChange={e => setHasAbs(e.currentTarget.checked)} />}
                label="ABS"
            />
            <FormControlLabel
                control={<Checkbox checked={hasPla} onChange={e => setHasPla(e.currentTarget.checked)} />}
                label="PLA"
            />
            <Button onClick={registerAsProvider}>Sign up</Button>
        </div>
    );

}

export default ProviderRegisterForm