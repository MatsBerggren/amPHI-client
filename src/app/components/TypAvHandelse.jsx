import { Button } from "@mui/material";
import React, { Fragment, useState } from "react";

const TypAvHandelse = () => {

    const buttonsArray = [
        {
            text: "Annan",
            id: '1',
            variant: 'outlined'
        },
        {
            text: "Brand",
            id: '2',
            variant: 'outlined'
        },
        {
            text: "Explosion",
            id: '3',
            variant: 'outlined'
        },
        {
            text: "Farligt gods",
            id: '4',
            variant: 'outlined'
        },
        {
            text: "Flygolycka",
            id: '5',
            variant: 'outlined'
        },
        {
            text: "Hot",
            id: '6',
            variant: 'outlined'
        },
        {
            text: "Ras",
            id: '7',
            variant: 'outlined'
        },
        {
            text: "Sjöolycka",
            id: '8',
            variant: 'outlined'
        },
        {
            text: "Trafikolycka",
            id: '9',
            variant: 'outlined'
        },
        {
            text: "Tågolycka",
            id: '10',
            variant: 'outlined'
        },
        {
            text: "Våld",
            id: '11',
            variant: 'outlined'
        }
    ]

    const [buttons, setButtons] = useState(buttonsArray)

    function toggleVariant(variant) {
        if (variant === "contained") {
            return "outlined"
        } else {
            return "contained"
        }
    }

    function handleClick(id) {
        setButtons(
            buttons.map((button) => (button.id === id)
                ? {
                    ...button, variant: toggleVariant(button.variant)
                }
                : {
                    ...button
                }
            ))
    }

    return (
        <Fragment>
            <div className="container">
                <div className="labels">
                    <label>
                        Typ av händelse:
                    </label>
                </div>
                <div className="input-tab">
                    {buttons.map(buttons => {
                        return (
                            <Button
                                sx={{ m: 0.5 }}
                                id={buttons.id}
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

export default TypAvHandelse;