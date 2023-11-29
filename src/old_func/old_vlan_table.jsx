import React from "react";

{/*{rows.map(row => {*/}
{/*    if (row.id === editingRow) {*/}
{/*        return (*/}
{/*            <tr key={row.id} className={'vlan_table_input'}>*/}
{/*                <td>*/}
{/*                    <input*/}
{/*                        name="number"*/}
{/*                        value={row.number}*/}
{/*                        onChange={e => handleChange(e, row.id)}*/}
{/*                        autoComplete="off"*/}
{/*                    />*/}
{/*                </td>*/}
{/*                <td>*/}
{/*                    <input*/}
{/*                        name="description"*/}
{/*                        value={row.description}*/}
{/*                        onChange={e => handleChange(e, row.id)}*/}
{/*                        autoComplete="off"*/}
{/*                    />*/}
{/*                </td>*/}
{/*                <td>*/}
{/*                    <input*/}
{/*                        name="ipAddress"*/}
{/*                        value={row.ipAddress}*/}
{/*                        onChange={e => handleChange(e, row.id)}*/}
{/*                        autoComplete="off"*/}
{/*                    />*/}
{/*                </td>*/}
{/*                <td style={{width: '30px', border: 'none'}}>*/}
{/*                    <CheckBoxOutlinedIcon onClick={stopEditing}*/}
{/*                                          style={{color: '#27ae60', fontSize: 20, cursor: 'pointer'}}/>*/}
{/*                </td>*/}
{/*            </tr>*/}
{/*        );*/}
{/*    }*/}
{/*    return (*/}
{/*        <>*/}
{/*            <tr className={'UC_vlan_table_row'} key={row.number}>*/}
{/*                <td className={'UC_vlan_table_cell'}>{row.number}</td>*/}
{/*                <td className={'UC_vlan_table_cell'}>{row.description}</td>*/}
{/*                <td className={'UC_vlan_table_cell'}>{row.ipAddress}</td>*/}
{/*                <td style={{width: '30px', border: 'none', cursor: 'pointer'}} className={'td_edit_btn'}*/}
{/*                    onClick={() => {*/}
{/*                        startEditing(row.id)*/}
{/*                    }}><EditOutlinedIcon*/}
{/*                    className={'edit_btn'}*/}
{/*                    style={{color: '#7f8c8d', fontSize: 20}}/></td>*/}
{/*                <td*/}
{/*                    style={{width: '30px', border: 'none', cursor: 'pointer'}}*/}
{/*                    className={'td_del_btn'}*/}
{/*                    onClick={() => delete_row(row.id)}>*/}
{/*                    <DeleteOutlineOutlinedIcon*/}
{/*                        className={'del_btn'}*/}
{/*                        style={{color: '#c0392b', fontSize: 20}}*/}
{/*                    />*/}
{/*                </td>*/}
{/*            </tr>*/}
{/*        </>*/}
{/*    )*/}
{/*})}*/}


/* // const tmp_data = [
    //     {
    //         id: 1,
    //         permit: true,
    //         ip: '10.16.10.179',
    //         mask: '255.255.255.254',
    //         service: 'snpm'
    //     },
    //     {
    //         id: 2,
    //         permit: true,
    //         ip: '10.16.15.0',
    //         mask: '255.255.255.248',
    //         service: 'ssh'
    //     },
    //     {
    //         id: 3,
    //         permit: true,
    //         ip: '10.16.15.0',
    //         mask: '255.255.255.248',
    //         service: 'http'
    //     },
    //     {
    //         id: 4,
    //         permit: true,
    //         ip: '10.16.15.0',
    //         mask: '255.255.255.248',
    //         service: 'https'
    //     },
    //     {
    //         id: 5,
    //         permit: true,
    //         ip: '172.16.1.1',
    //         mask: '255.255.255.0',
    //         service: 'ssh'
    //     }
    // ];

    // - [Обновление данных]
    const [rows, set_rows] = useState([]);

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
    }*/