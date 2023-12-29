import { Typography, ButtonGroup, Button } from "@mui/material";
import React, { Fragment, useState } from "react";
import "../../App.css";

const ExtraResurser = () => {

    const buttonsArray = [
        {
            text: "Ambulans",
            id: '1',
            count: 0
        },
        {
            text: "Akutbil/Jourläkarbil",
            id: '2',
            count: 0
        },
        {
            text: "HKP",
            id: '3',
            count: 0
        },
        {
            text: "Ledningsenhet",
            id: '4',
            count: 0
        },
        {
            text: "PAM",
            id: '5',
            count: 0
        },
        {
            text: "Sjuktransport",
            id: '6',
            count: 0
        },
        {
            text: "Transportambulans",
            id: '7',
            count: 0
        }
    ]

    const [buttons, setButtons] = useState(buttonsArray)

    function inc(count) {
        return count + 1
    }

    function dec(count) {
        return count - 1
    }

    function IncNum(id) {
        setButtons(
            buttons.map((button) => (button.id === id)
                ? {
                    ...button, count: inc(button.count)
                }
                : {
                    ...button
                }
            ))
    };

    function DecNum(id) {
        setButtons(
            buttons.map((button) => (button.id === id)
                ? {
                    ...button, count: dec(button.count)
                }
                : {
                    ...button
                }
            ))
    };

    return (
        <Fragment>
            <div className="container">
                <div className="labels">
                    <label>
                        Extra resurser:
                    </label>
                </div>
                <div className="input-tab">
                    {buttons.map(buttons => {
                        return (
                            <div key={buttons.id}
                                style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <ButtonGroup  sx={{ marginLeft: 0.5 }} aria-label="small outlined button group">
                                    <Button type="button" variant="outlined" onClick={() => { DecNum(buttons.id) }}>-</Button>
                                    <Button type="button" variant="outlined">{buttons.count}</Button>
                                    <Button type="button" variant="outlined" onClick={() => { IncNum(buttons.id) }}>+</Button>
                                </ButtonGroup>
                                <Typography sx={{ marginLeft: 2 }} variant={"body1"} id={buttons.id}>{buttons.text}</Typography>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default ExtraResurser;