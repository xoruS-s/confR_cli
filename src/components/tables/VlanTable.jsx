import React, { useEffect, useState } from 'react';
import { v4 } from "uuid";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Button from '@mui/material/Button';

import './style/tables.css';


const VlanTable = ({ data }) => {
    // - [Очистка localStorage]
    window.addEventListener('beforeunload', e => {
        localStorage.clear();
    });

    // - [Обновление данных]
    const local_storage = JSON.parse(localStorage.getItem('vlan_table'));
    const [rows, set_rows] = useState(local_storage ? local_storage : data);

    // - [Обработчик данных новой строки]
    const [new_row, set_new_row] = useState({});
    const handler_new_row = (e) => {
        const { name, value } = e.target;

        set_new_row({
            ...new_row,
            id: v4(),
            [name]: value
        })
    }

    // - [Добавление новой строки]
    const add_row = () => { //TODO:[.30]
        set_rows([...rows, new_row]);
        set_new_row({
            number: '',
            description: '',
            ip: ''
        }); // - [Обнуление новой строки]
    }

    // - [Подсчет кол-ва страниц, распределение элементов, пагинация]
    const [page_table, set_page_table] = useState(1);
    const count_pages = Math.ceil(rows.length / 10);
    const range_table = []; // - основная (постраничная)
    const range_data = rows.map((el, i) => {
        return i % 10 === 0 ? rows.slice(i, i + 10) : [el];
    });
    const set_page = (e) => {
        const { name } = e.target;

        switch (name) {
            case 'left':
                if (page_table !== 1) {
                    set_page_table(page_table - 1)
                }
                break;
            case 'right':
                if (page_table !== count_pages) {
                    set_page_table(page_table + 1)
                }
                break;
            default:
                break;
        }
    }
    range_data.map((range, i) => {
        if (i % 10 === 0) {
            return range_table.push(range)
        }
    })

    // - [Редактирование строк]
    const [editingRow, setEditingRow] = useState(null);
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
        set_rows(rows => {
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

    // - [Удаление строк]
    const delete_row = (id) => {
        const newRows = rows.filter(row => row.id !== id);
        set_rows(newRows)
    }

    // - [Обработчик перерисовки]
    useEffect(() => {
        if (rows.length > 0 || rows !== data) {
            localStorage.setItem('vlan_table', JSON.stringify(rows));
        }
    }, [rows])



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
                                            name="ip"
                                            value={v.ip}
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
                                    <td id={'col_3'}>{v.ip}</td>

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
                                        type={'text'}
                                        onChange={e => handler_new_row(e)}
                                        value={ new_row !== null ? new_row.number : '' }
                                        autoComplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="description"
                                        type={'text'}
                                        onChange={e => handler_new_row(e)}
                                        value={ new_row !== null ? new_row.description : '' }
                                        autoComplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        name="ip"
                                        type={'text'}
                                        onChange={e => handler_new_row(e)}
                                        value={ new_row !== null ? new_row.ip : '' }
                                        autoComplete="off"
                                    />
                                </td>
                                <td id={'col_add'}>
                                    <AddBoxOutlinedIcon
                                        id={'btn_add'}
                                        onClick={ add_row }
                                    />
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
                        value={'❮'}
                        name={'left'}
                        onClick={set_page}
                        className={'arr_input'}
                    />
                    :
                    <input
                        type={'button'}
                        value={'❮'}
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
                        value={'❯'}
                        name={'right'}
                        onClick={set_page}
                        className={'arr_input'}
                    />
                    :
                    <input
                        type={'button'}
                        value={'❯'}
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