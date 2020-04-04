import React from "react";
import { Paper } from '@material-ui/core';

const RegisterCard = ({ name, description, onClick }: { name: string, description: string, onClick: () => void }) => {
    return (
        <Paper elevation={2} onClick={onClick}>
            <div>
                <h1>{name}</h1>
                <p>
                    {description}
                </p>
            </div>
        </Paper>
    );
}

export default RegisterCard;