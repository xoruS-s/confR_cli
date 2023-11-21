import React, {useEffect, useState} from 'react';
import { Icon } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const InterfaceTable = ({ data }) => {
    // - []
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
    let count_pages = Math.ceil(data.length / 10);
    let range_table = [];
    let range_data = rows.map((el, i) => {
        return i % 10 === 0 ? rows.slice(i, i + 10) : [el];
    });
    range_data.map((range, i) => {
        if (i % 10 === 0) {
            range_table.push(range)
        }
    })

    // - [Обработка lldp]
    const [check_en, set_check_en] = useState(false);
    const handle_check_box = () => {
        set_check_en(!check_en)
    }

    // - []
    const delete_row = (id) => {
        const new_rows = rows.filter(row => row.id !== id);
        set_rows(new_rows)
    }



    return (
        <>
            <div style={{ height: '352px' }}>
                <table className={'int_table'}>
                    <tr className={'int_table_header'} style={{ position: "relative" }}>
                        <td><input type={'checkbox'}/></td> <td>Интерфейс</td> <td>VLAN</td> <td>Режим</td> <td>Voice VLAN</td> <td>Spanning tree</td> <td>Описание</td> <td>optional-tlv</td> <td>med</td>
                    </tr>
                    {
                        range_table[page_table - 1].map(v => {
                            return (
                                <tr className={'int_table_rows'}>
                                    <td key={v.id}><input type={'checkbox'}/></td>
                                    <td>{v.number}</td>
                                    <td>{v.access_vlan}</td>
                                    <td>
                                        <select className={'select_mode'}>
                                            <option value={v.mode}>{v.mode}</option>
                                            { v.mode === 'access' ?
                                                <option value={'trunk'}>trunk</option>
                                                :
                                                <option value={'access'}>access</option> }
                                            <option>general</option>
                                        </select>
                                    </td>
                                    <td style={{ width: '100px' }}>{v.voice_vlan}</td>
                                    <td style={{ width: '130px' }}>{v.spanning_tree}</td>
                                    <td style={{ width: '150px' }}></td>
                                    <td style={{ width: '120px' }}><input type={'checkbox'}/></td>
                                    <td style={{ width: '50px' }}><input type={'checkbox'}/></td>
                                    <td style={{ border: 'none' }} className={'edit_btn_cell'}>
                                        <EditOutlinedIcon className={'EOI'} style={{ color: '#7f8c8d', fontSize: 20, cursor: 'pointer' }}/>
                                    </td>
                                    <td style={{ border: 'none' }} className={'dell_btn_cell'}>
                                        <DeleteOutlineOutlinedIcon
                                            className={'DOOI'}
                                            style={{ color: '#c0392b', fontSize: 20, cursor: 'pointer' }}
                                            onClick={() => delete_row(v.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className={'pages_area'}>
                { page_table !== 1 ?
                    <input type={'button'} value={'<'} name={'left'} onClick={set_page} className={'arr_input'}/>
                    :
                    <input type={'button'} value={'<'} name={'left'} onClick={set_page} className={'arr_input'} disabled/> }

                <input type={'button'} className={'page_view'} value={page_table}/>
                { page_table !== count_pages ?
                    <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'}/>
                    :
                    <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'} disabled/> }
            </div>
        </>
    );
};

export default InterfaceTable;