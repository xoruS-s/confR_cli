import React from 'react';
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import VlanTable from "./VlanTable";
import InterfaceTable from "./InterfaceTable";
import RemoteAccessTable from "./RemoteAccessTable";

const PandingTable = ({ state }) => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', border: '1px solid red' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 3, borderColor: 'divider', selectedColor: '#2c3e50', fontWeight: '800' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="VLAN" value="1" />
                        <Tab label="Порты" value="2" />
                        <Tab label="Удаленный доступ" value="3" />
                        <Tab label="Другое" value="4" />
                    </TabList>
                </Box>
                <TabPanel style={{ padding: '0' }} value="1"><VlanTable data={state['data_vlan']}/></TabPanel>
                <TabPanel style={{ padding: '0' }} value="2"><InterfaceTable data={state['data_interface']}/></TabPanel>
                <TabPanel style={{ padding: '0' }} value="3"><RemoteAccessTable/></TabPanel>
            </TabContext>
            {/*<button>save</button>*/}
        </div>
    );
};

export default PandingTable;
