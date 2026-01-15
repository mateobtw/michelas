import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ProductCard from "../productCard/ProductCard";
import { Context } from "../../context/ProductContext";
import { Product, ProductContextState } from "../../types/Product";
import axios from "axios";
import { productsData } from "../../data";

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  justify-content: center;
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
`;

const UpArrowWrapper = styled.div`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  z-index: 2;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10%;
  left: 5%;
  cursor: pointer;
`;

const ProductLayout: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggleVisible = () => {
    if (ref.current !== null) {
      const scrolled: number = ref.current.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    }
  };

  const handleScrollToTop = () => {
    if (ref.current !== null) {
      ref.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  window.addEventListener("scroll", toggleVisible, false);

  const { search } = useContext(Context) as ProductContextState;
  const [productData, setProductData] = useState<Product[]>(productsData);

  async function getProducts() {
    try {
      const { data } = await axios.get<Product[]>(
        "http://localhost:8000/products/read/all",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (data && data.length > 0) {
        setProductData(data);
        return data;
      }
      // Si la API no devuelve nada, mantener los productos locales
      return productsData;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
      } else {
        console.log("unexpected error: ", error);
      }
      // En caso de error, usar los productos locales
      setProductData(productsData);
      return productsData;
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const div = ref.current;
    if (div !== null) {
      div.addEventListener("scroll", toggleVisible);
    }
  }, [toggleVisible, productData]);

  return (
    <Container onScroll={toggleVisible} ref={ref}>
      <Wrapper>
        {search == ""
          ? productData.map((product, index) => {
              return (
                <ProductCard
                  key={index}
                  itemId={product.itemId}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  amount={1}
                />
              );
            })
          : productData
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    itemId={product.itemId}
                    imageUrl={product.imageUrl}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    amount={1}
                  />
                );
              })}

        <UpArrowWrapper onClick={handleScrollToTop}>
          <KeyboardArrowUpIcon
            style={{
              zIndex: "2",
              fontSize: "2.5em",
              backgroundColor: "#ccc",
              borderRadius: "50%",
              color: "gray",
              display: visible ? "inline" : "none",
            }}
          />
        </UpArrowWrapper>
      </Wrapper>
    </Container>
  );
};

export default ProductLayout;
