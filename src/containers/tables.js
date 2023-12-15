import React, { useState } from 'react';
import { v4 } from "uuid";

const handler_table = ({ data, class_name,  }) => {
    // - [Обновление данных]
    const local_storage = JSON.parse(localStorage.getItem(class_name));
    const [rows, set_rows] = useState(data ? (local_storage ? local_storage : data) : []);

    // - [Обработчик данных новой строки]
    const [new_row, set_new_row] = useState({});
    const handler_new_row = (e) => {
        const { name, value } = e.target;

        set_new_row({
            ...new_row,
            id: v4(),
            [name]: value
        })
    }








    const arr = [];
    let obj = {
        class_name: class_name,
        data: data,
        rows: rows,
        set_rows: set_rows
    }
    arr.push(obj)

    return arr
}

export default handler_table;