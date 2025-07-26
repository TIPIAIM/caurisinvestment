// src/components/DomainesIntervention.jsx
import React, { useState, lazy, Suspense, memo } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import BarnaventeteBase from "../Acueil/Barnaventete";
import Temoignage from "./Temoignge";

// --- SEO en lazy + memo --- //
const SEO = lazy(() => import("../../SEO"));
const Barnaventete = memo(BarnaventeteBase);

// --- DATA --- //
const domaines = [
  {
    title: "Promotion immobilière & logements sociaux",
    img: imagess.businesskey,
    desc: [
      "Programme en cours : 260 logements F3 & F4 en périphérie de Conakry (banlieues en expansion démographique).",
      "Modèles modulaires adaptables aux revenus intermédiaires & segments subventionnables.",
      "Possibilité de co-investissement par tranche (lots de 20 à 50 unités).",
    ],
  },
  {
    title: "Acquisition & cession d’actifs immobiliers",
    img: imagess.businesskey3,
    desc: [
      "Achat, valorisation et revente d’immeubles, résidences, terrains stratégiques.",
      "Montage de dossiers de titre foncier, lotissement, viabilisation.",
    ],
  },
  {
    title: "Vente d’appartements / Déploiement de programmes résidentiels",
    img: imagess.businesskey2,
    desc: [
      "Commercialisation en VEFA (Vente en l'État Futur d'Achèvement) ou clé en main.",
      "Packages investisseurs : blocs d’appartements destinés à la location meublée ou corporate.",
    ],
  },
  {
    title: "Gestion immobilière & conciergerie",
    img: imagess.businesskey4,
    desc: [
      "Gestion locative complète (baux, encaissements, maintenance).",
      "Services premium de conciergerie (accueil expatriés, entretien, services à la carte).",
    ],
  },
  {
    title: "Infrastructures éducatives (écoles & campus)",
    img: imagess.coris_bulding,
    desc: [
      "Études d’acquisition foncière pour écoles privées.",
      "Co-développement construction/gestion sous contrat de long terme.",
    ],
  },
  {
    title: "Plateforme d’accueil pour investisseurs étrangers",
    img: imagess.coris_route_et_màison_portefe,
    desc: [
      "Accès au marché guinéen : études de marché, due diligence foncière, structuration juridique & fiscale, représentation locale.",
      "Mise en relation avec porteurs de projets locaux (JV, prises de participation, opérations de promotion).",
    ],
  },
];

// --- ANIMATIONS & STYLED COMPONENTS --- //
const titleAnim = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.98);}
  60% { opacity: 0.7; transform: translateY(-8px) scale(1.04);}
  to { opacity: 1; transform: translateY(0) scale(1);}
`;

const cardVariants = {
  hidden: (idx) => ({
    opacity: 0,
    y: 48,
    scale: 0.93,
    transition: { duration: 0.15, delay: idx * 0.09 },
  }),
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 16,
      duration: 0.89,
      delay: idx * 0.13,
    },
  }),
};

// --- FOND ANIME --- //
const AnimatedBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    117deg,
    ${colors.overlay} 65%,
    ${colors.primaryBlue} 130%
  );
  &:before {
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    opacity: 0.15;
    background: url("data:image/svg+xml;utf8,<svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 60V0H60' stroke='%232A4B7C' stroke-width='0.7' stroke-dasharray='7 5'/></svg>")
      repeat;
    animation: gridmove 10s linear infinite;
  }
  @keyframes gridmove {
    0% { background-position: 0 0; }
    100% { background-position: 120px 60px; }
  }
`;

const Section = styled.section`
  margin-top: 5rem;
  width: 100%;
  min-height: 100vh;
  padding: 6vw 0 7vw 0;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 2.7rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  text-align: center;
  margin-bottom: 3.2rem;
  margin-top: 0.7rem;
  background: none;
  z-index: 2;
  animation: ${titleAnim} 2.15s cubic-bezier(0.65, 0.05, 0.27, 1.19) both;
  span.gold { color: ${colors.white}; }
  span.white { color: ${colors.accentGold}; margin-left: 0.47rem; }
  @media (max-width: 900px) {
    font-size: 2.5rem;
    margin-bottom: 3.5rem;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const Grid = styled.div`
  max-width: 1190px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.2rem 1.7rem;
  z-index: 2;
  padding: 0 0.7rem;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1.4rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem 0.8rem;
    padding: 0 1.3rem;
    max-width: 750px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.2rem 0.7rem;
    padding: 0 1rem;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(11px);
  border-radius: 1px;
  box-shadow: 0 9px 34px 0 rgba(20, 40, 70, 0.01);
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: box-shadow 0.23s, transform 0.21s;
  position: relative;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 -1px 1px 0 ${colors.accentGold};
    transform: scale(1.03) translateY(-6px);
    border-color: ${colors.accentGold};
  }
  &:focus {
    outline: 2.5px solid ${colors.accentTurquoise};
  }
  @media (max-width: 600px) {
    background: linear-gradient(
      310deg,
      ${colors.overlay} 70%,
      ${colors.accentGold} 50%
    );
    border-top-left-radius: 1px;
    padding: 2rem 2rem;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: 16px;
  background: #ececec;
  margin-bottom: 0.25rem;
  transition: box-shadow 0.2s;
  @media (max-width: 900px) {
    width: 100%;
    height: 220px;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: 220px;
    border-top-left-radius: 1px;
  }
`;

const CardDesc = styled.div`
  color: ${colors.white};
  font-size: 1.01rem;
  font-weight: 400;
  text-align: left;
  margin: 0 1.15rem 1.2rem 1.15rem;
  min-height: 55px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  @media (max-width: 900px) {
    text-align: left;
  }
  @media (max-width: 600px) {
    text-align: left;
  }
`;

const ShowMoreBtn = styled.button`
  margin: 0.2rem auto 1.2rem auto;
  background: ${colors.accentGold};
  color: ${colors.primaryBlue};
  border: none;
  border-radius: 7px;
  padding: 0.27rem 1.18rem;
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 3px 10px 0 rgba(230, 190, 90, 0.1);
  transition: background 0.17s, color 0.17s;
  display: block;
  &:hover {
    background: ${colors.accentTurquoise};
    color: ${colors.accentGold};
  }
`;

// --- MODAL --- //
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95);}
  to { opacity: 1; transform: scale(1);}
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  margin-top: 5rem;
  background: linear-gradient(
    120deg,
    ${colors.overlay} 75%,
    ${colors.overlayAlpha} 60%
  );
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.32s;
  backdrop-filter: blur(5px);
`;

const ModalBox = styled(motion.div)`
  background: linear-gradient(
    120deg,
    ${colors.white} 84%,
    ${colors.overlayAlpha} 60%
  );
  border-radius: 18px;
  box-shadow: 0 17px 48px 0 rgba(30, 60, 120, 0.18);
  padding: 2.1rem 2.2rem 1.7rem 2.2rem;
  max-width: 550px;
  width: 98vw;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    padding: 1.1rem 0.7rem 1.1rem 0.7rem;
    background: linear-gradient(
      120deg,
      ${colors.white} 84%,
      ${colors.accentGold} 60%
    );
  }
  @media (max-width: 600px) {
    max-width: 340px;
    margin-top: 5rem;
    padding: 0.5rem 0.7rem 1.1rem 0.7rem;
    width: 90vw;
    background: linear-gradient(
      120deg,
      ${colors.white} 84%,
      ${colors.accentGold} 60%
    );
  }
  @media (max-width: 400px) {
    margin-top: auto;
  }
`;

const CardTitle = styled.h3`
  color: ${colors.accentGold};
  font-size: 1.13rem;
  font-weight: 800;
  margin: 1.03rem 1.2rem 0.6rem 1.2rem;
  text-align: center;
  @media (max-width: 900px) {}
  @media (max-width: 600px) {
    text-align: left;
    font-size: 1.23rem;
  }
`;
const ModalImg = styled.img`
  width: 100%;
  max-width: 420px;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 8px 28px 0 rgba(35, 65, 120, 0.14);
  margin-bottom: 1.3rem;
  @media (max-width: 900px) {
    max-width: 500px;
    height: 320px;
  }
  @media (max-width: 600px) {
    max-width: 320px;
    height: 320px;
  }
`;

const ModalTitle = styled.h4`
  font-size: 1.34rem;
  font-weight: 900;
  margin-bottom: 1.12rem;
  margin-top: 0.3rem;
  span.gold {
    color: ${colors.accentGold};
  }
  span.blue {
    color: ${colors.primaryBlue};
    margin-left: 0.27rem;
  }
`;

const ModalDesc = styled.ul`
  color: ${colors.navyBg};
  font-size: 1.09rem;
  font-weight: 600;
  list-style: disc inside;
  line-height: 1.63;
  text-align: left;
  margin-bottom: 1.1rem;
  padding-left: 0.9rem;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: ${colors.accentTurquoise};
  color: ${colors.accentGold};
  border: none;
  font-size: 1.6rem;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 14px 0 rgba(120, 100, 40, 0.13);
  cursor: pointer;
  transition: background 0.16s, color 0.16s;
  &:hover {
    background: ${colors.accentGold};
    color: ${colors.accentTurquoise};
  }
`;

// --- COMPONENT PRINCIPAL --- //
const DomainesIntervention = memo(() => {
  const [modalIdx, setModalIdx] = useState(null);

  const renderBigTitle = () => (
    <Title
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.95, type: "spring", delay: 0.17 }}
    >
      <span className="gold">Nos Domaines d'Intervention </span>
      <span className="white"> Stratégiques</span>
    </Title>
  );

  // 4 lignes max sur la card. Si +4, bouton Voir plus
  const renderDesc = (descArr, idx) => {
    const maxLines = 4;
    const showBtn = descArr.length > maxLines;
    const shortDesc = descArr.slice(0, maxLines);
    return (
      <>
        <CardDesc as="ul">
          {shortDesc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </CardDesc>
        {showBtn && (
          <ShowMoreBtn
            onClick={(e) => {
              e.stopPropagation();
              setModalIdx(idx);
            }}
            aria-label="Voir plus"
          >
            Voir plus
          </ShowMoreBtn>
        )}
      </>
    );
  };

  // --- MÉTADONNÉES SEO pour cette page ---
  const seoTitle = "Nos Domaines d'Intervention Stratégiques - Cauris Investment";
  const seoDesc =
    "Découvrez tous les domaines stratégiques où Cauris Investment intervient : promotion immobilière, logements sociaux, gestion d'actifs, infrastructures éducatives et plus. Investissez en toute confiance en Guinée.";
  const seoKeywords = [
    "immobilier Guinée",
    "promotion immobilière",
    "investissement",
    "logements sociaux",
    "gestion immobilière",
    "infrastructures éducatives",
    "Cauris Investment"
  ];
  const seoImg = domaines[0]?.img || "/corisbulding2.1.avif";
  const seoUrl = "https://www.caurisinvestment.com/domaines";

  return (
    <>
      <Suspense fallback={null}>
        <SEO
          title={seoTitle}
          description={seoDesc}
          image={seoImg}
          keywords={seoKeywords}
          url={seoUrl}
        />
      </Suspense>
      <Barnaventete />
      <Section>
        <AnimatedBg />
        {renderBigTitle()}
        <Grid>
          <AnimatePresence>
            {domaines.map((d, idx) => (
              <Card
                key={d.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={idx}
                onClick={() => setModalIdx(idx)}
                whileHover={{ scale: 1.035, y: -7 }}
                tabIndex={0}
                role="button"
                aria-label={`Voir détails ${d.title}`}
              >
                <CardImg src={d.img} alt={d.title} />
                <CardTitle>{d.title}</CardTitle>
                {renderDesc(d.desc, idx)}
              </Card>
            ))}
          </AnimatePresence>
        </Grid>
        <AnimatePresence>
          {modalIdx !== null && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalIdx(null)}
            >
              <ModalBox
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <CloseBtn onClick={() => setModalIdx(null)}>
                  <X size={28} />
                </CloseBtn>
                <ModalImg
                  src={domaines[modalIdx].img}
                  alt={domaines[modalIdx].title}
                />
                <ModalTitle>
                  <span className="gold">
                    {domaines[modalIdx].title.split(" ")[0]}
                  </span>
                  <span className="blue">
                    {domaines[modalIdx].title.replace(
                      domaines[modalIdx].title.split(" ")[0],
                      ""
                    )}
                  </span>
                </ModalTitle>
                <ModalDesc as="ul">
                  {domaines[modalIdx].desc.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ModalDesc>
              </ModalBox>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </Section>
      
      <Temoignage/>
    </>
  );
});

export default DomainesIntervention;
