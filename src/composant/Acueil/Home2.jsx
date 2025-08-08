import React, { Suspense, lazy, memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import Fondànimer from "./Fondànimer"; // Animation de fond, comme HOME1
import { imagess } from "../../assets/imagess";

// Lazy loading des composants lourds
const Home3 = lazy(() => import("./Home3"));
const DomainesIntervention = lazy(() => import("./Home4dominterv"));
const Home5finl = lazy(() => import("./Home5finl"));

// Mets ici l’image Cloudinary de ton choix
const IMAGE_URL = imagess.coris_gouvernence;

// ... (les styled-components restent inchangés)
const Home2Wrapper = styled(motion.section)`
  position: relative;
  min-height: 92vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${colors.overlay} 65%,
    ${colors.accentGold} 60%
  );
  overflow: hidden;
  gap: 2rem;
  padding: 5vw 0;
  @media (max-width: 900px) {
    flex-direction: row;
    gap: 1.2rem;
    min-height: unset;
    padding: 2.5rem 2rem;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.2rem;
    min-height: unset;
    padding: 2.2rem 0;
  }
`;

const BlocLeft = styled(motion.div)`
  background: linear-gradient(
    120deg,
    ${colors.lightGrey} 90%,
    ${colors.accentTurquoise} 81%
  );
  backdrop-filter: blur(3.5px);
  border-radius: 2px;
  box-shadow: 0 8px 40px 0 rgba(42, 75, 124, 0.11);
  padding: 2.2rem 1.8rem 2.2rem 2.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 265px;
  max-width: 370px;
  width: 100%;
  z-index: 2;
  @media (max-width: 1200px) {
    max-width: 300px;
    padding-left: 1.2rem;
  }
  @media (max-width: 900px) {
    min-width: 0;
    max-width: none;
    width: 85%;
    background: linear-gradient(
      120deg,
      ${colors.lightGrey} 90%,
      ${colors.accentTurquoise} 90%
    );
    border-radius: 2px;
    padding: 1.3rem 1rem 1.2rem 1rem;
    align-items: flex-start;
    box-shadow: 0 6px 32px 0 rgba(21, 51, 92, 0.1);
  }
`;

const Title = styled.div`
  font-size: 1.58rem;
  font-weight: 800;
  color: ${colors.navyBg};
  margin-bottom: 0.42rem;
  letter-spacing: 0.01em;
`;

const List = styled.ul`
  list-style: disc inside;
  color: ${colors.navyBg};
  font-size: 1.09rem;
  font-weight: 500;
  margin: 0 0 1.3rem 2rem;
  padding: 0;
  line-height: 1.63;
  & > li {
    margin-bottom: 0.18rem;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
`;

const SocialDot = styled.span`
  color: ${({ color }) => color || colors.primaryBlue};
  font-size: 18px;
`;

const SiteLink = styled.a`
  color: ${colors.primaryBlue};
  font-size: 1.03rem;
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.03rem;
  &:hover {
    text-decoration: underline;
  }
`;

const GlassImageBox = styled(motion.div)`
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.17);
  border-radius: 8px;
  box-shadow: 0 14px 52px 0 rgba(21, 51, 92, 0.13);
  padding: 0.65rem;
  max-width: 530px;
  width: 430px;
  height: 420px;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 2;
  @media (max-width: 1200px) {
    height: 170px;
    max-width: 100vw;
    width: 100vw;
  }
  @media (max-width: 900px) {
    border-radius: 15px;
    height: 115px;
    width: 100vw;
    padding: 0.3rem;
  }
  @media (max-width: 600px) {
    border-radius: 0px;
    max-width: 530px;
    background: rgba(255, 255, 255, 0);
    width: 330px;
    height: 320px;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  min-width: 0;
  min-height: 0;
  transition: box-shadow 0.22s cubic-bezier(0.22, 0.68, 0.52, 1.01);
`;

// Fallback Loader simple
const Loader = styled.div`
  color: ${colors.primaryBlue};
  padding: 3.5rem 0;
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

// ----------- HOME2 AVEC LAZY & SUSPENSE -------------
const Home2 = memo(() => (
  <>
    <Home2Wrapper
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.67, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Fondànimer />
      <BlocLeft
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.63, delay: 0.08, type: "spring" }}
        whileHover={{
          scale: 1.017,
          y: -5,
          boxShadow: "0 14px 44px 0 rgba(50,70,120,0.13)",
        }}
      >
        <Title>Pourquoi Investir chez Nous.</Title>
        <List>
          <li>Accès foncier sécurisé</li>
          <li>Pipeline réel & immédiat</li>
          <li>Expertise locale éprouvée</li>
          <li>Modèles flexibles</li>
          <li>Marché porteur</li>
          <li>Impact et Inclusion</li>
        </List>
        <Socials>
          <SocialDot color={colors.primaryBlue}>
            <b>●</b>
          </SocialDot>
          <SocialDot color={colors.black}>
            <b>●</b>
          </SocialDot>
          <SocialDot color={colors.accentGold}>
            <b>●</b>
          </SocialDot>
        </Socials>
        <SiteLink href="https://www.caurisinvestment.com/contact">
          Contact@caurisinvestment.com
        </SiteLink>
      </BlocLeft>
      <GlassImageBox
        whileHover={{
          scale: 1.025,
          y: -10,
          boxShadow: "0 18px 44px 0 rgba(45,80,130,0.14)",
        }}
        transition={{ duration: 0.27, type: "spring" }}
      >
        <StyledImage
          src={IMAGE_URL}
          alt="Immeuble Cauris"
          whileHover={{
            scale: 1.035,
            rotate: -2.3,
            boxShadow: "0 10px 36px 0 rgba(25,25,49,0.14)",
          }}
          transition={{ duration: 0.27, type: "spring" }}
        />
      </GlassImageBox>
    </Home2Wrapper>

    <Suspense fallback={<Loader>Chargement de l'expérience...</Loader>}>
      <Home3 />
      <Home5finl />
      <DomainesIntervention />
    </Suspense>
  </>
));

export default Home2;
