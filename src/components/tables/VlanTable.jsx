import React from 'react';

import './style/tables.css';

const VlanTable = ({ data }) => {
    return (
        <table className={'UC_vlan_table'}>
            <caption>VLAN Таблица</caption>
            <tr className={'UC_vlan_table_header'}>
                <td>Номер</td> <td>Описание</td> <td>IP Адрес</td>
            </tr>
            {
                data.map(item => (
                    <tr className={'UC_vlan_table_row'}>
                        <td className={'UC_vlan_table_cell'}>{item.number}</td>
                        <td className={'UC_vlan_table_cell'}>{item.description}</td>
                        <td className={'UC_vlan_table_cell'}>{item.ipAddress}</td>
                    </tr>
                ))
            }
        </table>
    )
};

export default VlanTable;
