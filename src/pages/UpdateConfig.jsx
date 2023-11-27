import React, { useState } from 'react';
import { useFilePicker } from "use-file-picker";
import axios from "axios";
import { Button } from "@material-ui/core";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


import './style/pages.css';

import VlanTable from "../components/tables/VlanTable";
import InterfaceTable from "../components/tables/InterfaceTable";
import PandingTable from "../components/tables/PandingTable";

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