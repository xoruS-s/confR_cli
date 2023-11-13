import React, {useEffect, useState} from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import './style/tables.css';

// const VlanTable = ({ data }) => {
//     const [rows, setRows] = useState(data);
//     const delete_row = (number) => {
//         const newRows = rows.filter(row => row.number !== number);
//         setRows(newRows)
//     }
//
//     return (
//         <table className={'UC_vlan_table'}>
//             <caption>VLAN Таблица</caption>
//             <tr className={'UC_vlan_table_header'}>
//                 <td>Номер</td> <td>Описание</td> <td>IP Адрес</td>
//             </tr>
//             {
//                 rows.map(row => (
//                     <tr className={'UC_vlan_table_row'} key={row.number}>
//                         <td className={'UC_vlan_table_cell'}>{row.number}</td>
//                         <td className={'UC_vlan_table_cell'}>{row.description}</td>
//                         <td className={'UC_vlan_table_cell'}>{row.ipAddress}</td>
//                         <td style={{ width: '30px', border: 'none' }}><EditOutlinedIcon style={{ color: '#7f8c8d', fontSize: 20, cursor: 'pointer' }}/></td>
//                         <td style={{ width: '30px', border: 'none'  }}><DeleteOutlineOutlinedIcon onClick={() => delete_row(row.number)} style={{ color: '#c0392b', fontSize: 20, cursor: 'pointer' }}/></td>
//                     </tr>
//                 ))
//             }
//         </table>
//     )
// };

const VlanTable = ({ data }) => {
    const [rows, setRows] = useState(data);
    const [editingRow, setEditingRow] = useState(null);
    const [new_row, set_new_row] = useState([]);
    const [id, set_id] = useState(Number);

    const delete_row = (id) => {
        const newRows = rows.filter(row => row.id !== id);
        setRows(newRows)
    }
    const startEditing = (rowId) => {
        if (editingRow === rowId) {
            return
        }
        setEditingRow(rowId);
    }
    const stopEditing = () => {
        setEditingRow(null);
    }
    const handleChange = (e, rowId) => {
        const { name, value } = e.target;
        setRows(rows => {
            const rowIndex = rows.findIndex(r => r.id === rowId);
            const updatedRow = {
                ...rows[rowIndex],
                [name]: value
            };
            return [
                ...rows.slice(0, rowIndex),
                updatedRow,
                ...rows.slice(rowIndex + 1)
            ];
        });
    }

    const handle_change_new_row = (e) => {
        const { name, value } = e.target;

        if (name === 'number') {
            set_id(value);
        }

        const data = {
            ...new_row,
            id: '',
            [name]: value
        }
        set_new_row(data);
    }

    const add_new_row = () => {
        new_row.id = id;
        setRows([...rows, new_row]);
        set_new_row([{ id: '', number: '', description: '', ipAddress: '' }])
    }

    return (
        <table className={'UC_vlan_table'}>
            <caption>VLAN Таблица</caption>
            <tr className={'UC_vlan_table_header'}>
                <td>Номер</td> <td>Описание</td> <td>IP Адрес</td>
            </tr>
            { rows.map(row => {
                    if (row.id === editingRow) {
                        return (
                            <tr key={row.id} className={'vlan_table_input'}>
                                <td>
                                    <input
                                        name="number"
                                        value={row.number}
                                        onChange={e => handleChange(e, row.id)}
                                        autocomplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="description"
                                        value={row.description}
                                        onChange={e => handleChange(e, row.id)}
                                        autocomplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="ipAddress"
                                        value={row.ipAddress}
                                        onChange={e => handleChange(e, row.id)}
                                        autocomplete="off"
                                    />
                                </td>
                                <td style={{ width: '30px', border: 'none' }}>
                                    <CheckBoxOutlinedIcon onClick={stopEditing} style={{ color: '#27ae60', fontSize: 20, cursor: 'pointer' }}/>
                                </td>
                            </tr>
                        );
                    }
                    return (
                        <>
                            <tr className={'UC_vlan_table_row'} key={row.number}>
                                <td className={'UC_vlan_table_cell'}>{row.number}</td>
                                <td className={'UC_vlan_table_cell'}>{row.description}</td>
                                <td className={'UC_vlan_table_cell'}>{row.ipAddress}</td>
                                <td style={{width: '30px', border: 'none', cursor: 'pointer'}} className={'td_edit_btn'}
                                    onClick={() => { startEditing(row.id) }}><EditOutlinedIcon
                                    className={'edit_btn'}
                                    style={{color: '#7f8c8d', fontSize: 20}}/></td>
                                <td
                                    style={{width: '30px', border: 'none', cursor: 'pointer' }}
                                    className={'td_del_btn'}
                                    onClick={() => delete_row(row.id)}>
                                    <DeleteOutlineOutlinedIcon
                                        className={'del_btn'}
                                        style={{color: '#c0392b', fontSize: 20 }}
                                    />
                                </td>
                            </tr>
                        </>
                    )
                }) }
            <tr className={'vlan_table_input'}>
                <td>
                    <input name="number"
                           onChange={e => handle_change_new_row(e)}
                           value={new_row.number}
                           autoComplete="off"/>
                </td>
                <td>
                    <input name="description"
                           type={'text'}
                           onChange={e => handle_change_new_row(e)}
                           autoComplete="off"/>
                </td>
                <td>
                    <input name="ipAddress"
                           onChange={e => handle_change_new_row(e)}
                           autoComplete="off"/>
                </td>
                <td style={{width: '30px', border: 'none'}}>
                    <AddBoxOutlinedIcon onClick={add_new_row} style={{color: '#2980b9', fontSize: 20, cursor: 'pointer'}}/>
                </td>
            </tr>

        </table>
    )
};

// const [inputValues, setInputValues] = useState({ id: '', number: '', description: '', ipAddress: '' });
// const handleInputChange = (index, value) => {
//     setInputValues((prevValues) => {
//         const newValues = [...prevValues];
//         newValues[index] = value;
//         return newValues;
//     });
// };
// const addInputValue = () => {
//     setRows((prevData) => {
//         const newData = [...prevData];
//         if (inputValues.length > 2) {
//             newData.push(inputValues);
//             setInputValues([]);
//         } else {
//             for (let i = 0; i < inputValues.length; i++) {
//                 newData[newData.length - 1][i] = inputValues[i];
//             }
//         }
//         return newData;
//     });
// }
// // const add_row = (new_row) => {
// //     setRows(rows => [...rows, new_row])
// // }
// const test_value_input = (e) => {
//     const { name, value } = e.target;
//     setInputValues((prevState) => ({
//         ...prevState,
//         id: name === "number" ? value : '',
//         [name]: value
//     }));
// }
// const add_test_value = () => {
//     setRows(...rows, inputValues)
// }

export default VlanTable;
