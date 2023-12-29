import { TextField } from "@mui/material";
import { Fragment } from "react";

const ExaktLokalisation = () => {

    return (
        <Fragment>
            <div className="container">
                <div className="labels">
                    <label>
                        Exakt lokalisation:
                    <TextField id="outlined-basic" text="true" variant="outlined" value="Fogdemyrsgatan 3"></TextField>
                    </label>
                </div>
            </div>
        </Fragment>
    );
};

export default ExaktLokalisation;