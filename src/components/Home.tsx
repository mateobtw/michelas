import React from 'react';
import Navbar from './navbar/Navbar';
import Slider from './slider/Slider';
import Announcement from './announcement/Announcement';

const Home: React.FC = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
};

export default Home;