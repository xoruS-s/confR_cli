import React, {useEffect, useState} from 'react';
import { Icon } from '@mui/material';
import { v4 } from "uuid";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import SettingsPowerOutlinedIcon from '@mui/icons-material/SettingsPowerOutlined';


const InterfaceTable = ({ data }) => {
    // - [Обновление данных]
    const local_storage = JSON.parse(localStorage.getItem('interface_table'));
    const [rows, set_rows] = useState(local_storage ? local_storage : data)

    // - [Обработчик данных новой строки]
    const [new_row, set_new_row] = useState({});
    const handler_new_row = (e) => {
        const { name, value, checked } = e.target;

        set_new_row({
            ...new_row,
            id: v4(),
            selected: false,
            [name]: name === 'lldp_optional_tlv' || name === 'lldp_med' ? checked : value
        })
    }

    // - [Добавление новой строки]
    const add_row = () => { //TODO:[.30]
        set_rows([...rows, new_row]);
        set_new_row({
            number: '',
            access_vlan: '',
            mode: 'access',
            voice_vlan: '',
            spanning_tree: '',
            description: '',
            lldp_optional_tlv: false,
            lldp_med: false
        }); // - [Обнуление новой строки]
    }

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

    // - [Редактирование строк]
    const [editing_row, set_editing_row] = useState(null);
    const start_editing = (rowId) => {
        if (editing_row === rowId) {
            return
        }
        set_editing_row(rowId);
    }
    const stop_editing = () => {
        set_editing_row(null);
    }
    const handler_editing_row = (e, rowId) => {
        const { name, value, checked, type } = e.target;

        // if (name === 'check_row_header') {
        //     rows.map((row, i) => {
        //         row.check_row = checked;
        //     })
        //     console.log(rows)
        // }

        set_rows(rows => {
            const rowIndex = rows.findIndex(r => r.id === rowId);
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

    // - [Удаление строк]
    const delete_row = (id) => {
        const newRows = rows.filter(row => row.id !== id);
        set_rows(newRows)
    }

    // - [Обработчик выключения порта]
    const [shutdown_rows, set_shutdown_rows] = useState([]);
    const handler_is_shutdown = (row_id) => {
        if (shutdown_rows.length === 0) {
            set_shutdown_rows([{
                id: row_id
            }]);
        }
        else {
            if (shutdown_rows.some(row => row.id === row_id)) {
                const new_rows = shutdown_rows.filter(row => row.id !== row_id);
                set_shutdown_rows(new_rows);
            }
            else {
                set_shutdown_rows([...shutdown_rows, { id: row_id }]);
            }
        }
    }

    // - [Обработчик перерисовки]
    useEffect(() => {
        if (rows.length > 0 || rows !== data) {
            localStorage.setItem('interface_table', JSON.stringify(rows));
        }
    }, [rows])

    // - [Обработчик выделенных строк]
    const has_selected_row = rows.find(row => row.check_row); // - |Поиск хотя-бы одной выделенной строки|




    // const [test_check, set_test_check] = useState([]);
    // useEffect(() => {
    //     rows.map(row => {
    //         set_test_check(prev_state => [...prev_state, { [row.id]: false }])
    //     })
    // },[])
    // // const obj_arr = [
    // //     {'1/0/1': true},
    // //     {'1/0/2': false},
    // //     {'1/0/3': true},
    // // ]
    // // console.log(obj_arr.findIndex(row => Object.keys(row)[0] === '1/0/1'))
    // // // console.log(Object.keys(obj_arr[0])[0])
    // const handler_test_check = (e, id_row) => {
    //     const { checked, name } = e.target;
    //
    //     if (name !== 'check_row_header') {
    //         set_test_check(prev => {
    //             const rowIndex = prev.findIndex(row => Object.keys(row)[0] === id_row);
    //             const updatedRow = {
    //                 ...prev[rowIndex],
    //                 [id_row]: checked
    //             };
    //             return [
    //                 ...prev.slice(0, rowIndex),
    //                 updatedRow,
    //                 ...prev.slice(rowIndex + 1)
    //             ];
    //         })
    //     }
    //     else {
    //
    //     }
    // }
    // useEffect(() => {
    //     // console.log(test_check)
    // }, [test_check])



    return (
        <>
            <div className={'wrapper'}>
                <table className={'interface_table'}>
                    <tr className={'interface_table_header'}>
                        <td id={'col_1'}>
                            <input
                                type={'checkbox'}
                                name={'check_row_header'}
                                onChange={e => handler_editing_row(e)}
                            />
                        </td>
                        <td id={'col_2'}>Интерфейс</td>
                        <td id={'col_3'}>VLAN</td>
                        <td id={'col_4'}>Режим</td>
                        <td id={'col_5'}>Voice VLAN</td>
                        <td id={'col_6'}>Spanning tree</td>
                        <td id={'col_7'}>Описание</td>
                        <td id={'col_8'}>optional-tlv</td>
                        <td id={'col_9'}>med</td>
                        <td id={'empty_col'}/>
                        <td id={'empty_col'}/>
                    </tr>
                    {
                        range_table[page_table - 1].map(v => (
                            v.id === editing_row ?
                                (<tr key={v.id} className={'interface_table_rows_edit'}>
                                    <td>
                                        <input
                                            type={'checkbox'}
                                            checked={v.check_row}
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="number"
                                            value={v.number}
                                            onChange={e => handler_editing_row(e, v.id)}
                                            autoComplete="off"
                                            id={'txt_field'}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="access_vlan"
                                            value={v.access_vlan}
                                            onChange={e => handler_editing_row(e, v.id)}
                                            autoComplete="off"
                                            id={'txt_field'}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name={'mode'}
                                            onChange={e => handler_editing_row(e, v.id)}
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
                                    <td>
                                        <input
                                            name="voice_vlan"
                                            value={v.voice_vlan}
                                            onChange={e => handler_editing_row(e, v.id)}
                                            autoComplete="off"
                                            id={'txt_field'}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="spanning_tree"
                                            value={v.spanning_tree}
                                            onChange={e => handler_editing_row(e, v.id)}
                                            autoComplete="off"
                                            id={'txt_field'}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="description"
                                            value={v.description}
                                            onChange={e => handler_editing_row(e, v.id)}
                                            autoComplete="off"
                                            id={'txt_field'}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type={'checkbox'}
                                            name={'lldp_optional_tlv'}
                                            value={v.lldp_optional_tlv}
                                            onChange={e => handler_editing_row(e, v.id)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type={'checkbox'}
                                            name={'lldp_med'}
                                            value={v.lldp_med}
                                            onChange={e => handler_editing_row(e, v.id)}
                                        />
                                    </td>
                                    <td id={'col_save'}>
                                        <LibraryAddCheckOutlinedIcon
                                            id={'btn_save'}
                                            onClick={stop_editing}
                                        />
                                    </td>
                                </tr>) // - |Редактирование строки|
                                :
                                (shutdown_rows.some(row => row.id === v.id) ?
                                    (<tr key={v.id} className={v.check_row === true ? 'interface_table_rows selected' : 'interface_table_rows'}>
                                        <td>
                                            <input
                                                type={'checkbox'}
                                                name={'check_row'}
                                                // checked={ Object.keys(test_check)[0] }
                                                checked={v.check_row}
                                                onChange={ e => handler_editing_row(e, v.id) }
                                                disabled
                                            />
                                        </td>
                                        <td>{v.number}</td>
                                        <td>{v.access_vlan}</td>
                                        <td>{v.mode}</td>
                                        <td>{v.voice_vlan}</td>
                                        <td>{v.spanning_tree}</td>
                                        <td>{v.description}</td>
                                        <td>
                                            <input
                                                type={'checkbox'}
                                                checked={v.lldp_optional_tlv}
                                                disabled
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type={'checkbox'}
                                                checked={v.lldp_med}
                                                disabled
                                            />
                                        </td>
                                        <td id={'col_edit'}>
                                            <EditOutlinedIcon
                                                className={'EOI'}
                                                onClick={() => start_editing(v.id)}
                                            />
                                        </td>
                                        <td id={'col_delete'}>
                                            <DeleteOutlineOutlinedIcon
                                                className={'DOOI'}
                                                onClick={() => delete_row(v.id)}
                                            />
                                        </td>
                                        <td id={'col_shutdown'} style={{ position: 'absolute' }}>
                                            <SettingsPowerOutlinedIcon
                                                className={'SPOI'}
                                                onClick={() => handler_is_shutdown(v.id)}
                                            />
                                        </td>
                                        <td id={'row_shutdown'}>SHUT FUCKING DOWN</td>
                                    </tr>)
                                    :
                                    (<tr key={v.id} className={v.check_row === true ? 'interface_table_rows selected' : 'interface_table_rows'}>
                                        <td>
                                            <input
                                                type={'checkbox'}
                                                name={'check_row'}
                                                // checked={ Object.keys(test_check)[0] }
                                                checked={v.check_row}
                                                onChange={ e => handler_editing_row(e, v.id) }
                                            />
                                        </td>
                                        <td>{v.number}</td>
                                        <td>{v.access_vlan}</td>
                                        <td>{v.mode}</td>
                                        <td>{v.voice_vlan}</td>
                                        <td>{v.spanning_tree}</td>
                                        <td>{v.description}</td>
                                        <td>
                                            <input
                                                type={'checkbox'}
                                                checked={v.lldp_optional_tlv}
                                                disabled
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type={'checkbox'}
                                                checked={v.lldp_med}
                                                disabled
                                            />
                                        </td>
                                        <td id={'col_edit'}>
                                            <EditOutlinedIcon
                                                className={'EOI'}
                                                onClick={() => start_editing(v.id)}
                                            />
                                        </td>
                                        <td id={'col_delete'}>
                                            <DeleteOutlineOutlinedIcon
                                                className={'DOOI'}
                                                onClick={() => delete_row(v.id)}
                                            />
                                        </td>
                                        <td id={'col_shutdown'} style={{ position: 'absolute' }}>
                                            <SettingsPowerOutlinedIcon
                                                className={'SPOI'}
                                                onClick={() => handler_is_shutdown(v.id)}
                                            />
                                        </td>
                                    </tr>)
                                ) // - |Исходная строка|
                        ))
                    }
                    {   /* |Добавление новой строки| */
                        (page_table === count_pages || count_pages === 0) && (
                            <tr className={'interface_table_rows_edit'}>
                                <td>
                                    <input
                                        type={'checkbox'}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        name="number"
                                        value={new_row ? new_row.number : ''}
                                        onChange={e => handler_new_row(e)}
                                        autoComplete="off"
                                        id={'txt_field'}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="access_vlan"
                                        value={new_row ? new_row.access_vlan : ''}
                                        onChange={e => handler_new_row(e)}
                                        autoComplete="off"
                                        id={'txt_field'}
                                    />
                                </td>
                                <td>
                                    <select
                                        name={'mode'}
                                        onChange={e => handler_new_row(e)}
                                        className={'select_mode'}
                                        style={{ width: '100px' }}
                                    >
                                        { new_row && new_row.mode === 'access' && (
                                            <>
                                                <option value={new_row.mode}>{new_row.mode}</option>
                                                <option value={'trunk'}>trunk</option>
                                                <option value={'general'}>general</option>
                                            </>
                                        ) }
                                        { new_row && new_row.mode === 'trunk' && (
                                            <>
                                                <option value={new_row.mode}>{new_row.mode}</option>
                                                <option value={'access'}>access</option>
                                                <option value={'general'}>general</option>
                                            </>
                                        ) }
                                        { new_row && new_row.mode === 'general' && (
                                            <>
                                                <option value={new_row.mode}>{new_row.mode}</option>
                                                <option value={'access'}>access</option>
                                                <option value={'trunk'}>trunk</option>
                                            </>
                                        ) }
                                        { new_row && new_row.mode === undefined && (
                                            <>
                                                <option value={'access'}>access</option>
                                                <option value={'trunk'}>trunk</option>
                                                <option value={'general'}>general</option>
                                            </>
                                        ) }
                                    </select>
                                </td>
                                <td>
                                    <input
                                        name="voice_vlan"
                                        value={ new_row ? new_row.voice_vlan : '' }
                                        onChange={e => handler_new_row(e)}
                                        autoComplete="off"
                                        id={'txt_field'}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="spanning_tree"
                                        value={new_row ? new_row.spanning_tree : ''}
                                        onChange={e => handler_new_row(e)}
                                        autoComplete="off"
                                        id={'txt_field'}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="description"
                                        value={new_row ? new_row.description : ''}
                                        onChange={e => handler_new_row(e)}
                                        autoComplete="off"
                                        id={'txt_field'}
                                    />
                                </td>
                                <td>
                                    <input
                                        type={'checkbox'}
                                        name={'lldp_optional_tlv'}
                                        checked={ new_row ? new_row.lldp_optional_tlv : false }
                                        onChange={e => handler_new_row(e)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type={'checkbox'}
                                        name={'lldp_med'}
                                        checked={ new_row ? new_row.lldp_med : false }
                                        onChange={e => handler_new_row(e)}
                                    />
                                </td>
                                <td id={'col_add'}>
                                    <AddBoxOutlinedIcon
                                        id={'btn_add'}
                                        onClick={add_row}
                                    />
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>

            <div style={{ display: "flex", width: '881px', justifyContent: 'space-between' }}>
                <div className={'pages_area'}>
                    {
                        page_table !== 1 ?
                            <input type={'button'} value={'❮'} name={'left'} onClick={set_page} className={'arr_input'}/>
                            :
                            <input type={'button'} value={'❮'} name={'left'} onClick={set_page} className={'arr_input'} disabled/>
                    }
                    <input type={'button'} className={'page_view'} value={page_table}/>
                    {
                        page_table !== count_pages ?
                            <input type={'button'} value={'❯'} name={'right'} onClick={set_page} className={'arr_input'}/>
                            :
                            <input type={'button'} value={'❯'} name={'right'} onClick={set_page} className={'arr_input'} disabled/>
                    }
                </div>

                {
                    (has_selected_row && (
                        <input
                            className={'multiple_editing_row_btn'}
                            name={'multiple_edit_btn'}
                            type={'button'}
                            value={'Изменить'}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default InterfaceTable;