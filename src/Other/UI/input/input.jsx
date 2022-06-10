import React from "react";
import classes from "./input.module.css";

const Inputon = React.forwardRef((props, ref) => {
    return (
        <div>
            <input ref={ref} {...props} className={classes.input}></input>
        </div>
    );
});
export default Inputon;