import { TextField } from "@mui/material";
import Methane from "../classes/Methane";

const ExactLocationComponent: React.FC<{ methane: Methane, onChange: (value: Methane) => void }> = ({ methane, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...methane, exact_location: e.target.value });
    };
    return (
        <div className='container'>
                <TextField
                    fullWidth
                    focused
                    id="message"
                    name="met"
                    type="text"
                    variant="outlined"
                    value={methane.exact_location}
                    onChange={handleChange}
                />
            </div>
    );
};

export default ExactLocationComponent;