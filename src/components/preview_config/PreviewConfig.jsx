import React, {useEffect, useState} from 'react';

// import { rows as vlan_data } from '../tables/VlanTable'

const PreviewConfig = () => {
    const [storage, set_storage] = useState([]);

    useEffect(() => {
        const remote_access_data = JSON.parse(localStorage.getItem('remote_access_table'));
        const vlan_data = JSON.parse(localStorage.getItem('vlan_table'));

        set_storage([...storage, remote_access_data ? remote_access_data : [], vlan_data ? vlan_data : []])

    }, [])
    console.log(storage)

    return (
        <div>
            {storage.map((v, i) => (
                    <div key={i}>
                        {v.map((el, i) => (
                                <div key={i}>
                                    <h3>{el.name}</h3>
                                    <p>{el.description}</p>
                                </div>
                            ))}
                    </div>
                ))}
        </div>
    );
};

export default PreviewConfig;
