import { TextField } from "@mui/material";
import { useState } from "react";

const ExactLocalization = () => {
    const [message, setMessage] = useState('Initial value');

    const handleChange = (event) => setMessage(event.target.value);

    return (
        <div className="container">
            <div className="labels">
                <label>
                    Exact localization:
                </label>
            </div>
            <div className="input-tab">
                <TextField
                    id="message"
                    name="message"
                    type="text"
                    onChange={handleChange}
                    value={message}
                    variant="outlined"
                />

            </div>
        </div>
    );
};

export default ExactLocalization;