import React, {useEffect, useState} from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import './table.css';

const View_table = () => {
    const server_data = [
        {id: '1', number: '1', description: '', ipAddress: ''},
        {id: '2', number: '2', description: 'SW', ipAddress: '172.16.1.12'},
        {id: '12', number: '12', description: 'Printers', ipAddress: ''},
        {id: '15', number: '15', description: '', ipAddress: ''},
        {id: '16', number: '16', description: 'Wi-Fi', ipAddress: ''},
        {id: '25', number: '25', description: 'Video', ipAddress: ''},
        {id: '47', number: '47', description: 'Stroyceh', ipAddress: ''},
        {id: '52', number: '52', description: 'OPS', ipAddress: ''},
        {id: '60', number: '60', description: 'VoIP', ipAddress: ''},
        {id: '2181', number: '2181', description: 'HOMENET', ipAddress: ''},
        {id: '2190', number: '2190', description: 'HOMENET2', ipAddress: '2'},
        {id: '2191', number: '2191', description: 'HOMENET3', ipAddress: '3'}
]

    const [page_table, set_page_table] = useState(1);
    let range_table = [];

    let count_pages = Math.ceil(server_data.length / 5);

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

    const data = server_data.map((el, i) => {
        return i % 5 === 0 ? server_data.slice(i, i + 5) : [el];
    });
    data.map((range, i) => {
        if (i % 5 === 0) {
            range_table.push(range)
        }
    })

    return (
        <>
            <table style={{ height: '300px' }}>
                <tr style={{ height: '20px' }}>
                    <td>Номер</td><td>Название</td><td>Адрес</td>
                </tr>
                {
                    range_table[page_table - 1].map(value => (
                        <tr style={{ height: '20px' }}>
                            <td>{value.id}</td>
                            <td>{value.description}</td>
                            <td>{value.ipAddress}</td>
                        </tr>
                    ))
                }
            </table>
            <input type={'button'} value={'<'} name={'left'} onClick={set_page}/>
            <input type={'button'} value={'>'} name={'right'} onClick={set_page}/>
        </>
    )

    // const [d_number, set_d_number] = useState('');
    // const [d_name, set_d_name] = useState('');
    // const [d_ip, set_d_ip] = useState('');
    // const [d_mask, set_d_mask] = useState('');
    // const [d_em_row, set_d_em_row] = useState([]);
    //
    // const [newRow, setNewRow] = useState([]);
    // const handler_new_row = (e) => {
    //     const { name, value } = e.target;
    //
    //     // switch (name) {
    //     //     case ('em_row_number'):
    //     //         setNewRow([...])
    //     //         break
    //     //     case ('em_row_name'):
    //     //         set_d_name(value)
    //     //         break
    //     //     case ('em_row_ip'):
    //     //         set_d_ip(value)
    //     //         break
    //     //     case ('em_row_mask'):
    //     //         set_d_mask(value)
    //     //         break
    //     // }
    // }
    //
    // const handler_em_row = (e) => {
    //     const { name, value } = e.target;
    //
    //     switch (name) {
    //         case ('em_row_number'):
    //             set_d_number(value)
    //             break
    //         case ('em_row_name'):
    //             set_d_name(value)
    //             break
    //         case ('em_row_ip'):
    //             set_d_ip(value)
    //             break
    //         case ('em_row_mask'):
    //             set_d_mask(value)
    //             break
    //     }
    // }
    //
    // const add_row = () => {
    //     const new_row = {
    //         id: d_number,
    //         number: d_number,
    //         description: d_name,
    //         ipAddress: d_ip,
    //         mask: d_mask
    //     }
    //
    //     set_d_em_row([...d_em_row, new_row]);
    //
    //     set_d_number('');
    //     set_d_name('');
    //     set_d_ip('');
    //     set_d_mask('');
    // }
    //
    //
    //
    // return (
    //     <div>
    //         <table>
    //             <tr>
    //                 <td>ID</td> <td>Номер</td> <td>Название</td> <td>Адрес</td> <td>Маска</td>
    //             </tr>
    //             {d_em_row.map(row => (
    //                 <tr>
    //                     <td>{row.id}</td> <td>{row.number}</td> <td>{row.description}</td> <td>{row.ipAddress}</td> <td>{row.mask}</td>
    //                 </tr>
    //             ))}
    //             <tr>
    //                 <td>
    //
    //                 </td>
    //                 <td>
    //                     <input
    //                         className={'em_row'}
    //                         name={'em_row_number'}
    //                         onChange={handler_em_row}
    //                         value={d_number}
    //                     />
    //                 </td>
    //                 <td>
    //                     <input
    //                         className={'em_row'}
    //                         name={'em_row_name'}
    //                         onChange={handler_em_row}
    //                         value={d_name}
    //                     />
    //                 </td>
    //                 <td>
    //                     <input
    //                         className={'em_row'}
    //                         name={'em_row_ip'}
    //                         onChange={handler_em_row}
    //                         value={d_ip}
    //                     />
    //                 </td>
    //                 <td>
    //                     <input
    //                         className={'em_row'}
    //                         name={'em_row_mask'}
    //                         onChange={handler_em_row}
    //                         value={d_mask}
    //                     />
    //                 </td>
    //             </tr>
    //         </table>
    //         {/*<button onClick={clear_row}>Очистить</button>*/}
    //         <button onClick={add_row}>Добавить</button>
    //     </div>
    // );

    // const [state, setState] = useState('');
    // const [row, setRow] = useState([])
    //
    // const handler = (e) => {
    //     const { value } = e.target;
    //
    //     setState(value)
    // }
    // const add_row = () => {
    //     setRow([...row, state]);
    //     setState('')
    // }
    //
    // return (
    //     <>
    //         <input onChange={handler} value={state}/>
    //         <button onClick={add_row}>add</button>
    //         {row.map(i => (
    //             <p>{i}</p>
    //         ))}
    //     </>
    // )
};

export default View_table;
