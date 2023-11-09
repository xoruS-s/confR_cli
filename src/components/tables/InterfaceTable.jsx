import React from 'react';
import { Icon } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const InterfaceTable = ({ data }) => {
    return (
        <>
            <caption className={'int_caption'}>Таблица интерфесов</caption>
            <div style={{ height: '700px', overflowY: 'scroll' }}>
                <table className={'int_table'}>
                    <tr className={'int_table_header'}>
                        <td>Интерфейс</td> <td>VLAN</td> <td>Режим</td> <td>Voice VLAN</td> <td>Spanning tree</td>
                    </tr>
                    {
                        data.map(item => (
                            <tr>
                                <td>{item.number}</td>
                                <td>{item.access_vlan}</td>
                                <td>{item.mode}</td>
                                <td>{item.voice_vlan}</td>
                                <td>{item.spanning_tree}</td>
                                <td><EditOutlinedIcon style={{ color: '#7f8c8d', fontSize: 20, cursor: 'pointer' }}/></td>
                                <td><DeleteOutlineOutlinedIcon style={{ color: '#c0392b', fontSize: 20, cursor: 'pointer' }}/></td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </>
    );
};

export default InterfaceTable;