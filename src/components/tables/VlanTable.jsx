import React, { useEffect, useState } from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Button from '@mui/material/Button';

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
    // const [new_row, set_new_row] = useState([]);
    // const [id, set_id] = useState(Number);

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
    // const handle_change_new_row = (e) => {
    //     const { name, value } = e.target;
    //
    //     if (name === 'number') {
    //         set_id(value);
    //     }
    //
    //     const data = {
    //         ...new_row,
    //         id: '',
    //         [name]: value
    //     }
    //     set_new_row(data);
    // }
    // const add_new_row = () => {
    //     new_row.id = id;
    //     setRows([...rows, new_row]);
    //     set_new_row([{ id: '', number: '', description: '', ipAddress: '' }])
    // }

    const [vl_number, set_vl_number] = useState('');
    const [vl_description, set_vl_description] = useState('');
    const [vl_ip, set_vl_ip] = useState('');
    const [isExists, setIsExists] = useState(false);

    const handle_change_em_row = (e) => {
        const { name, value } = e.target

        switch (name) {
            case ('number'):
                set_vl_number(value)
                break
            case ('description'):
                set_vl_description(value)
                break
            case ('ipAddress'):
                set_vl_ip(value)
                break
        }
    }
    const add_em_row = () => {
        const new_row = {
            id: vl_number,
            number: vl_number,
            description: vl_description,
            ipAddress: vl_ip
        }

        for (const row of rows) {
            if (new_row.id !== row.id) {
                setRows([...rows, new_row])
            } else {
                alert('Такой номер vlan уже существует!');
                setIsExists(true);
            }
        }

        set_vl_number(''); set_vl_description(''); set_vl_ip('');
    }

     return (
        <>
            <table className={'UC_vlan_table'}>
                <caption>VLAN Таблица</caption>
                <tr className={'UC_vlan_table_header'}>
                    <td>Номер</td>
                    <td>Описание</td>
                    <td>IP Адрес</td>
                </tr>
                {rows.map(row => {
                    if (row.id === editingRow) {
                        return (
                            <tr key={row.id} className={'vlan_table_input'}>
                                <td>
                                    <input
                                        name="number"
                                        value={row.number}
                                        onChange={e => handleChange(e, row.id)}
                                        autoComplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="description"
                                        value={row.description}
                                        onChange={e => handleChange(e, row.id)}
                                        autoComplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="ipAddress"
                                        value={row.ipAddress}
                                        onChange={e => handleChange(e, row.id)}
                                        autoComplete="off"
                                    />
                                </td>
                                <td style={{width: '30px', border: 'none'}}>
                                    <CheckBoxOutlinedIcon onClick={stopEditing}
                                                          style={{color: '#27ae60', fontSize: 20, cursor: 'pointer'}}/>
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
                                    onClick={() => {
                                        startEditing(row.id)
                                    }}><EditOutlinedIcon
                                    className={'edit_btn'}
                                    style={{color: '#7f8c8d', fontSize: 20}}/></td>
                                <td
                                    style={{width: '30px', border: 'none', cursor: 'pointer'}}
                                    className={'td_del_btn'}
                                    onClick={() => delete_row(row.id)}>
                                    <DeleteOutlineOutlinedIcon
                                        className={'del_btn'}
                                        style={{color: '#c0392b', fontSize: 20}}
                                    />
                                </td>
                            </tr>
                        </>
                    )
                })}
                <tr className={'vlan_table_input'}>
                    <td>
                        <input name="number"
                               onChange={handle_change_em_row}
                               value={vl_number}
                               autoComplete="off"/>
                    </td>
                    <td>
                        <input name="description"
                               type={'text'}
                               onChange={handle_change_em_row}
                               value={vl_description}
                               autoComplete="off"/>
                    </td>
                    <td>
                        <input name="ipAddress"
                               onChange={handle_change_em_row}
                               value={vl_ip}
                               autoComplete="off"/>
                    </td>
                    <td style={{width: '30px', border: 'none'}}>
                        <AddBoxOutlinedIcon onClick={add_em_row}
                                            style={{color: '#2980b9', fontSize: 20, cursor: 'pointer'}}/>
                    </td>
                </tr>

            </table>
            <Button style={{ backgroundColor: '#27ae60'}} variant="contained">
                Сохранить
            </Button>
            {
                rows.map(row => (
                    <div style={{ fontFamily: 'Consoles, sans-serif' }}>
                        <span style={{whiteSpace: 'pre-line'}}>
                            interface vlan {row.number}<br/>
                            {row.description !== '' && (
                                <>
                                    name {row.description}<br/>
                                </>
                            )}
                            {row.ipAddress !== '' && (
                                <>
                                    ip address {row.ipAddress}<br/>
                                </>
                            )}
                            !
                        </span>
                    </div>
                ))
            }
        </>
    )
}

export default VlanTable;
