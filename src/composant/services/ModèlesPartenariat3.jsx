import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import colors from "../../Styles/colors";
import { 
  ChevronDown, 
  ChevronUp,
  Handshake,
  Home,
  Users,
  Landmark,
  School
} from "lucide-react";

// Styled Components (conservés tels quels)
const SectionContainer = styled.section`
  width: 100%;
  padding: 3rem 1.5rem;
  background: ${colors.overlay};
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  width: 100%;
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  cursor: pointer;
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
    padding-left: 1rem;
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

const ModelsList = styled(motion.div)`
  display: grid;
  gap: 1rem;
     @media (max-width: 480px) {
    padding:0 1rem;
  }
`;

const ModelCard = styled(motion.div)`
  background: rgba(21, 51, 92, 0.25);
  border-radius: 4px;
  padding: 1.25rem;
  border-left: 3px solid ${colors.accentGold};
  transition: all 0.25s ease;

  &:hover {
    background: rgba(21, 51, 92, 0.4);
    transform: translateX(3px);
  }
`;

const ModelHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
`;

const ModelTitle = styled.h3`
  font-size: 1.2rem;
  color: ${colors.accentGold};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
    
`;

const ModelDescription = styled.p`
  color: ${colors.white};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  padding-left: 2.75rem;

  @media (max-width: 480px) {
    padding-left: 0;
  }
`;

// Data
const PARTNERSHIP_MODELS = [
  {
    id: 1,
    title: "Joint Venture de Développement",
    description: "Co financement d'un projet défini (ex. tranche de 50 logements). Cauris apporte foncier + maîtrise d'ouvrage locale; l'investisseur apporte capital / dette structurée.",
    icon: <Handshake size={18} />
  },
  {
    id: 2,
    title: "SPV Projet Logements Sociaux",
    description: "Création d'une société de projet dédiée par lot. Revenus issus des ventes progressives ou locations subventionnées.",
    icon: <Home size={18} />
  },
  {
    id: 3,
    title: "Club Deal Foncier & Résidentiel",
    description: "Pool d'investisseurs partageant l'acquisition d'un terrain à fort potentiel; sortie à la revente ou après développement partiel.",
    icon: <Users size={18} />
  },
  {
    id: 4,
    title: "Fonds de Revenu Locatif (build to rent)",
    description: "Développement d'appartements standardisés destinés à la location corporate, avec contrat de gestion Cauris + rendement annuel cible.",
    icon: <Landmark size={18} />
  },
  {
    id: 5,
    title: "Partenariat Écoles & Services Communautaires",
    description: "Investissement dans des infrastructures scolaires rattachées à des zones résidentielles en croissance; baux long terme avec opérateur pédagogique.",
    icon: <School size={18} />
  }
];

// Variants d'animation
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  }
};

const ModelesPartenariat = React.memo(() => {
  const [isExpanded, setIsExpanded] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <SectionContainer ref={ref}>
      <ContentWrapper>
        <SectionHeader
          onClick={toggleExpand}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <SectionTitle>Modèles de Partenariat & Structuration d'Investissement</SectionTitle>
          <ToggleButton 
            aria-label={isExpanded ? "Réduire" : "Développer"}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </ToggleButton>
        </SectionHeader>

        {isExpanded && (
          <ModelsList
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {PARTNERSHIP_MODELS.map((model) => (
              <ModelCard
                key={model.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ModelHeader>
                  <ModelTitle>
                    {model.icon}
                    {model.title}
                  </ModelTitle>
                </ModelHeader>
                <ModelDescription>{model.description}</ModelDescription>
              </ModelCard>
            ))}
          </ModelsList>
        )}
      </ContentWrapper>
    </SectionContainer>
  );
});

ModelesPartenariat.displayName = "ModelesPartenariat";

export default ModelesPartenariat;