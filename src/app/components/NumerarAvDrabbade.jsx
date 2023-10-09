import { ButtonGroup, Button } from "@mui/material";
import React, { Fragment, useState } from "react";

const NumerarAvDrabbade = () => {

    const [count, setCount] = useState(0);

    function IncNum() {
        setCount(count + 1);
        console.log(count);
    };

    function DecNum() {
        setCount(count - 1);
        console.log(count);
    };

    return (
        <Fragment>
            <div className="container">
                <div className="labels">
                <label>
                    Numerär av drabbade:
                </label>
            </div>
            <div className="input-tab">
                <ButtonGroup sx={{ marginLeft: 0.5 }} aria-label="small outlined button group">
                    <Button type="button" variant="outlined" onClick={() => { DecNum() }}>-</Button>
                    <Button type="button" variant="outlined">{count}</Button>
                    <Button type="button" variant="outlined" onClick={() => { IncNum() }}>+</Button>
                </ButtonGroup>
            </div>
            </div>
        </Fragment>
    );
};

export default NumerarAvDrabbade;