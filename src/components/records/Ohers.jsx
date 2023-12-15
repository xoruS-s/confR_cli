import React, { useState } from 'react';


import './style.css';

const Others = () => {
    const [hostname, set_hostname] = useState('');
    const [default_ip, set_default_ip] = useState('');
    const [ip_server, set_ip_server] = useState(false);
    const [snmp_server_name, set_snmp_server_name] = useState('');
    const [snmp_server_location, set_snmp_server_location] = useState('');
    const [snmp_server_group, set_snmp_server_group] = useState('');



    const test_arr = ['60', '32', '33'];

    const handle = (e) => {
        const { name, value, checked } = e.target;

        switch (name) {
            case 'hostname':
                set_hostname(value);
                break;
            case 'default_ip':
                set_default_ip(value);
                break;
            case 'ip_server':
                set_ip_server(checked);
                break;
            case 'snmp_server':
                set_snmp_server_name(value);
                break;
            case 'snmp_server_group':
                set_snmp_server_group(value);
                break;
            case'snmp_server_location':
            default:
                break;
        }
    }

    return (
        <>
            <div className={'others_container'}>
                <hr />
                <table style={{ borderCollapse: 'collapse', fontFamily: 'Consolas, sans-serif' }}>
                    <tr>
                        <td>hostname</td>
                        <td>
                            <input
                                type={'text'}
                                name={'hostname'}
                                value={ hostname }
                                onChange={e => handle(e)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>ip default-gateway</td>
                        <td>
                            <input
                                type={'text'}
                                name={'default_ip'}
                                value={ default_ip }
                                onChange={e => handle(e)}
                            />
                        </td>
                    </tr>
                </table>
                <hr />
                <p>
                    lldp med network-policy 1 voice vlan
                    <select>
                        {
                            test_arr.map(v => {
                                return (
                                    <option value={v}>{v}</option>
                                )
                            })
                        }
                    </select>
                    {/*Массив с тэгироваными vlan*/}
                    vlan-type tagged
                </p>
                <hr />
                {/*<p>
                    ip access-list extended SNMP_ACL <br/>
                    <span></span>permit tcp 10.16.0.179 255.255.255.255 any any any precedence 1 ace-priority 1 <br/>
                    exit
                </p>*/}
                <p>
                    <input
                        type={'checkbox'}
                        name={'ip_server'}
                        checked={ ip_server }
                        onChange={e => handle(e)}
                    />
                    ip ssh server
                </p>
                <hr />

                <table>
                    <tr>
                        <td>snmp server</td>
                        <td>
                            <input
                                type={'text'}
                                name={'snmp_server_name'}
                                value={ snmp_server_name }
                                onChange={e => handle(e)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>snmp-server location</td>
                        <td>
                            <input
                                type={'text'}
                                name={'snmp_server_location'}
                                value={ snmp_server_location }
                                onChange={e => handle}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>snmp-server group</td>
                        <td>
                            <input
                                type={'text'}
                                name={'snmp_server_group'}
                                value={ snmp_server_group }
                                onChange={e => handle(e)}
                            />
                        </td>
                        <td>v3 auth</td>
                    </tr>
                    <tr>
                        <td>snmp-server group</td>
                        <td>
                            {snmp_server_group}
                        </td>
                        <td>v3 priv</td>
                    </tr>
                </table>
                <hr />
                <p>
                    clock timezone " " +3 <br/>
                    clock source sntp
                </p>
                <hr />
                <p>
                    sntp unicast client enable <br/>
                    sntp unicast client poll <br/>
                    sntp server
                    10.16.10.102
                    poll <br/>
                    sntp server
                    10.16.10.103
                    poll
                </p>
                <hr />
            </div>
        </>
    );
};

export default Others;
