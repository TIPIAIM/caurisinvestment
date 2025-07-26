import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { 
  ChevronDown, 
  ChevronUp,
  Landmark,
  Home,
  TrendingUp,
  FileText,
  Handshake,
  DollarSign
} from "lucide-react";

// Animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SectionContainer = styled.section`
  width: 100%;
  padding: 3rem 1.5rem;
background: linear-gradient(
    -120deg,
    ${colors.overlay} 87%,
    ${colors.accentGold} 60%
  );   display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 100%;
  min-height: 400px;
  border-radius: 8px;
  overflow: hidden;
//  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//  border: 2px solid ${colors.accentGold}33;

  @media (max-width: 900px) {
    min-height: 300px;
    order: 2;
  }
`;

const ContentImage = styled.img`
  width: 100%;
  height: 100%;
    border-radius: 100px;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  @media (max-width: 900px) {
    order: 1;
  }
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  font-weight: 800;
  color: ${colors.accentGold};
  margin: 0;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${colors.accentGold};
  }
       @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${colors.accentGold};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
    
`;

const ValueChainSection = styled(motion.div)`
  background: rgba(21, 51, 92, 0.3);
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
     @media (max-width: 480px) {
    padding: 0 1rem;
  }  
`;

const ValueChainTitle = styled.h3`
  color: ${colors.accentGold};
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ValueChainItems = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
`;

 
const RevenueList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
     @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const RevenueItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: ${colors.white};

  svg {
    min-width: 1.2rem;
    margin-top: 0.2rem;
    color: ${colors.accentGold};
  }
`;

const ObjectiveSection = styled(motion.div)`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed ${colors.accentGold}50;
`;

const ObjectiveText = styled.p`
  color: ${colors.white};
  font-style: italic;
  margin: 0;
  display: flex;
  gap: 0.5rem;

  strong {
    color: ${colors.accentGold};
    font-weight: 600;
  }
`;

const CreationValeur = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const revenueSources = [
    { icon: <TrendingUp size={18} />, text: "Marges de promotion sur ventes d'unités" },
    { icon: <Landmark size={18} />, text: "Plus value foncière post viabilisation" },
    { icon: <Home size={18} />, text: "Revenus locatifs récurrents (résidentiel, commercial)" },
    { icon: <FileText size={18} />, text: "Honoraires de gestion & conciergerie" },
    { icon: <DollarSign size={18} />, text: "Commissions d'intermédiation (acquisitions/cessions)" },
    { icon: <Handshake size={18} />, text: "Contrats de partenariat long terme (écoles, résidences services)" }
  ];

  return (
    <SectionContainer>
      <ContentGrid>
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ContentImage 
            src={imagess.gràphrond || "/default-image.jpg"} 
            alt="Chaîne de valeur immobilière"
            loading="lazy"
          />
        </ImageContainer>

        <ContentWrapper>
          <SectionHeader
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SectionTitle>6. Création de Valeur & Sources de Revenus</SectionTitle>
            <ToggleButton aria-label={isExpanded ? "Réduire" : "Développer"}>
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </ToggleButton>
          </SectionHeader>

          {isExpanded && (
            <>
              <ValueChainSection
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ValueChainTitle>
                  <Landmark size={18} />
                  REAL ESTATE INVESTMENT VALUE CHAIN
                </ValueChainTitle>
                <ValueChainItems>
                <ObjectiveText>
                  <strong>Objectif investisseurs :</strong> combiner flux de trésorerie récurrents + appréciation du capital immobilisé.
                </ObjectiveText>                </ValueChainItems>
              </ValueChainSection>

              <RevenueList>
                {revenueSources.map((item, index) => (
                  <RevenueItem
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </RevenueItem>
                ))}
              </RevenueList>

              <ObjectiveSection
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
               
              </ObjectiveSection>
            </>
          )}
        </ContentWrapper>
      </ContentGrid>
    </SectionContainer>
  );
};

export default CreationValeur;