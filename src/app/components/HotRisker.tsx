import { Button } from "@mui/material";
import React, { FC, useState } from "react";

interface ButtonProps {
    text: string;
    id: string;
    variant: "outlined" | "text" | "contained";
}

const buttonLabels = ["Annan", "Brand", "Explosion", "Halka", "Inga", "Kyla", "Ras", "Rök/Gas", "Trafikfara", "Trängsel", "Våld"];

const initialButtons: ButtonProps[] = buttonLabels.map((text, index) => ({
    text,
    id: (index + 1).toString(),
    variant: 'outlined',
}));

const HotRisker: FC = () => {
    const [buttons, setButtons] = useState<ButtonProps[]>(initialButtons);

    const handleClick = (id: string): void => {
        setButtons(
            buttons.map((button) =>
                button.id === id
                    ? { ...button, variant: button.variant === "contained" ? "outlined" : "contained" }
                    : button
            )
        );
    };

    return (
        <div className="container">
            <div className="labels">
                <label>
                    Hot/Risker:
                </label>
            </div>
            <div className="input-tab">
                {buttons.map(button => (
                    <Button
                        key={"HotRisker" + button.id}
                        sx={{ m: 0.5 }}
                        id={"HotRisker" + button.id}
                        type="button"
                        variant={button.variant}
                        onClick={() => handleClick(button.id)}
                    >
                        {button.text}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default HotRisker;