import React, { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";

const NumerarAvDrabbade: React.FC = () => {

    const [count, setCount] = useState<number>(0);

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrementCount = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };

    return (
        <div className="container">
            <div className="labels">
                <label>Numerär av drabbade:</label>
            </div>
            <div className="input-tab">
                <ButtonGroup sx={{ marginLeft: 0.5 }} aria-label="small outlined button group">
                    <Button type="button" variant="outlined" onClick={decrementCount}>-</Button>
                    <Button type="button" variant="outlined">{count}</Button>
                    <Button type="button" variant="outlined" onClick={incrementCount}>+</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default NumerarAvDrabbade;