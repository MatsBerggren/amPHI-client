import { Button } from "@mui/material";
import React, { Fragment, useState } from "react";

const AnkomstvagHindrad = () => {

    const buttonsArray = [
        {
            text: "Ja",
            id: '1',
            variant: 'outlined'
        },
        {
            text: "Nej",
            id: '2',
            variant: 'outlined'
        }
    ]

    const [buttons, setButtons] = useState(buttonsArray)

    function handleClick(id) {
        setButtons(
            buttons.map((button) => (button.id === id)
                ? {
                    ...button, variant: "contained"
                }
                : {
                    ...button, variant: "outlined"
                }
            )
        )
    }

    return (
        <Fragment>
            <div className="container">
                <div className="labels">
                    <label>
                        Ankomstväg hindrad:
                    </label>
                </div>
                <div className="input-tab">
                    {buttons.map(buttons => {
                        return (
                            <Button
                                key={"AnkomstvagHindrad" + buttons.id}
                                sx={{ m: 0.5 }}
                                id={"AnkomstvagHindrad" + buttons.id}
                                type="button"
                                variant={buttons.variant}
                                onClick={() => { handleClick(buttons.id) }}
                            >
                                {buttons.text}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default AnkomstvagHindrad;