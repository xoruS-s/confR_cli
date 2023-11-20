import React, {useState} from 'react';
import { Icon } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const InterfaceTable = ({ data }) => {
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
    let range_data = data.map((el, i) => {
        return i % 10 === 0 ? data.slice(i, i + 10) : [el];
    });
    range_data.map((range, i) => {
        if (i % 10 === 0) {
            range_table.push(range)
        }
    })








    return (
        <>
            <div style={{ height: '700px', overflowY: 'scroll' }}>
                <table className={'int_table'}>
                    <tr className={'int_table_header'}>
                        <td>Интерфейс</td> <td>VLAN</td> <td>Режим</td> <td>Voice VLAN</td> <td>Spanning tree</td>
                    </tr>
                    {
                        range_table[page_table - 1].map(v => {
                            return (
                                <tr>
                                    <td>{v.number}</td>
                                    <td>{v.access_vlan}</td>
                                    <td>{v.mode}</td>
                                    <td>{v.voice_vlan}</td>
                                    <td>{v.spanning_tree}</td>
                                    <td><EditOutlinedIcon style={{ color: '#7f8c8d', fontSize: 20, cursor: 'pointer' }}/></td>
                                    <td><DeleteOutlineOutlinedIcon style={{ color: '#c0392b', fontSize: 20, cursor: 'pointer' }}/></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className={'pages_area'}>
                <div className={'pagin'}>
                    <input type={'button'} value={'<'} name={'left'} onClick={set_page} className={'arr_input'}/>
                    <input type={'button'} value={'>'} name={'right'} onClick={set_page} className={'arr_input'}/>
                </div>
                <input type={'button'} className={'page_view'} value={page_table} />
            </div>
        </>
    );
};

export default InterfaceTable;