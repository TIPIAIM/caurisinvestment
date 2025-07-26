import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

// Animation fond SVG tirés-tirés
const BgGrid = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.2;

  animation: gridmove 9s linear infinite;
  background: url("data:image/svg+xml;utf8,<svg width='60' height='40' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 60V0H60' stroke='%232A4B7C' stroke-width='0.7' stroke-dasharray='7 5'/></svg>")
    repeat;
  @keyframes gridmove {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 120px 60px;
    }
  }
`;

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  background: linear-gradient(
    180deg,
    ${colors.overlay} 80%,
    ${colors.accentGold} 10%
  );
  display: grid;
  grid-template-columns: 1fr 1fr; // Deux colonnes de taille égale
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  padding: 2rem 3rem; // Ajoutez un padding pour l'espacement

  @media (max-width: 900px) and (min-width: 601px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 1.1rem;
    gap: 2.1rem;
    min-height: 300px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; // Une seule colonne sur mobile
    margin: 0rem 0;
    padding: 1rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  z-index: 2;
  height: 100%;
  @media (max-width: 900px) and (min-width: 601px) {
    padding: 2rem 0;
  }

  @media (max-width: 600px) {
    padding: 1rem;
    order: 2; // Met le texte après l'image sur mobile
  }
`;

// --- Effet cascade/tape par ligne --- //
const rowAnim = keyframes`
  0% { opacity: 0; transform: translateY(28px);}
  60% { opacity: 0.7; transform: translateY(-14px) scale(1.06);}
  100% { opacity: 1; transform: translateY(0);}
`;
const Row = styled(motion.div)`
  font-size: 2.1rem;
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: 0.01em;
  color: ${colors.white};
  margin-bottom: 0.36rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 900px) and (min-width: 601px) {
    font-size: 1.29rem;
    margin-bottom: 0.21rem;
    margin-left: 2.14rem;
  }
  @media (max-width: 600px) {
    font-size: 1.11rem;
    text-align: center;
    margin-bottom: 0.18rem;
    justify-content: center;
  }
  ${({ $delay }) =>
    $delay &&
    css`
      animation: ${rowAnim} 0.72s cubic-bezier(0.7, 0.17, 0.27, 1.06) both;
      animation-delay: ${$delay}s;
    `}
`;

const Highlight = styled.span`
  background: ${colors.navyBg};
  color: ${colors.white};
  padding: 0.08em 0.18em;
  border-radius: 1px;
  margin-right: 0.1rem;
  display: inline-block;
  @media (max-width: 900px) {
    font-size: 1.27rem;
    margin-bottom: 0.21rem;
    justify-content: center;
  }
  @media (max-width: 600px) {
    font-size: 1.46rem;
    text-align: center;
    margin-bottom: 0.18rem;
    justify-content: center;
  }
`;

const Highlight2 = styled(Highlight)`
  background: none;
  color: ${colors.secondaryBlue};
  padding: 0;
  font-weight: 800;
  margin-left: 0.14em;
  margin-right: 0.14em;
`;

const Guarantee = styled.span`
  color: ${colors.accentGold};
  font-weight: 900;
  letter-spacing: 2.1px;
  background: ${colors.accentTurquoise};
  border-radius: 8px;
  padding: 0.09em 0.2em;
  margin: 0 0.14em;
  @media (max-width: 900px) {
    font-size: 1.27rem;
    margin-bottom: 0.21rem;
    justify-content: center;
  }
  @media (max-width: 600px) {
    font-size: 1.46rem;
    text-align: center;
    margin-bottom: 0.18rem;
    justify-content: center;
  }
`;

const GuaranteeBox = styled.div`
  display: inline-block;
  background: #fff;
  color: ${colors.primaryBlue};
  border-radius: 8px;
  padding: 0.14em 0.59em 0.1em 0.59em;
  font-size: 2.5rem;
  font-weight: 900;
  box-shadow: 0 3px 16px 0 rgba(50, 50, 90, 0.06);
  margin-left: 0.16em;
  margin-top: 0.7rem;
  transform: rotate(-8deg);
  letter-spacing: -1px;
  @media (max-width: 900px) {
    font-size: 1.87rem;
    margin-top: 0.32rem;
  }
  @media (max-width: 600px) {
    font-size: 1.57rem;
    margin-top: 0.11rem;
    padding: 0.07em 0.27em 0.06em 0.37em;
  }
`;

// Pour effet apparition "OpenAI"
const useStaggeredRows = (rows, baseDelay = 0.13) => {
  const [shownRows, setShownRows] = useState(Array(rows.length).fill(false));
  useEffect(() => {
    rows.forEach((row, i) => {
      setTimeout(() => {
        setShownRows((prev) => {
          const arr = [...prev];
          arr[i] = true;
          return arr;
        });
      }, i * 700 + 100); // 0.7s interval
    });
    // eslint-disable-next-line
  }, []);
  return shownRows;
};

const ImageBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  max-width: 100%;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 2rem;

  @media (max-width: 900px) and (min-width: 601px) {
    min-width: 160px;
    height: 260px;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    min-width: 120px;
    min-height: 80px;
    max-width: 100%;
    margin: 0 auto;
    order: 1; // Met l'image en premier sur mobile
    padding: 1rem;
  }

  img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 16px;
    filter: drop-shadow(0 10px 32px rgba(32, 40, 90, 0.14));

    @media (max-width: 900px) and (min-width: 601px) {
      height: 130px;
    }

    @media (max-width: 600px) {
      height: 180px;
      max-width: 100%;
      border-radius: 8px;
    }
  }
`;

const rows = [
  <>
    <Highlight>QUAND CAURIS S’ENGAGE</Highlight>
    <Highlight>AVEC VOUS,</Highlight>
  </>,
  <>
    <Highlight2>C’EST VOTRE PLAN D’INVESTISSEMENT</Highlight2>
  </>,
  <>
    QUI EST <Guarantee>GARANTIE</Guarantee> À
  </>,
];

const Home5finl = () => {
  const shown = useStaggeredRows(rows.concat([null]), 0.14);

  return (
    <Wrapper
      as={motion.section}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <BgGrid />
      <Content>
        {rows.map(
          (row, i) =>
            shown[i] && (
              <Row
                key={i}
                $delay={0.2 + i * 0.13}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.57,
                  delay: i * 0.14,
                  type: "spring",
                  stiffness: 350,
                  damping: 24,
                }}
              >
                {row}
              </Row>
            )
        )}
        {shown[rows.length] && (
          <Row
            key="100"
            $delay={0.32 + rows.length * 0.13}
            initial={{ opacity: 0, y: 26, scale: 0.97, rotate: -5 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1.04,
              rotate: -4,
              background: "none",
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 19,
              duration: 0.62,
              delay: 0.23 * rows.length,
            }}
            style={{ marginBottom: 0, marginTop: "0.9rem" }}
          >
            <GuaranteeBox>100%</GuaranteeBox>
          </Row>
        )}
      </Content>
      <ImageBox
        initial={{ opacity: 0, scale: 0.91, x: 30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.67, delay: 0.27, type: "spring" }}
        viewport={{ once: true }}
        whileHover={{
          scale: 1.048,
          y: -7,
          boxShadow: "0 16px 44px 0 rgba(41,70,180,0.13)",
        }}
      >
        {/* Tu peux remplacer cette image par n'importe quelle image de ton imagess.js */}
        <img src={imagess.corimercii} alt="Plan Garantie" />
      </ImageBox>
    </Wrapper>
  );
};

export default Home5finl;
