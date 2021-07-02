import React, { useEffect, useContext, useState, useRef } from "react";
import { db } from "../../firebase";
import "antd/dist/antd.css";
import { Table, Input, Button as ButtonAnt, Space, Form } from "antd";
import { SearchOutlined, WindowsFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Excel } from "antd-table-saveas-excel";
import { Redirect } from "react-router";
const EditableContext = React.createContext(null);

const ListEmployees = () => {
    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);
        
        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };
        
        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };
        
        let childNode = children;
        
        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                        required: true,
                        message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }
    
        return <td {...restProps}>{childNode}</td>;
    };

    const [employees, setEmployees] = useState(null);
    const [fetchedEmployees, setFetchedEmployees] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [oldDataStorage, setOldDataStorage] = useState(null);
    const searchInput = useRef(null);
    const tempStorage = [];

    const returnPermissionDescription = text => {
        switch(text) {
            case "doctor": return("Эмч")
            case "admin": return("Эрхлэгч")
            case "reception": return("Ресепшн")
            case "systemadmin": return ("Систем Админ")
            default: return (null)
        }
    }

    const fetchData = async () => {
        let employeesRef = db.collection("employees")
        let dataRef = await employeesRef.get();
        dataRef.docs.map(employee => {
            let currentID = employee.id;
            
            // ажилтны эрхүүдийг харуулах
            var rawPermissions = Object.entries(employee.data().permission).filter(([key, value]) => value == true)
            var clrPermissions = [];
            for(var x=0; x<rawPermissions.length; x++) {
                clrPermissions.push(returnPermissionDescription(rawPermissions[x][0])+",");
            }

            let dateCreated = employee.data().createdDate.toDate();
            let dateModified = employee.data().modifiedDate.toDate();
            dateCreated = dateCreated.getUTCDate()+"/"+(dateCreated.getMonth()+1)+"/"+dateCreated.getUTCFullYear();
            dateModified = dateModified.getUTCDate()+"/"+(dateModified.getMonth()+1)+"/"+dateModified.getUTCFullYear();
            let dataStorage = { 
                ...employee.data(), 
                ['id']: currentID, 
                ['createdDateFormatted']: dateCreated,
                ['modifiedDateFormatted']: dateModified,
                ['permissionClr']: clrPermissions,
            };

            if(dataStorage.email.toLowerCase() !== "systemadmin@gmail.com")
                tempStorage.push(dataStorage);
        });

        setEmployees(tempStorage);
        setOldDataStorage(tempStorage);
        console.log("tempStorage", tempStorage);
    };

    const updateEmployee = (changes, old, latest) => {
        var uId = changes["uId"];
        console.log("all changes", changes);
        console.log("update uId", uId);
        delete changes["uId"];
        changes["modifiedDate"] = new Date();
        console.log("data", changes);

        let employeesRef = db.collection("employees")
        // let dataRef = await employeesRef.get();
        // employeesRef.where("uId", "==", uId).get().then
        console.log("update change", changes);
        console.log("check", {...employees, changes});
        employeesRef.doc(uId).update(changes)
            .then(() => {
                setEmployees(changes);
                alert("Updated!!!");
            })
            .catch((error) => {
                alert("error occured!!!"+error);
            })
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const diff = (obj1, obj2) => {
        const result = {};
        if (Object.is(obj1, obj2)) {
            return undefined;
        }
        if (!obj2 || typeof obj2 !== 'object') {
            return obj2;
        }
        Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
            if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
                result[key] = obj2[key];
                result["uId"] = obj2["uId"];
            }
            if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
                const value = diff(obj1[key], obj2[key]);
                if (value !== undefined) {
                    result[key] = value;
                }
            }
        });
        return result;
    }

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText("");
    };

    const handleSave = (row) => {
        console.log("old", [...oldDataStorage]);
        const newData = [...employees];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEmployees(newData);
        // console.log("new", newData);
        // console.log("oldDataStorage", oldDataStorage);
        console.log("diff", diff([...oldDataStorage], newData));
        // console.log("diff", diff(oldDataStorage, newData)[0]);
        // console.log("diff check", diff(oldDataStorage, newData)[0].hasOwnProperty("description"));
        var changes = diff([...oldDataStorage], newData)[0];
        console.log("changes=>", changes);
        updateEmployee(changes, [...oldDataStorage], newData);

        // 2 өөр мэдээллийн хэсгийг өөрчлөх үед хүснэгт эвдэрч байгаа
        // if(diff([...oldDataStorage], newData)[0].hasOwnProperty("description") === true) {
        //     window.location.reload(true);
        //     alert("Нэг удаад зөвхөн нэг л хүний мэдээллийг шинэчилнэ үү!");
        // }
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
                            Шүүх
                        </ButtonAnt>
                        <ButtonAnt onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                            Арилгах
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

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columnsOld = [
        // {
        //     title: "ID",
        //     dataIndex: "id",
        //     key: "key",
        //     width: "15%",
        //     ...getColumnSearchProps("id"),
        // },
        {
            title: "Имэйл",
            dataIndex: "email",
            key: "key",
            // width: "15%",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Овог",
            dataIndex: "lname",
            key: "key",
            // width: "10%",
            editable: true,
            ...getColumnSearchProps("lname"),
        },
        {
            title: "Нэр",
            dataIndex: "fname",
            key: "key",
            // width: "10%",
            editable: true,
            ...getColumnSearchProps("fname"),
        },
        {
            title: "Регистр",
            dataIndex: "regNo",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("regNo"),
        },
        {
            title: "Утас",
            dataIndex: "phoneNo",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("phoneNo"),
        },
        {
            title: "Эрх",
            dataIndex: "permissionClr",
            key: "key",
            // width: "10%",
            ...getColumnSearchProps("permissionClr"),
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

    const columns = columnsOld.map((col) => {
        if (!col.editable) {
            return col;
        }
    
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    })

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ flexDirection: "column", marginLeft: 10, marginRight: 10 }}>
            <ButtonAnt>
                Баримт хэвлэх
            </ButtonAnt>
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
                        .addSheet("test")
                        .addColumns(columns)
                        .addDataSource(employees)
                        .saveAs("ListEmployees.xlsx")
                }} >
                Экспортлох
            </ButtonAnt>
            <Table
                dataSource={employees}
                columns={columns}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240 }} exportable />
        </div>
    )
};

export default ListEmployees;