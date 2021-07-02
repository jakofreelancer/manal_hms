import React, { useEffect } from "react";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDFIncome = props => {
    useEffect(() => {
        // console.log("INITIAL CALL", props.data[0].departmentEmail);
    }, []);

    return (
        <>
            <div className="Post" ref={ref}>
                {props.data[0].departmentEmail}
            </div>
        </>
    );
}

export default PDFIncome;