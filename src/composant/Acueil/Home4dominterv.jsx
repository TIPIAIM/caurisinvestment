import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../../Styles/colors";
import { Euro, Handshake, School } from "lucide-react";

// Fond SVG animé (tirés-tirés)
const BgGrid = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.16;
  animation: gridmove 9s linear infinite;
  background: url("data:image/svg+xml;utf8,<svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 60V0H60' stroke='%232A4B7C' stroke-width='0.7' stroke-dasharray='7 5'/></svg>")
    repeat;
  @keyframes gridmove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 120px 60px;
    }
  }
`;

// --- Animations --- //
const dashIn = keyframes`
  from { width: 0; opacity: 0.3; }
  to { width: 90%; opacity: 1; }
`;
const float = keyframes`
  0% { transform: translateY(0); }
  48% { transform: translateY(-8px) scale(1.05);}
  100% { transform: translateY(0);}
`;
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(250,212,82,0.12);}
  60% { box-shadow: 0 0 0 12px rgba(250,212,82,0.08);}
  100% { box-shadow: 0 0 0 0 rgba(250,212,82,0.12);}
`;

// --- Badges & Data --- //
const domaines = [
  {
    badge: "",
    icon: <Handshake size={26} strokeWidth={2.2} color={colors.primaryBlue} />,
    title: "Acquisition & cession d’actifs immobiliers",
    points: [
      "Achat, valorisation et revente d’immeubles, résidences, terrains stratégiques.",
      "Montage de dossiers de titre foncier, lotissement, viabilisation.",
    ],
  },
  {
    badge: "",
    icon: <Euro size={26} strokeWidth={2.2} color={colors.primaryBlue} />,
    title: "Gestion immobilière & conciergerie",
    points: [
      "Gestion locative complète (baux, encaissements, maintenance).",
      "Services premium de conciergerie (accueil expatriés, entretien, services à la carte).",
    ],
  },
  {
    badge: "",
    icon: <School size={26} strokeWidth={2.2} color={colors.primaryBlue} />,
    title: "Infrastructures éducatives (écoles & campus)",
    points: [
      "Études d’acquisition foncière pour écoles privées.",
      "Co-développement construction/gestion sous contrat de long terme.",
    ],
  },
];

// --- Styled Components --- //
const Section = styled(motion.section)`
  position: relative;
  min-height: 80vh;
  width: 100%;
  background: linear-gradient(
    100deg,
    ${colors.accentGold} 1%,
    ${colors.overlay} -20%
  );
  overflow: hidden;
  z-index: 1;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0 2.1rem 3rem 2.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    padding: 0 1.18rem 2.5rem 1.18rem;
  }
  @media (max-width: 600px) {
    padding: 0 0.43rem 1.7rem 0.43rem;
    width: 80%;
  }
`;

const BigTitle = styled(motion.h2)`
  font-size: 2.8rem;
   color: ${colors.navyBg};
  letter-spacing: 0.01em;

  font-weight: 900;
  text-align: center;
  margin-top: 5.1rem;
   padding-bottom: 5.28rem;
  background: none;
  border-bottom: 3px solid ${colors.accentGold};
  @media (max-width: 900px) {
    font-size: 2.62rem;
    margin-bottom: 1.1rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin: 2.5rem 5rem 5rem 5rem;
    //  max-width: 100px;
    text-align: center;

    padding-bottom: 0.86rem;
    margin-bottom: 5.6rem;
  }
  .gold {
    color: ${colors.accentGold};
  }
  .white {
    color: ${colors.white};
    font-weight: 800;
    margin-left: 0.4rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.1rem 2.1rem;
  width: 100%;
  margin: 0 auto;
  max-width: 1070px;

  @media (max-width: 1100px) {
    gap: 1.08rem;
    max-width: 96vw;
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.18rem 0.7rem;
    width: 100%;
    max-width: 97vw;
  }
  @media (max-width: 900px) {
    gap: 1.2rem;
    flex-direction: column;
    align-items: center;
    max-width: 98vw;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.11rem;
    max-width: 99vw;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border-radius: 1px;
  box-shadow: 0 8px 36px 0 rgba(21, 51, 92, 0.1);
  padding: 2.2rem 1rem 1.18rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  width: 90%;
  position: relative;
  overflow: visible;
  transition: box-shadow 0.29s cubic-bezier(0.22, 0.68, 0.52, 1.01),
    transform 0.23s cubic-bezier(0.22, 0.68, 0.52, 1.01);
  cursor: pointer;
  @media (max-width: 900px) {
    border-radius: 1px;
    max-width: 440px;
    padding: 2rem 0.7rem 1.06rem 0.7rem;
    min-width: 0;
    width: 98vw;
    padding: 1.05rem 0.8rem 1.18rem 0.8rem;
  }
  @media (max-width: 600px) {
    border-radius: 1px;
    padding: 0.92rem 0.43rem 1.1rem 0.43rem;
    min-width: 0;
    width: 100%;
  }
  &:hover {
    box-shadow: 0 16px 48px 0 rgba(50, 110, 210, 0.19);
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-5px) scale(1.022);
  }
`;

const BadgeWrap = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Badge = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.16rem;
  font-size: 1.21rem;
  font-weight: 900;
  color: ${colors.primaryBlue};
  background: linear-gradient(120deg, ${colors.accentGold} 10%, ${colors.white} 100%);
  border-radius: 50%;
  min-width: 50px;
  height: 56px;
  box-shadow: 0 7px 8px 0 rgba(232, 205, 80, 0.13);
  user-select: none;
  letter-spacing: 0.02em;
  border: 1px solid ${colors.primaryBlue};
  animation: ${float} 6s ease-in-out infinite, ${pulse} 6s infinite;
  @media (max-width: 900px) {
    font-size: 1.11rem;
    min-width: 44px;
    height: 44px;
    border-width: 1.3px;
  }
  @media (max-width: 600px) {
    font-size: 1.02rem;
    min-width: 35px;
    height: 35px;
    border-width: 2px;
  }
`;

const BadgeNumber = styled.span`
  font-size: 1.03em;
  color: ${colors.success};
  font-weight: 600;
  margin-right: 0.16em;
`;

const BadgeIcon = styled.span`
  font-size: 1.16em;
`;

const CardTitleWrapper = styled.div`
  width: 100%;
  margin-top: 0.31rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.div`
  color: ${colors.accentGold};
  font-size: 1.09rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  margin-bottom: 1.25rem;
  margin-top: 1.25rem;

  text-align: center;
  @media (max-width: 900px) {
    font-size: 1.01rem;
  }
`;

const AnimatedBar = styled(motion.div)`
  height: 3px;
  background: linear-gradient(90deg, ${colors.accentGold} 60%, #fff5c7 100%);
  border-radius: 2.6px;
  margin: 0.08rem 0 0.7rem 0;
  width: 80%;
  opacity: 1;
  animation: ${dashIn} 0.9s cubic-bezier(0.72, 0.07, 0.64, 1.05);
  transition: background 0.2s, width 0.16s;
`;

const CardList = styled.ul`
  margin: 0 0 0.18rem 0;
  padding: 0 0 0 1.16rem;
  color: ${colors.white};
  font-size: 1.01rem;
  font-weight: 400;
  line-height: 1.68;
  list-style: disc;
  @media (max-width: 900px) {
    font-size: 0.97rem;
    padding-left: 0.94rem;
  }
  @media (max-width: 600px) {
    font-size: 0.91rem;
    padding-left: 1.59rem;
  }
  & > li {
    margin-bottom: 0.19rem;
    position: relative;
    padding-left: 0.34em;
  }
  & > li::marker {
    color: ${colors.accentGold};
    font-size: 1.18em;
  }
`;

// Animation cascade, rebond
const cardVariants = {
  initial: (idx) => ({
    opacity: 0,
    y: 66,
    scale: 0.85,
    transition: { duration: 0.15, delay: idx * 0.12 },
  }),
  animate: (idx) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 18,
      bounce: 0.41,
      duration: 0.89,
      delay: idx * 0.13,
    },
  }),
  exit: (idx) => ({
    opacity: 0,
    y: 44,
    scale: 0.9,
    transition: { duration: 0.32, delay: idx * 0.07, ease: "easeInOut" },
  }),
};

// ---- COMPONENT ---- //
const DomainesIntervention = () => (
  <Section
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.62, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <BgGrid />
    <Container>
      <BigTitle
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.57, delay: 0.06, type: "spring" }}
      >
        <span className="gold">Domaines</span>
        <span className="white">d’Intervention Stratégiques</span>
      </BigTitle>
      <CardsGrid>
        <AnimatePresence>
          {domaines.map((domaine, idx) => (
            <Card
              key={domaine.title}
              custom={idx}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              exit="exit"
              viewport={{ once: true }}
              transition={{ type: "spring" }}
            >
              <BadgeWrap>
                <Badge
                  initial={{ scale: 0, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    duration: 0.7,
                    stiffness: 320,
                    damping: 17,
                    delay: 0.15 + idx * 0.13,
                  }}
                  whileHover={{
                    scale: 1.13,
                    background: `linear-gradient(120deg, ${colors.primaryBlue} 30%, ${colors.accentGold} 100%)`,
                    color: colors.white,
                    borderColor: colors.accentGold,
                    transition: { duration: 0.19 },
                  }}
                >
                  <BadgeNumber>{domaine.badge}</BadgeNumber>
                  <BadgeIcon>{domaine.icon}</BadgeIcon>
                </Badge>
              </BadgeWrap>
              <CardTitleWrapper>
                <CardTitle>{domaine.title}</CardTitle>
                <AnimatedBar
                  layout
                  initial={{ width: 0, background: colors.accentGold }}
                  animate={{ width: "80%" }}
                  whileHover={{
                    background: `linear-gradient(90deg, ${colors.accentTurquoise} 60%, ${colors.white} 100%)`,
                    width: "97%",
                  }}
                  exit={{
                    width: 0,
                    opacity: 0,
                    transition: { duration: 0.19 },
                  }}
                  transition={{
                    background: { duration: 0.22 },
                    width: { duration: 0.32 },
                  }}
                />
              </CardTitleWrapper>
              <CardList>
                {domaine.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </CardList>
            </Card>
          ))}
        </AnimatePresence>
      </CardsGrid>
    </Container>
  </Section>
);

export default DomainesIntervention;
