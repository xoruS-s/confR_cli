import React, { useState, useId, useEffect } from 'react';
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { v4 } from "uuid";

const RemoteAccessTable = () => { //TODO:[|+|.28]
    // - [Очистка localStorage]
    window.addEventListener('beforeunload', e => {
        localStorage.clear();
    });

    // - [Обновление данных]
    const [rows, set_rows] = useState([]);

    // - [Обработчик данных новой строки]
    const [new_row, set_new_row] = useState({});
    const handler_new_row = (e) => {
        const { name, value, checked } = e.target;

        set_new_row({
            ...new_row,
            id: v4(),
            [name]: name === 'permit' ? checked : value
        })
    }

    // - [Добавление новой строки]
    const add_row = () => { //TODO:[.30]
        /*// if ((new_row.ip && new_row.mask && new_row.service) === undefined || '' ) {
        //     alert('Не них*я. Все ячейки должны быть заполнены');
        // } else*/
        set_rows([...rows, new_row]);
    }

    // - [Подсчет кол-ва страниц, распределение элементов, пагинация]
    const [page_table, set_page_table] = useState(1);
    const count_pages = Math.ceil(rows.length / 10);
    const range_table = []; // - основная (по страничная)
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
    const [editing_row, set_editing_row] = useState(null);
    const start_editing = (row_id) => {
        if (editing_row === row_id) {
            return
        }
        set_editing_row(row_id);
    }
    const stop_editing = () => {
        set_editing_row(null);
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

    // - [Удаление строк]
    const delete_row = (id) => {
        const new_rows = rows.filter(row => row.id !== id);
        set_rows(new_rows)
    }

    // - [Обработчик перерисовки]
    useEffect(() => {
        const local_storage = JSON.parse(localStorage.getItem('remote_access_table'));
        if (local_storage) {
            set_rows(local_storage);
        }
    }, [])
    useEffect(() => {
        if (rows.length > 0) {
            localStorage.setItem('remote_access_table', JSON.stringify(rows));
        }
    }, [rows])



    return (
        <>
            <div style={{ height: '352px' }}>
                <table className={'remote_access_table'}>
                    <tr className={'remote_access_table_header'}>
                        <td style={{ width: '89px', padding: 0 }}>Разрешить</td>
                        <td style={{ width: '149px', padding: 0 }}>IP адрес</td>
                        <td style={{ width: '149px', padding: 0 }}>Маска</td>
                        <td style={{ width: '79px', padding: 0 }}>Протокол</td>
                        <td style={{ width: '39px', backgroundColor: '#fff', border: 'none', padding: 0 }}></td>
                        <td style={{ width: '40px', backgroundColor: '#fff', border: 'none', padding: 0 }}></td>
                    </tr>
                    {
                        range_table[page_table - 1] !== undefined && range_table[page_table - 1].map((v, i) => ( /*TODO:[|+|.33]*/
                            v.id === editing_row ?
                                (<tr key={v.id} className={'remote_access_table_rows_edit'}> {/* |Редактирование строки| */}
                                        <td style={{ width: '90px' }}>
                                            <input
                                                type={'checkbox'}
                                                name={'permit'}
                                                value={v.permit}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                style={{ width: '13px', height: '13px' }}
                                            />
                                        </td>
                                        <td style={{ width: '150px' }}>
                                            <input
                                                name="ip"
                                                value={v.ip}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                autoComplete="off"
                                            />
                                        </td>
                                        <td style={{ width: '150px' }}>
                                            <input
                                                name="mask"
                                                value={v.mask}
                                                onChange={e => handle_change_editing(e, v.id)}
                                                autoComplete="off"
                                            />
                                        </td>
                                        <td style={{ width: '80px' }}>
                                            <select name={'service'} onChange={e => handle_change_editing(e, v.id)}>
                                                { v.service === 'snmp' && (
                                                    <>
                                                        <option value={v.service}>{v.service}</option>
                                                        <option value={'ssh'}>ssh</option>
                                                        <option value={'http'}>http</option>
                                                        <option value={'https'}>https</option>
                                                    </>
                                                ) }
                                                { v.service === 'ssh' && (
                                                    <>
                                                        <option value={v.service}>{v.service}</option>
                                                        <option value={'snmp'}>snmp</option>
                                                        <option value={'http'}>http</option>
                                                        <option value={'https'}>https</option>
                                                    </>
                                                ) }
                                                { v.service === 'http' && (
                                                    <>
                                                        <option value={v.service}>{v.service}</option>
                                                        <option value={'snmp'}>snmp</option>
                                                        <option value={'ssh'}>ssh</option>
                                                        <option value={'https'}>https</option>
                                                    </>
                                                ) }
                                                { v.service === 'https' && (
                                                    <>
                                                        <option value={v.service}>{v.service}</option>
                                                        <option value={'snmp'}>snmp</option>
                                                        <option value={'ssh'}>ssh</option>
                                                        <option value={'http'}>http</option>
                                                    </>
                                                ) }
                                            </select>
                                        </td>
                                        <td className={'save_btn_cell'} style={{ border: 'none', width: '40px' }}>
                                            <CheckCircleOutlinedIcon
                                                style={{color: '#27ae60', fontSize: 20, cursor: 'pointer'}}
                                                onClick={stop_editing}
                                            />
                                        </td>
                                    </tr>)
                                :
                                (<tr key={v.id} className={'remote_access_table_rows'}> {/* |Исходная строка| */}
                                        <td style={{ width: '90px' }}>
                                            <input
                                                type={'checkbox'}
                                                checked={v.permit}
                                                disabled
                                            />
                                        </td>
                                        <td style={{ width: '150px' }}>{v.ip}</td>
                                        <td style={{ width: '150px' }}>{v.mask}</td>
                                        <td style={{ width: '80px' }}>{v.service}</td>
                                        <td className={'edit_btn_cell'} style={{ border: 'none', width: '40px' }}>
                                            <EditOutlinedIcon
                                                className={'EOI'}
                                                style={{ color: '#7f8c8d', fontSize: 20, cursor: 'pointer' }}
                                                onClick={() => start_editing(v.id)}
                                            />
                                        </td>
                                        <td className={'delete_btn_cell'} style={{ border: 'none', width: '40px' }}>
                                            <DeleteOutlineOutlinedIcon
                                                className={'DOOI'}
                                                style={{ color: '#7f8c8d', fontSize: 20, cursor: 'pointer' }}
                                                onClick={() => delete_row(v.id)}
                                            />
                                        </td>
                                    </tr>)
                        ))
                    }
                    { /* |Добавление новой строки| */
                        (page_table === count_pages ||  count_pages === 0) && (
                            <tr className={'remote_access_table_rows_edit'}>{/*TODO:[.2]|[.31]*/}
                                <td style={{ width: '90px' }}>
                                    <input
                                        type={'checkbox'}
                                        style={{ width: '13px', height: '13px' }}
                                        name={'permit'}
                                        onChange={e => handler_new_row(e)}
                                    />
                                </td>
                                <td style={{ width: '150px' }}>
                                    <input
                                        name={'ip'}
                                        onChange={e => handler_new_row(e)}
                                    />
                                </td>
                                <td style={{ width: '150px' }}>
                                    <input
                                        name={'mask'}
                                        onChange={e => handler_new_row(e)}
                                    />
                                </td>
                                <td style={{ width: '80px' }}>
                                    <select name={'service'} onChange={e => handler_new_row(e)}>
                                        <option></option> {/*TODO:[.30]*/}
                                        <option value={'snmp'}>snmp</option>
                                        <option value={'ssh'}>ssh</option>
                                        <option value={'http'}>http</option>
                                        <option value={'https'}>https</option>
                                    </select>
                                </td>
                                <td className={'add_row'} onClick={add_row}>✛</td>
                            </tr>
                        )
                    }

                    {/*{ range_table[page_table - 1].map(v => {
                            if (v.id === editing_row) {
                                return (
                                    <tr key={v.id} className={'remote_access_table_rows_edit'}>
                                        <td style={{ width: '90px' }}>
                                            <input
                                                type={'checkbox'}
                                                checked={v.permit}
                                                className={'permit_checkbox'}
                                            />
                                        </td>
                                        <td style={{ width: '150px' }}>
                                            <input
                                                value={v.ip}
                                                onChange={e => handle_change_editing(e, v.id)}
                                            />
                                        </td>
                                        <td style={{ width: '150px' }}>
                                            <input value={v.mask}/>
                                        </td>
                                        <td style={{ width: '80px' }}>
                                            <input value={v.service}/>
                                        </td>
                                        <td className={'save_btn_cell'} style={{ width: '80px' }}>
                                            <CheckCircleOutlinedIcon
                                                style={{color: '#27ae60', fontSize: 20, cursor: 'pointer'}}
                                                onClick={stop_editing}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                            return (
                                <tr key={v.id} className={'remote_access_table_rows'}>
                                    <td style={{ width: '90px' }}>
                                        <input
                                            type={'checkbox'}
                                            checked={v.permit}
                                            disabled
                                        />
                                    </td>
                                    <td style={{ width: '150px' }}>{v.ip}</td>
                                    <td style={{ width: '150px' }}>{v.mask}</td>
                                    <td style={{ width: '80px' }}>{v.service}</td>
                                    <td style={{border: 'none', width: '40px'}} className={'edit_btn_cell'}>
                                        <EditOutlinedIcon
                                            className={'EOI'}
                                            style={{color: '#7f8c8d', fontSize: 20, cursor: 'pointer'}}
                                            onClick={() => start_editing(v.id)}
                                        />
                                    </td>
                                    <td style={{border: 'none', width: '40px'}} className={'dell_btn_cell'}>
                                        <DeleteOutlineOutlinedIcon
                                            className={'DOOI'}
                                            style={{color: '#c0392b', fontSize: 20, cursor: 'pointer'}}
                                            onClick={() => delete_row(v.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        }) }*/}
                </table>
            </div>
            <div className={'pages_area'}>
                {
                    page_table !== 1 ?
                        <input type={'button'} value={'<'} name={'left'} onClick={set_page} className={'arr_input'}/>
                        :
                        <input type={'button'} value={'<'} name={'left'} onClick={set_page} className={'arr_input'} disabled/>
                }
                <input type={'button'} className={'page_view'} value={page_table}/>
                {
                    (page_table !== count_pages) ?
                        count_pages === 0 ?
                            <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'} disabled/>
                            :
                            <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'}/>
                        :
                        <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'} disabled/>
                }
            </div>
        </>
    );
};

export default RemoteAccessTable;
