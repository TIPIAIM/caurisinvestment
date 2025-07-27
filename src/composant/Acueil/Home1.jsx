import React, { useState, useEffect, lazy, Suspense, memo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import SEO from "../../SEO"; // <== AJOUT SEO !

// Fondànimer : fond animé SVG, lazy et mémoïsé
const FondànimerMemo = memo(() => {
  const AnimatedGrid = styled(motion.svg)`
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  `;
  return (
    <AnimatedGrid
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      initial={{ x: -30, y: -25, opacity: 0.3 }}
      animate={{ x: 30, y: 25, opacity: 0.7 }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {[...Array(40)].map((_, i) => (
        <line
          key={"v" + i}
          x1={i * 30}
          y1="0"
          x2={i * 30}
          y2="800"
          stroke="#2A4B7C"
          strokeWidth="0.6"
          opacity="0.38"
        />
      ))}
      {[...Array(28)].map((_, i) => (
        <line
          key={"d" + i}
          x1="0"
          y1={i * 30}
          x2="1200"
          y2={i * 30}
          stroke="#2A4B7C"
          strokeWidth="0.6"
          opacity="0.27"
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <line
          key={"diag" + i}
          x1={i * 120}
          y1="0"
          x2="0"
          y2={i * 80}
          stroke="#2A4B7C"
          strokeWidth="0.5"
          opacity="0.13"
        />
      ))}
    </AnimatedGrid>
  );
});
const Fondànimer = lazy(() => Promise.resolve({ default: FondànimerMemo }));

// --- Styled Components ---
const HomeWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  background: linear-gradient(
    120deg,
    ${colors.overlay} 60%,
    ${colors.primaryBlue} 100%
  );
  overflow: hidden;
  padding: 0;
  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 4rem;
  }
  @media (max-width: 600px) {
    font-size: 2.1rem;
    margin-top: 1rem;
  }
`;

const ContentLeft = styled.div`
  flex: 1;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 8vw;
  text-align: left;
  @media (max-width: 900px) {
    align-items: flex-start;
    text-align: left;
    padding: 3rem 4vw 0 4vw;
    width: 100%;
  }
  @media (max-width: 600px) {
    padding-left: 8vw;
    margin-top: 3rem;
  }
`;

const Slogan = styled.p`
  color: ${colors.white};
  font-size: 1.15rem;
  opacity: 0.94;
  text-align: left;
  margin-bottom: 0.4rem;
  margin-top: 2.5rem;
  letter-spacing: 0.4px;
  @media (max-width: 900px) {
    text-align: center;
    padding: 0rem;
    margin: 2rem auto 0rem auto;
  }
  @media (max-width: 600px) {
    text-align: center;
    padding: 0rem;
    margin: 1rem 2rem 0rem auto;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.9rem;
  font-weight: 800;
  line-height: 1.12;
  color: ${colors.white};
  margin: 0 0 1.4rem 0;
  span {
    color: ${colors.accentGold};
  }
  @media (max-width: 900px) {
    font-size: 4rem;
    padding: 2.5rem;
    text-align: center;
  }
  @media (max-width: 600px) {
    font-size: 2.2rem;
    text-align: center;
    padding: 0rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const SubText = styled.p`
  color: ${colors.white};
  font-size: 1.12rem;
  opacity: 0.92;
  max-width: 520px;
  margin-bottom: 2.3rem;
  @media (max-width: 900px) {
    margin: 0 auto 3.3rem auto;
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 900px) {
    justify-content: center;
    width: 100%;
  }
`;

const CTA = styled.a`
  background: linear-gradient(90deg, ${colors.accentGold} 50%, #ffe5a3 100%);
  color: ${colors.primaryBlue};
  font-weight: 700;
  font-size: 1.09rem;
  border-radius: 10px;
  padding: 0.85rem 2rem;
  margin-right: 0.6rem;
  box-shadow: 0 4px 24px rgba(200, 170, 110, 0.11);
  text-decoration: none;
  border: none;
  outline: none;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover {
    background: ${colors.accentTurquoise};
    color: ${colors.accentGold};
    border: 1px solid ${colors.accentGold};
    box-shadow: 0 4px 24px rgba(21, 51, 92, 0.13);
  }
`;

const CTA2 = styled.a`
  background: rgba(255, 255, 255, 0.15);
  color: ${colors.white};
  font-weight: 700;
  font-size: 1.09rem;
  border-radius: 10px;
  padding: 0.85rem 2rem;
  border: 1px solid ${colors.accentTurquoise};
  text-decoration: none;
  margin-right: 0.7rem;
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    background: ${colors.white};
    color: ${colors.primaryBlue};
    border: 2px solid ${colors.accentGold};
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8vw;
  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    padding: 2.7rem 2vw 0 2vw;
  }
`;

const GlassImageBox = styled(motion.div)`
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 16px;
  padding: 0.9rem;
  max-width: 450px;
  width: 450px;
  height: 400px;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  @media (max-width: 600px) {
    max-width: 90vw;
    width: 400px;
    height: 400px;
    min-height: 190px;
    border-radius: 18px;
    padding: 0.4rem;
  }
`;

// --- Animations ---
const imageVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 120 : -120,
    y: -18,
    opacity: 0,
    scale: 0.98,
    rotate: dir > 0 ? 2 : -2,
  }),
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 22 },
      opacity: { duration: 0.36 },
      scale: { duration: 0.38 },
      rotate: { duration: 0.29 },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? -90 : 90,
    y: 20,
    opacity: 0,
    scale: 0.89,
    rotate: dir > 0 ? -3 : 3,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 22 },
      opacity: { duration: 0.29 },
      scale: { duration: 0.31 },
      rotate: { duration: 0.32 },
    },
  }),
};

const hoverVariants = {
  hover: {
    scale: 1.045,
    rotate: -2.3,
    boxShadow: "0 8px 38px 0 rgba(21, 51, 92, 0.18)",
    transition: {
      scale: { duration: 0.24, type: "spring", stiffness: 240, damping: 12 },
      rotate: { duration: 0.22 },
      boxShadow: { duration: 0.18 },
    },
  },
};

// --- Composant principal ---
const Home1Component = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const images = [
    imagess.businesskey,
    imagess.businesskey2,
    imagess.businesskey3,
    imagess.businesskey4,
    imagess.gestionimobetconsierge,
    imagess.solde,
    imagess.coris_route_et_màison_portefe,
    imagess.coris_meuble,
    imagess.coris_bulding,
    imagess.coris_engàgement,
    imagess.coris_gouvernence,
    imagess.immeuble2,
    imagess.corimercii,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* SEO pour cette page */}
      <SEO
        title="Cauris Investment - Plateforme immobilière et investissement en Guinée"
        description="Investissez dans la croissance réelle : résidences, infrastructures éducatives, gestion locative et projets à impact en Guinée avec Cauris Investment."
        image={imagess.coris_gouvernence}
        keywords={[
          "immobilier Guinée",
          "investissement immobilier",
          "gestion locative",
          "promotion immobilière",
          "valorisation patrimoine",
          "projets immobiliers Guinée",
          "résidences en Guinée",
          "infrastructures Guinée",
          "investissement durable",
          "infrastructures éducatives",
          "projets immobiliers",
          "Caurisinvestment",
          "Cauris Guinée",
          "Cauris Investment",
        ]}
        url="https://www.caurisinvestment.com/"
      />
      <HomeWrapper>
        <Suspense fallback={null}>
          <Fondànimer />
        </Suspense>
        <ContentLeft>
          <Slogan>Plateforme immobilière & d'investissement • Guinée</Slogan>
          <MainTitle>
            <span>Valorisez</span> vos investissements <br />
            en Guinée
          </MainTitle>
          <SubText>
            Investissez dans la croissance réelle : résidences, infrastructures
            éducatives, gestion locative et projets à impact. <br />
            Cauris Investment vous accompagne sur toute la chaîne de valeur
            immobilière.
          </SubText>
          <BtnRow>
            <CTA href="/presentation">Cauris ?</CTA>
            <CTA2 href="/contact">Discutons</CTA2>
          </BtnRow>
        </ContentLeft>
        <ImageWrapper>
          <GlassImageBox
            whileHover="hover"
            variants={hoverVariants}
            initial={false}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Projet Cauris ${currentImageIndex + 1}`}
                loading="lazy"
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.59, ease: "easeInOut" }}
                style={{ width: "100%", height: "100%", borderRadius: "1px" }}
              />
            </AnimatePresence>
          </GlassImageBox>
        </ImageWrapper>
      </HomeWrapper>
    </>
  );
};

const Home1 = memo(Home1Component);

export default Home1;
