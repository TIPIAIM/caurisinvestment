import React, { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import colors from "../../Styles/colors";
import { 
  Home,
  School,
  Briefcase,
  BarChart2,
  ChevronDown, 
  ChevronUp
} from "lucide-react";

const ApprocheESG = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-15% 0px" });

  const esgItems = useMemo(() => [
    {
      icon: <Home size={20} />,
      title: "Accès",
      content: "Développer des logements sociaux & abordables pour les ménages urbains en expansion."
    },
    {
      icon: <School size={20} />,
      title: "Services",
      content: "Intégrer écoles, espaces communautaires et services de base."
    },
    {
      icon: <Briefcase size={20} />,
      title: "Emploi local",
      content: "Priorité aux entreprises et main d'œuvre guinéennes pour la construction et la gestion."
    }
  ], []);

  const indicators = useMemo(() => [
    "Nombre d'unités livrées",
    "Emplois créés", 
    "Pourcentage de fournisseurs locaux",
    "Capacités scolaires ajoutées"
  ], []);

  return (
    <ESGContainer 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <ContentWrapper>
        <Header
          variants={headerVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Title>
            Approche ESG & Impact Communautaire
            <motion.span
              className="barre-animation"
              initial={{ width: 0 }}
              animate={{ width: 86 }}
              transition={{ duration: 0.85, delay: 0.1, type: "spring" }}
            />
          </Title>
          <ToggleButton 
            aria-label={isExpanded ? "Réduire" : "Développer"}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </ToggleButton>
        </Header>

        {isExpanded && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <ESGItemsGrid>
              {esgItems.map((item, index) => (
                <ESGItem
                  key={`esg-item-${index}`}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <TireeAnim
                    as={motion.div}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.55 + index * 0.1, delay: 0.25 + index * 0.1, ease: "easeOut" }}
                  />
                  <ItemHeader>
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemTitle>{item.title}</ItemTitle>
                  </ItemHeader>
                  <ItemContent>{item.content}</ItemContent>
                </ESGItem>
              ))}
            </ESGItemsGrid>

            <IndicatorsSection variants={indicatorsVariants}>
              <IndicatorsTitle>
                <BarChart2 size={20} />
                Indicateurs d'impact proposés
              </IndicatorsTitle>
              <IndicatorsGrid>
                {indicators.map((indicator, index) => (
                  <Indicator
                    key={`indicator-${index}`}
                    variants={indicatorVariants}
                    custom={index}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(200, 170, 110, 0.2)"
                    }}
                  >
                    {indicator}
                  </Indicator>
                ))}
              </IndicatorsGrid>
            </IndicatorsSection>

            {/* Animation des tirets comme dans Home2 */}
            <Socials>
              <SocialDot color={colors.primaryBlue}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
              <SocialDot color={colors.black}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
              <SocialDot color={colors.accentGold}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
            </Socials>
          </motion.div>
        )}
      </ContentWrapper>
    </ESGContainer>
  );
};

// ================= VARIANTS =================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};
const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 10, duration: 0.8 }
  }
};
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" }
  }
};
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 50,
    x: i % 2 === 0 ? -30 : 30
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8
    }
  })
};
const indicatorsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.6 }
  }
};
const indicatorVariants = {
  hidden: (i) => ({
    opacity: 0,
    scale: 0.8,
    y: 20
  }),
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  })
};

// ================= STYLES =================
const ESGContainer = styled(motion.section)`
  --bg-color: ${colors.overlay};
  --gold: ${colors.accentGold};
  --white: ${colors.white};
  --blue-dark: rgba(21, 51, 92, 0.4);
  --gold-light: rgba(200, 170, 110, 0.1);

  width: 100%;
  padding: 4rem 1.5rem;
  background: var(--bg-color);
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  cursor: pointer;
  will-change: transform;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: var(--gold);
  margin: 0;
  position: relative;
  padding-bottom: 1.1rem;
  line-height: 1.2;

  .barre-animation {
    display: block;
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 5px;
    background: linear-gradient(90deg, var(--gold) 50%, transparent 100%);
    border-radius: 2px;
    z-index: 2;
  }

  @media (max-width: 480px) {
    padding: 0 1rem 1.1rem 1rem;
  }
`;

const ToggleButton = styled(motion.button)`
  background: var(--gold-light);
  border: none;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  cursor: pointer;
  transition: all 0.3s ease;
  will-change: transform;
  &:hover {
    background: rgba(200, 170, 110, 0.2);
  }
`;

const ESGItemsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  will-change: transform;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const TireeAnim = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 9px; /* Largeur plus visible */
  background: linear-gradient(
    120deg,
    ${colors.accentGold} 85%,
    ${colors.primaryBlue} 120%
  );
  border-radius: 9px;
  z-index: 2;
`;

const ESGItem = styled(motion.div)`
  position: relative;
  background: var(--blue-dark);
  border-radius: 8px;
  padding: 1.8rem 1.2rem 1.8rem 2.2rem;
  /* Le padding à gauche est pour la barre */
  min-height: 175px;
  border-left: none;
  transition: all 0.3s ease;
  height: 100%;
  will-change: transform;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const ItemIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: var(--gold-light);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.2rem;
  flex-shrink: 0;

  svg {
    color: var(--gold);
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--gold);
  margin: 0;
  font-weight: 700;
`;

const ItemContent = styled.p`
  color: var(--white);
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0;
`;

const IndicatorsSection = styled(motion.div)`
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  will-change: transform;
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const IndicatorsTitle = styled.h4`
  font-size: 1.2rem;
  color: var(--gold);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  svg {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

const IndicatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  will-change: transform;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const Indicator = styled(motion.div)`
  background: var(--gold-light);
  color: var(--white);
  padding: 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  will-change: transform;
  &:hover {
    background: rgba(200, 170, 110, 0.2);
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--gold);
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const SocialDot = styled.span`
  color: ${({ color }) => color || colors.primaryBlue};
  font-size: 18px;
  display: inline-block;
`;

export default React.memo(ApprocheESG);
