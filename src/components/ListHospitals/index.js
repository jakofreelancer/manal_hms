import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import "antd/dist/antd.css";
import { Table, Input, Button as ButtonAnt, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Excel } from "antd-table-saveas-excel";

const ListHospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const tempStorage = [];

    const fetchData = async () => {
        let hospitalsRef = db.collection("hospitals")
        let dataRef = await hospitalsRef.get();
        dataRef.docs.map(hospital => {
            let currentID = hospital.id;
            let dateCreated = hospital.data().createdDate.toDate();
            let dateModified = hospital.data().modifiedDate.toDate();
            dateCreated = dateCreated.getUTCDate()+"/"+(dateCreated.getMonth()+1)+"/"+dateCreated.getUTCFullYear();
            dateModified = dateModified.getUTCDate()+"/"+(dateModified.getMonth()+1)+"/"+dateModified.getUTCFullYear();
            let dataStorage = { 
                ...hospital.data(), 
                ['id']: currentID, 
                ['createdDateFormatted']: dateCreated,
                ['modifiedDateFormatted']: dateModified,
            };
            tempStorage.push(dataStorage);
        });

        setHospitals(tempStorage);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = dataIndex => {
        return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        // ref={node => { this.searchInput = node;}}
                        ref={ searchInput }
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ marginBottom: 8, display: "block" }} 
                    />
                    <Space>
                        <ButtonAnt 
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }} >
                            Search
                        </ButtonAnt>
                        <ButtonAnt onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                            Reset
                        </ButtonAnt>
                        <ButtonAnt 
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }} >
                            Filter
                        </ButtonAnt>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '',
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => searchInput.current.select(), 100);
                }
            },
            render: text =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "key",
            // width: "15%",
            ...getColumnSearchProps("id"),
        },
        {
            title: "Байг/Регистр",
            dataIndex: "orgRegNo",
            key: "key",
            // width: "15%",
            ...getColumnSearchProps("orgRegNo"),
        },
        {
            title: "Байг/Нэр",
            dataIndex: "hospitalName",
            key: "key",
            // width: "15%",
            ...getColumnSearchProps("hospitalName"),
        },
        {
            title: "Оффис имэйл",
            dataIndex: "hospEmail",
            key: "key",
            // width: "15%",
            ...getColumnSearchProps("hospEmail"),
        },
        {
            title: "Оффис утас",
            dataIndex: "officePhoneNo",
            key: "key",
            // width: "15%",
            ...getColumnSearchProps("officePhoneNo"),
        },
        {
            title: "Овог",
            dataIndex: "lname",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("lname"),
        },
        {
            title: "Нэр",
            dataIndex: "fname",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("fname"),
        },
        {
            title: "Имэйл",
            dataIndex: "email",
            key: "key",
            // width: "15%",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Утас",
            dataIndex: "phoneNo",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("phoneNo"),
        },
        {
            title: "Үүсгэсэн",
            dataIndex: "createdDateFormatted",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("createdDateFormatted"),
        },
        {
            title: "Өөрчилсөн",
            dataIndex: "modifiedDateFormatted",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("modifiedDateFormatted"),
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ flexDirection: "column", marginLeft: 10, marginRight: 10 }}>
            <ButtonAnt
                style={{ 
                    marginTop: 10, 
                    float: "right", 
                    marginRight: 10, 
                    backgroundColor: "#4cbbb9", 
                    borderColor: "#4cbbb9",
                    color: "white",
                    borderRadius: 5,
                }}
                onClick={() => {
                    const excel = new Excel();
                    excel
                        .addSheet("Sheet1")
                        .addColumns(columns)
                        .addDataSource(hospitals)
                        .saveAs("ListHospitals.xlsx")
                }} >
                Экспортлох
            </ButtonAnt>
            <Table
                dataSource={hospitals}
                columns={columns}
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240 }} exportable />
        </div>
    )
};

export default ListHospitals;