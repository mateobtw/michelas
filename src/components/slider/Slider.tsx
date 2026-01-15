import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../../data";
// import { useNavigate } from "react-router-dom"; // Opcional si quieres navegar al hacer click

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Arrow = styled.div<{ direction: "left" | "right" }>`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.body};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.direction === "left" ? "10px" : "unset")};
  right: ${(props) => (props.direction === "right" ? "10px" : "unset")};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  &:hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div<{ slideIndex: number }>`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div<{ bg: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.gradient};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #047d40;
    color: white;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  // const navigate = useNavigate();

  const handleClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>VER AHORA</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;