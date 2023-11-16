import React from 'react';
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import VlanTable from "./VlanTable";
import InterfaceTable from "./InterfaceTable";

const PandingTable = ({ state }) => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', border: '1px solid red' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', selectedColor: '#2c3e50' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="VLAN" value="1" />
                        <Tab label="Интерфейсы" value="2" />
                    </TabList>
                </Box>
                <TabPanel style={{ padding: '0' }} value="1"><VlanTable data={state['data_vlan']}/></TabPanel>
                <TabPanel value="2"><InterfaceTable data={state['data_interface']}/></TabPanel>
            </TabContext>
            {/*<button>save</button>*/}
        </div>
    );
};

export default PandingTable;
