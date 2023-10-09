import { TextField } from "@mui/material";
import { Fragment } from "react";

const ExaktLokalisation = () => {

    return (
        <Fragment>
            <div className="container">
                <div className="labels">
                    <label>
                        Exakt lokalisation:
                    </label>
                </div>
                <div className="input-tab">
                    <TextField id="outlined-basic" text variant="outlined" value="Vanadingatan 7"></TextField>
                </div>
            </div>
        </Fragment>
    );
};

export default ExaktLokalisation;