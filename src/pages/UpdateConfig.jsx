import React, { useState } from 'react';
import { useFilePicker } from "use-file-picker";
import axios from "axios";
import { Button } from "@material-ui/core";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


import './style/pages.css';

import VlanTable from "../components/tables/VlanTable";
import InterfaceTable from "../components/tables/InterfaceTable";
import PandingTable from "../components/tables/PandingTable";

//TODO 1.  Реализовать проверку на существование номера vlan
//TODO 2.  Реализовать проверку на пустные значения
//TODO 3.  Реализовать сортировку по номеру при каждом добавлении новой строки
//TODO 4.  Сделать возможность редактирования каждой ячейки таблицы
//TODO 5.  + Сделать пагинацию таблицы
//TODO 6.  Исправить ошибку при удалении нового добавленного vlan
//TODO 7.  Исправить ошибку при удалении всех строк с одной страницы
//TODO 8.  Добавить поиск по таблице
//TODO 9.  Добавить возможность редактирования/удаления несколько строк
//TODO 10. При изменении диапазона строк заблокировать динамический выбор остальных строк
//TODO 11. При изменении состояния главного чекбокса - изменять все чекбоксы

const UpdateConfig = () => {
    const { openFilePicker, filesContent } = useFilePicker({
        accept: '.txt',
    });

    const [load_req, set_load_req] = useState(true);
    const [state, setState] = useState({});

    if (filesContent[0]) {
        if (load_req) {
            axios.post('/updateconfig', {
                content: filesContent[0].content
            })
                .then(res => {
                    setState(res.data.res)
                    set_load_req(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{ backgroundColor: '#16a085', color: '#fff' }} onClick={() => openFilePicker()}>
                Загрузить файл
            </Button>

            { load_req ? <p style={{ fontFamily: "Arial, sans-serif" }}>| Откройте файл с конфигурацией |</p> : <PandingTable state={state}/> }
        </div>
    );
};

export default UpdateConfig;