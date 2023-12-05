import React, { useEffect, useState } from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Button from '@mui/material/Button';

import './style/tables.css';
import PreviewConfig from "../preview_config/PreviewConfig";

const VlanTable = ({ data }) => {



    const [rows, setRows] = useState(data);
    const [editingRow, setEditingRow] = useState(null);

    const [id_vlan, set_id_vlan] = useState([]);
    const [sorting_rows, set_sorting_rows] = useState([]);
    const [vl_number, set_vl_number] = useState('');
    const [vl_description, set_vl_description] = useState('');
    const [vl_ip, set_vl_ip] = useState('');
    const [page_table, set_page_table] = useState(1);

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
                setRows([...rows, new_row]);
                set_vl_number(''); set_vl_description(''); set_vl_ip('');


                break
            }
            else {
                alert('Такая херня уже существует!');
                set_vl_number(''); set_vl_description(''); set_vl_ip('');
            }
        }

        const sort_vlan = [...rows].sort((a, b) => a.id - b.id);
        set_sorting_rows([...sort_vlan]);
    }
    const set_page = (e) => {
        const { name } = e.target

        if (name === 'left') {
            if (page_table !== 1) {
                set_page_table(page_table - 1)
            }
        }
        if (name === 'right') {
            if (page_table !== count_pages) {
                set_page_table(page_table + 1)
            }
        }
    }

    let count_pages = Math.ceil(rows.length / 10);
    let range_table = [];

    let range_data = rows.map((el, i) => {
        return i % 10 === 0 ? rows.slice(i, i + 10) : [el];
    });
    range_data.map((range, i) => {
        if (i % 10 === 0) {
            range_table.push(range)
        }
    })

    // - [Обработчик перерисовки]
    // useEffect(() => {
    //     const local_storage = JSON.parse(localStorage.getItem('vlan_table'));
    //     console.log(local_storage)
    //     if (local_storage) {
    //         setRows(local_storage);
    //     }
    //
    //     for (const row of rows) {
    //         set_id_vlan([...id_vlan, row.id])
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     if (rows.length > 0) {
    //         localStorage.setItem('vlan_table', JSON.stringify(rows));
    //     }
    // }, [rows])

    // console.log(rows)
    return (
        <>
            <div className={'wrapper'}>
                <table className={'vlan_table'}>
                    <tr className={'vlan_table_header'}>
                        <td id={'col_1'}>Номер</td>
                        <td id={'col_2'}>Описание</td>
                        <td id={'col_3'}>IP Адрес</td>
                        <td id={'empty_col'}></td>
                        <td id={'empty_col'}></td>
                    </tr>
                    {
                        range_table[page_table - 1].map(v => (
                            v.id === editingRow ?
                                (<tr key={v.id} className={'vlan_table_rows_edit'}>
                                    <td>
                                        <input
                                            name="number"
                                            value={v.number}
                                            onChange={e => handleChange(e, v.id)}
                                            autoComplete="off"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="description"
                                            value={v.description}
                                            onChange={e => handleChange(e, v.id)}
                                            autoComplete="off"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="ipAddress"
                                            value={v.ipAddress}
                                            onChange={e => handleChange(e, v.id)}
                                            autoComplete="off"
                                        />
                                    </td>
                                    <td style={{width: '30px', border: 'none'}}>
                                        <CheckBoxOutlinedIcon
                                            onClick={stopEditing}
                                            style={{ color: '#27ae60', fontSize: 20, cursor: 'pointer'}}
                                        />
                                    </td>
                                </tr>) // - |Редактирование строки|
                                :
                                (<tr key={v.id} className={'vlan_table_rows'}>
                                    <td id={'col_1'}>{v.number}</td>
                                    <td id={'col_2'}>{v.description}</td>
                                    <td id={'col_3'}>{v.ipAddress}</td>

                                    <td id={'col_edit'} onClick={() => startEditing(v.id)}>
                                        <EditOutlinedIcon className={'EOI'}/>
                                    </td>
                                    <td id={'col_delete'} onClick={() => delete_row(v.id)}>
                                        <DeleteOutlineOutlinedIcon className={'DOOI'}/>
                                    </td>
                                </tr>) // - |Исходная строка|
                        ))
                    }
                    {   /* |Добавление новой строки| */
                        (page_table === count_pages || count_pages === 0) && (
                            <tr className={'vlan_table_rows_edit'}>
                                <td>
                                    <input
                                        name="number"
                                        onChange={handle_change_em_row}
                                        value={vl_number}
                                        autoComplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="description"
                                        type={'text'}
                                        onChange={handle_change_em_row}
                                        value={vl_description}
                                        autoComplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="ipAddress"
                                        onChange={handle_change_em_row}
                                        value={vl_ip}
                                        autoComplete="off"
                                    />
                                </td>
                                <td style={{width: '30px', border: 'none', paddingTop: '2px'}}>
                                    <AddBoxOutlinedIcon onClick={add_em_row} style={{color: '#2980b9', fontSize: 20, cursor: 'pointer'}}/>
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
            <div className={'pages_area'}>
                {
                    page_table !== 1 ?
                    <input
                        type={'button'}
                        value={'<'}
                        name={'left'}
                        onClick={set_page}
                        className={'arr_input'}
                    />
                    :
                    <input
                        type={'button'}
                        value={'<'}
                        name={'left'}
                        onClick={set_page}
                        className={'arr_input'}
                        disabled
                    />
                }

                <input
                    type={'button'}
                    className={'page_view'}
                    value={page_table}
                />

                {
                    page_table !== count_pages ?
                    <input
                        type={'button'}
                        value={'>'}
                        name={'right'}
                        onClick={set_page}
                        className={'arr_input'}
                    />
                    :
                    <input
                        type={'button'}
                        value={'>'}
                        name={'right'}
                        onClick={set_page}
                        className={'arr_input'}
                        disabled
                    />
                }
            </div>
        </>
    )
}

export default VlanTable;