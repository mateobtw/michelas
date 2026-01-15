// import React from 'react';
// import Navbar from './navbar/Navbar';
// import Slider from './slider/Slider';
// import Announcement from './announcement/Announcement';

// const Home: React.FC = () => {
//     return (
//         <div>
//             <Announcement />
//             <Navbar />
//             <Slider />
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//     },
// };

// export default Home;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Context } from '../context/UserContext';
import { UserContextState } from '../types/User';

import Navbar from './navbar/Navbar';
import Announcement from './announcement/Announcement';

import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme';
import { GlobalStyles } from './globalStyles';

import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import Slider from './slider/Slider';
import { Route, Routes } from 'react-router-dom';
import Cart from './cart/Cart';
import Login from './loginRegister/Login';
import CheckoutCompleted from './checkoutCompleted/CheckoutCompleted';
import { UserProfile } from './userProfile/UserProfile';
import ProductLayout from './productLayout/ProductLayout';

/* =========================
   Styled Components
   ========================= */

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ThemeButton = styled.button`
  position: fixed;
  z-index: 3;
  bottom: 60px;
  right: 20px;
  background: transparent;
  cursor: pointer;
  border: none;
`;

/* =========================
   Component
   ========================= */

const Home: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || stored === 'light' ? stored : 'light';
  });

  const themeToggler = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const id: number = Number(localStorage.getItem('curUser'));
  const { updateCurrentUser, logged } = useContext(Context) as UserContextState;

  const log = localStorage.getItem('curUserL') === 'true';

  const getTheUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/users/user', {
        headers: { 'Access-Control-Allow-Origin': '*' },
        params: { id: id },
      });

      const tUser = res.data;
      if (tUser) {
        updateCurrentUser(tUser);
      }
    } catch (error) {
      // TODO: manejo de error
    }
  };

  useEffect(() => {
    getTheUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ThemeButton onClick={themeToggler}>
        {theme === 'light' ? (
          <DarkModeOutlined
            style={{
              fontSize: '3em',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              color: '#333',
            }}
          />
        ) : (
          <LightModeOutlined
            style={{
              fontSize: '3em',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              color: 'white',
            }}
          />
        )}
      </ThemeButton>

      <Container>
        <Announcement />
        <Navbar />
        {/* <Slider /> */}
        <Routes>
          <Route path="/" element={<Slider />} />
          <Route path="/shop" element={<ProductLayout />} />
          {(logged || log) && localStorage.getItem("curUserL") === "true" ? (
            <Route path="/profile" element={<UserProfile />} />
          ) : null}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<CheckoutCompleted />} />
        </Routes>

      </Container>
    </ThemeProvider>
  );
};

export default Home;
