import React, { useEffect, useState } from "react";

const DataTable = props => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // const script = document.createElement("script");
        // script.src = "js/init_datatable.js";
        // script.async = true;
        // document.body.appendChild(script);
        // console.log("script", script);
        const script = document.createElement("script");
        script.src = "js/init_datatable.js";
        script.async = true;
        console.log("document", document.body);
        
        const fetchMyAPI = async () => {
            let response = await fetch("https://1234.mn/api/courses/last-lessons")
            response = await response.json()
            await document.body.appendChild(script);
            console.log("document2", document.body);
            setData(response);
            // console.log("axios data", data, response);
        }
    
        fetchMyAPI();

        // setData(props.data);
        console.log("props data", props.data);
        console.log("props data local state", data);
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">DataTable with default features</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
                {/* {JSON.stringify} */}
                <table id="example1" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Rendering engine</th>
                            <th>Browser</th>
                            <th>Platform(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map( el => (
                            <tr key={el.id}>
                                <td>{ el.course }</td>
                                <td>{ el.video_add_date }</td>
                                <td>{ el.show_order }</td>
                            </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Rendering engine</th>
                            <th>Browser</th>
                            <th>Platform(s)</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default DataTable;