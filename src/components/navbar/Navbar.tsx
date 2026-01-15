import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/ProductContext';
import { ProductContextState } from '../../types/Product';

// --- ESTILOS (Styled Components) ---
const Container = styled.div`
  height: 100px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); 
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  position: relative; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  letter-spacing: 3px;
`;

// Efecto espejo para el logo (opcional, estilo visual del taller)
const LogoMirror = styled.h1`
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  letter-spacing: 3px;
  transform: scaleY(-1); 
  opacity: 0.2;
  position: absolute;
  top: 35px; /* Ajusta según la altura de tu fuente */
  background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
`;

// --- COMPONENTE ---
const Navbar: React.FC = () => {
  const { products, itemSearch } = useContext(Context) as ProductContextState;
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  // Calcular items totales en el carrito
  const updateCartAmount = (): number => {
    let itemsInCart = 0;
    products.forEach((product) => {
      itemsInCart += product.amount;
    });
    return itemsInCart;
  };

  // Funciones de navegación
  const navigateToHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const navigateToShop = () => {
    navigate('/shop');
    window.scrollTo(0, 0);
  };

  const navigateToLogin = () => {
    // Lógica simple: si ya hay un usuario "logueado" (simulado), ir al perfil
    if (localStorage.getItem("curUserL") === "true") {
        navigate('/profile');
    } else {
        navigate('/login');
    }
    window.scrollTo(0, 0);
  };

  const navigateToCart = () => {
    navigate('/cart');
    window.scrollTo(0, 0);
  };

  // Manejo de la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current) {
      itemSearch(searchRef.current.value);
      searchRef.current.value = ''; // Limpiar input
      navigateToShop(); // Redirigir a la tienda para ver resultados
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <form onSubmit={handleSearch} style={{display: 'flex'}}>
                <Input placeholder="Buscar..." ref={searchRef} />
                <Button type="submit">
                    <Search style={{ color: "gray", fontSize: 16 }} />
                </Button>
            </form>
          </SearchContainer>
        </Left>

        <Center>
          <Logo onClick={navigateToHome}>PoliTemu</Logo>
          <LogoMirror onClick={navigateToHome}>PoliTemu</LogoMirror>
        </Center>

        <Right>
          <MenuItem onClick={navigateToShop}>
            <StorefrontIcon />
          </MenuItem>
          <MenuItem onClick={navigateToLogin}>
            <AccountCircleIcon />
          </MenuItem>
          <MenuItem onClick={navigateToCart}>
            <Badge badgeContent={updateCartAmount()} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

// import React from 'react';
// import {Link } from 'react-router-dom';

// const Navbar = () => {
//     return (
//         <nav>
//             <ul>
//                 <li>
//                     <Link to="/">Inicio</Link>
//                 </li>
//                 <li>
//                     <Link to="/productos">Productos</Link>
//                 </li>
//                 <li>
//                     <Link to="/contacto">Contacto</Link>
//                 </li>
//             </ul>
//         </nav>
//     );
// }

// export default Navbar;