import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to={'/'} > home </Link>
            <Link to={'/createconfig'} > create </Link>
            <Link to={'/updateconfig'} > update </Link>
        </div>
    );
};

export default Home;