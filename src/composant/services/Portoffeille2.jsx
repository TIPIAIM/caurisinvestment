import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.section`
  width: 100%;
  min-height: 100vh;
background: linear-gradient(
    -60deg,
    ${colors.overlay} 87%,
    ${colors.accentGold} 60%
  );  padding: 0 clamp(1.5rem, 3vw, 5rem);
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  padding: 4vw 0;
  gap: 2vw;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 3vw 0;
  }
`;

const Content = styled(motion.div)`
  padding: 3vw 0 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  animation: ${fadeInUp} 1.2s cubic-bezier(0.55, 0.06, 0.22, 1) both;
  margin: 0 auto;
  width: 90%;

  @media (max-width: 1100px) {
    padding: 3vw 1.5rem;
    align-items: center;
    text-align: center;
  }
  @media (max-width: 700px) {
    padding: 6vw 1.5rem 3vw;
    text-align: justify;
  }
       @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-weight: 800;
  color: ${colors.accentGold};
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 10px #191a18;
  line-height: 1.15;
  position: relative;
  width: auto;
  margin-right: 1rem;

  @media (max-width: 1100px) {
    text-align: left;
    margin-bottom: 1.5rem;
  }

  &::after {
    content: "";
    display: block;
    margin: 0.7rem 0 0 0;
    height: 3px;
    width: 60px;
    border-radius: 2px;
    background: linear-gradient(90deg, ${colors.accentGold} 50%, transparent 100%);
    opacity: 0.8;

    @media (max-width: 1100px) {
      margin: 0 1rem;
    }
  }
`;

const CollapsibleContent = styled(motion.div)`
  overflow: hidden;
`;

const Paragraph = styled.p`
  color: ${colors.white};
  font-size: clamp(1rem, 1.1vw, 1.1rem);
  line-height: 1.7;
  margin-bottom: 2.1rem;
  width: 100%;
  text-align: justify;
  hyphens: auto;

  @media (max-width: 1100px) {
    margin-bottom: 1.5rem;
  }
`;

const RefTitle = styled.span`
  color: ${colors.accentGold};
  font-size: clamp(1.1rem, 1.15vw, 1.15rem);
  font-weight: 700;
  margin-bottom: 0.6rem;
  display: block;
  letter-spacing: 0.01em;
  width: 100%;

  @media (max-width: 1100px) {
    text-align: left;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  width: 100%;
`;

const ListItem = styled.li`
  color: ${colors.white};
  font-size: clamp(0.98rem, 1.01vw, 1.01rem);
  margin-bottom: 1.05rem;
  display: flex;
  align-items: flex-start;
  gap: 0.68rem;
  text-align: left;
  hyphens: auto;

  @media (max-width: 1100px) {
    justify-content: center;
  }

  &::before {
    content: "🗝️";
    color: ${colors.accentGold};
    font-size: 1.13rem;
    margin-right: 0.55rem;
    display: inline-block;
    margin-top: 0.01em;
    flex-shrink: 0;
  }
`;

const RightImgBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0;

  @media (max-width: 1100px) {
    justify-content: center;
    padding: 0 1.5rem 3vw;
    margin-bottom: 2vw;
  }
`;

const StyledImg = styled.img`
  width: 96%;
  max-width: 670px;
  min-width: 0;
  border-radius: 22px;
  box-shadow: 0 10px 38px 0 rgba(20, 32, 54, 0.17);
  border: 2px solid ${colors.accentGold}33;
  object-fit: cover;
  background: #161616;

  @media (max-width: 1100px) {
    width: 100%;
    max-width: 600px;
  }
  @media (max-width: 600px) {
    border-radius: 13px;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.accentGold};
  font-size: clamp(1.3rem, 1.5vw, 1.5rem);
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// Data
const PORTFOLIO_ITEMS = [
  "Programme social 260 unités – F3 & F4 (périphérie de Conakry)",
  "Opérations d'achat/revente de terrains destinés à l'habitat collectif",
  "Missions d'étude pour implantation de complexes éducatifs",
  "Portefeuille résidentiel dispersé"
];

const PortefeuilleReferences = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = (e) => {
    e.stopPropagation();
    setIsCollapsed(prev => !prev);
  };

  return (
    <Container>
      <Grid>
        <Content
          initial={{ opacity: 0, x: -55 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, type: "spring", delay: 0.08 }}
          viewport={{ once: true }}
        >
          <TitleContainer onClick={() => setIsCollapsed(prev => !prev)}>
            <Title>Portefeuille & Références Sélectives</Title>
            <IconButton 
              onClick={toggleCollapse}
              aria-label={isCollapsed ? "Développer" : "Réduire"}
            >
              {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            </IconButton>
          </TitleContainer>

          <CollapsibleContent
            initial={false}
            animate={{
              height: isCollapsed ? 0 : "auto",
              opacity: isCollapsed ? 0 : 1,
              visibility: isCollapsed ? "hidden" : "visible"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Paragraph>
              Cauris Investment détient et/ou gère plusieurs biens immobiliers répartis entre la capitale Conakry et différentes régions de Guinée. Notre portefeuille comprend des terrains urbanisables, des actifs résidentiels en développement, ainsi que des opportunités en zones minières et corridors économiques.
            </Paragraph>
            
            <RefTitle>Références & Projets notables :</RefTitle>
            <List>
              {PORTFOLIO_ITEMS.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </CollapsibleContent>
        </Content>

        <RightImgBox
          initial={{ opacity: 0, x: 65 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.25, type: "spring", delay: 0.17 }}
          viewport={{ once: true }}
        >
          <StyledImg
            src={imagess.imàgeporto || "/img/ddd.PNG"}
            alt="Vue portefeuille immobilier"
            loading="lazy"
          />
        </RightImgBox>
      </Grid>
    </Container>
  );
};

export default PortefeuilleReferences;