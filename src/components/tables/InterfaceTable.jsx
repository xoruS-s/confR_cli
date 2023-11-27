import React, {useEffect, useState} from 'react';
import { Icon } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const InterfaceTable = ({ data }) => {
    // - [Обновление данных]
    const [rows, set_rows] = useState(data)

    // - [Подсчет количества страниц, распределение элементов, пагинация]
    const [page_table, set_page_table] = useState(1);
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
    let range_table = []; // - основная (по страничная)
    let range_data = rows.map((el, i) => {
        return i % 10 === 0 ? rows.slice(i, i + 10) : [el];
    });
    range_data.map((range, i) => {
        if (i % 10 === 0) {
            range_table.push(range)
        }
    })

    // - [Удаление строк]
    const delete_row = (id) => {
        const new_rows = rows.filter(row => row.id !== id);
        set_rows(new_rows)
    }

    // - [Изменение строк]
    const [editing_row, set_editing_row] = useState(null);
    const start_editing = (row_id) => {
        if (editing_row === row_id) {
            return
        }
        set_editing_row(row_id);
    }
    const stop_editing = () => {
        set_editing_row(null);

        // - Проверка на совпадения id и number, добавление нового id
        for (const row of rows) {
            if (row.id !== undefined) {
                if (row.number !== row.id) {
                    row.id = row.number
                }
            }
            else {
                Object.assign(row, {id: row.number})
            }
        }
    }
    const handle_change_editing = (e, row_id) => {
        const { name, value, checked, type } = e.target;

        set_rows(rows => {
            const rowIndex = rows.findIndex(r => r.id === row_id);
            if (type === 'checkbox') {
                const updatedRow = {
                    ...rows[rowIndex],
                    [name]: checked
                };
                return [
                    ...rows.slice(0, rowIndex),
                    updatedRow,
                    ...rows.slice(rowIndex + 1)
                ];
            }
            else {
                const updatedRow = {
                    ...rows[rowIndex],
                    [name]: value
                };
                return [
                    ...rows.slice(0, rowIndex),
                    updatedRow,
                    ...rows.slice(rowIndex + 1)
                ];
            }
        });
    }

    // - [Новая пустая строка]
    const add_empty_row = () => { //TODO:[19]
        const new_data = rows.concat({})
        set_rows(new_data)
        set_page_table(count_pages)
    }

    // - [Обработчик выделения всех строк]
    const [rows_checked, set_rows_checked] = useState([]);
    const check_all_rows = async (e) => {
        const { name, checked } = e.target

        if (name === 'check_row_header') {
            if (checked) {
                for (const row of rows) {
                    const row_check = {
                        id: row.id,
                        checked: true
                    }
                }
            }
        }
    }
    const handle_check_all_rows = (e, id_row) => {
        const { name, checked } = e.target;

        // if ()
        // console.log(name, checked, id_row)
    }

    // = [Обработчик выделения строк]
    const [selected_rows, set_selected_rows] = useState([]);
    const handle_set_selected_rows = (e, id_row) => { //TODO: [26]
        const { checked } = e.target;
        const new_selected = [...selected_rows];

        if (checked) {
            new_selected.push(id_row)
        }
        else {
            let index_row = selected_rows.indexOf(id_row)
            new_selected.splice(index_row, 1)
        }

        set_selected_rows(new_selected)
    }
    const is_selected = id => selected_rows.includes(id)

    return (
        <>
            <div style={{ height: '352px' }}>
                <table className={'int_table'}>
                    <tr className={'int_table_header'} style={{ position: "relative" }}>
                        <td>
                            <input
                                type={'checkbox'}
                                name={'check_row_header'}
                            />
                        </td>
                        <td>Интерфейс</td> <td>VLAN</td>
                        <td>Режим</td> <td>Voice VLAN</td>
                        <td>Spanning tree</td>
                        <td>Описание</td>
                        <td>optional-tlv</td>
                        <td>med</td>
                    </tr>
                    {
                        range_table[page_table - 1].map(v => {
                            if (v.id === editing_row) {
                                return (
                                    <tr className={'int_table_input'}>
                                        <td style={{ width: '30px' }} key={v.id}>
                                            <input
                                                type={'checkbox'}
                                                disabled
                                            />
                                        </td>
                                        <td style={{ width: '160px' }}>
                                            <input
                                                name="number"
                                                value={v.number}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                autoComplete="off"
                                                id={'txt_field'}
                                            />
                                        </td>
                                        <td style={{ width: '70px' }}>
                                            <input
                                                name="access_vlan"
                                                value={v.access_vlan}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                autoComplete="off"
                                                id={'txt_field'}
                                            />
                                        </td>
                                        <td style={{ width: '100px' }}>
                                            <select
                                                name={'mode'}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                className={'select_mode'}
                                                style={{ width: '100px' }}
                                            >
                                                { v.mode === 'access' && (
                                                        <>
                                                            <option value={v.mode}>{v.mode}</option>
                                                            <option value={'trunk'}>trunk</option>
                                                            <option value={'general'}>general</option>
                                                        </>
                                                    ) }
                                                { v.mode === 'trunk' && (
                                                    <>
                                                        <option value={v.mode}>{v.mode}</option>
                                                        <option value={'access'}>access</option>
                                                        <option value={'general'}>general</option>
                                                    </>
                                                ) }
                                                { v.mode === 'general' && (
                                                    <>
                                                        <option value={v.mode}>{v.mode}</option>
                                                        <option value={'access'}>access</option>
                                                        <option value={'trunk'}>trunk</option>
                                                    </>
                                                ) }
                                                { v.mode === undefined && (
                                                    <>
                                                        <option value={'access'}>access</option>
                                                        <option value={'trunk'}>trunk</option>
                                                        <option value={'general'}>general</option>
                                                    </>
                                                ) }
                                            </select>
                                        </td>
                                        <td style={{ width: '100px' }}>
                                            <input
                                                name="voice_vlan"
                                                value={v.voice_vlan}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                autoComplete="off"
                                                id={'txt_field'}
                                            />
                                        </td>
                                        <td style={{ width: '130px' }}>
                                            <input
                                                name="spanning_tree"
                                                value={v.spanning_tree}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                autoComplete="off"
                                                id={'txt_field'}
                                            />
                                        </td>
                                        <td style={{ width: '150px' }}>
                                            <input
                                                name="description"
                                                value={v.description}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                autoComplete="off"
                                                id={'txt_field'}
                                            />
                                        </td>
                                        <td style={{ width: '120px' }}>
                                            <input
                                                type={'checkbox'}
                                                name={'lldp_optional_tlv'}
                                                value={v.lldp_optional_tlv}
                                                onChange={e => handle_change_editing(e, v.id)}
                                            />
                                        </td>
                                        <td style={{ width: '50px' }}>
                                            <input
                                                type={'checkbox'}
                                                name={'lldp_med'}
                                                value={v.lldp_med}
                                                onChange={e => handle_change_editing(e, v.id)}
                                            />
                                        </td>
                                        <td className={'save_btn_cell'}>
                                            <CheckCircleOutlinedIcon
                                                style={{color: '#27ae60', fontSize: 20, cursor: 'pointer'}}
                                                onClick={stop_editing}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                            return (
                                <tr className={'int_table_rows'}>
                                    <td key={v.id} style={{ width: '30px' }}>
                                        <input
                                            type={'checkbox'}
                                            name={'check_row'}
                                            onChange={ e => handle_set_selected_rows(e, v.id) }
                                        />
                                    </td>
                                    <td style={{ width: '160px' }}>{v.number}</td>
                                    <td style={{ width: '70px' }}>{v.access_vlan}</td>
                                    <td style={{ width: '100px' }}>{v.mode}</td>
                                    <td style={{ width: '100px' }}>{v.voice_vlan}</td>
                                    <td style={{ width: '130px' }}>{v.spanning_tree}</td>
                                    <td style={{ width: '150px' }}>{v.description}</td>
                                    <td style={{ width: '120px' }}><input type={'checkbox'} disabled/></td>
                                    <td style={{ width: '50px' }}><input type={'checkbox'} disabled/></td>
                                    <td style={{border: 'none'}} className={'edit_btn_cell'}>
                                        <EditOutlinedIcon
                                            className={'EOI'}
                                            style={{color: '#7f8c8d', fontSize: 20, cursor: 'pointer'}}
                                            onClick={() => start_editing(v.id)}
                                        />
                                    </td>
                                    <td style={{border: 'none'}} className={'dell_btn_cell'}>
                                        <DeleteOutlineOutlinedIcon
                                            className={'DOOI'}
                                            style={{color: '#c0392b', fontSize: 20, cursor: 'pointer'}}
                                            onClick={() => delete_row(v.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div style={{ display: "flex", width: '938px', justifyContent: 'space-between' }}>
                <div className={'pages_area'}>
                    {
                        page_table !== 1 ?
                            <input type={'button'} value={'<'} name={'left'} onClick={set_page} className={'arr_input'}/>
                            :
                            <input type={'button'} value={'<'} name={'left'} onClick={set_page} className={'arr_input'} disabled/>
                    }
                    <input type={'button'} className={'page_view'} value={page_table}/>
                    {
                        page_table !== count_pages ?
                            <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'}/>
                            :
                            <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'} disabled/>
                    }
                </div>
                <div>
                    <input
                        type={'button'}
                        value={'+'}
                        style={{ width: '30px', height: '30px' }}
                        onClick={add_empty_row}
                        // disabled
                    />
                </div>
            </div>
        </>
    );
};

export default InterfaceTable;