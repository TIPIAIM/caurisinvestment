import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { 
  ChevronDown, 
  ChevronUp,
  Handshake,
  FileSearch,
  FileText,
  ClipboardCheck,
  BarChart,
  ArrowRight
} from "lucide-react";

const InvestorProcess = () => {
  const [expanded, setExpanded] = useState(true);

  const processSteps = [
    {
      id: 1,
      title: "Prise de contact & NDA",
      description: "Accès à la data room",
      icon: <Handshake size={24} />,
      color: "#4BB543" // Vert
    },
    {
      id: 2,
      title: "Due diligence conjointe",
      description: "Foncier, technique, marché",
      icon: <FileSearch size={24} />,
      color: "#3498db" // Bleu
    },
    {
      id: 3,
      title: "Structuration & Term Sheet",
      description: "Ticket, rendement cible, calendrier",
      icon: <FileText size={24} />,
      color: "#9b59b6" // Violet
    },
    {
      id: 4,
      title: "Closing & Déploiement",
      description: "Création SPV, décaissement, lancement travaux",
      icon: <ClipboardCheck size={24} />,
      color: "#e74c3c" // Rouge
    },
    {
      id: 5,
      title: "Suivi & Reporting",
      description: "Tableaux de bord, visites de site, distributions",
      icon: <BarChart size={24} />,
      color: "#f39c12" // Orange
    }
  ];

  return (
    <ProcessContainer>
      <ContentGrid>
        <ImagePanel
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ProcessImage 
            src={imagess.businesskey || "/default-process.jpg"} 
            alt="Processus investisseur"
            loading="lazy"
          />
        </ImagePanel>

        <ContentPanel> <Title>
              Processus d'Engagement Investisseur
              <Pill>{processSteps.length} étapes</Pill>
            </Title>
          <Header onClick={() => setExpanded(!expanded)}>
           
            <ToggleButton aria-label={expanded ? "Réduire" : "Développer"}>
              {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </ToggleButton>
          </Header>

          {expanded && (
            <ProcessTimeline>
              {processSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <ProcessStep
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <StepIndicator color={step.color}>
                      {step.icon}
                      <StepNumber>{step.id}</StepNumber>
                    </StepIndicator>
                    <StepContent>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </StepContent>
                  </ProcessStep>

                  {index < processSteps.length - 1 && (
                    <StepConnector 
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: index * 0.15 + 0.1 }}
                    >
                      <ArrowRight size={20} />
                    </StepConnector>
                  )}
                </React.Fragment>
              ))}
            </ProcessTimeline>
          )}
        </ContentPanel>

      </ContentGrid>
    </ProcessContainer>
  );
};

// Styles
const ProcessContainer = styled.section`
background: linear-gradient(
    300deg,
    ${colors.overlay} 77%,
    ${colors.accentGold} 70%
  ); // border-radius: 12px;
  padding: 2rem;
  margin: 2rem auto;
 // max-width: 1200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(200, 170, 110, 0.1);

     @media (max-width: 480px) {
background: linear-gradient(
    -300deg,
    ${colors.overlay} 95%,
    ${colors.accentGold} 80%
  );
     }
  `;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ImagePanel = styled(motion.div)`
  position: relative;
  //height: 100%;
  min-height: 300px;
  border-radius: 2px;
  overflow: hidden;
 // box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
 // border: 2px solid ${colors.accentGold}55;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  //  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 900px) {
    min-height: 300px;
    order: 2;
  }
`;

const ProcessImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ImagePanel}:hover & {
    transform: scale(1.03);
  }
`;

const ContentPanel = styled.div`
  @media (max-width: 900px) {
    order: 1;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${colors.accentGold};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Pill = styled.span`
  background: rgba(200, 170, 110, 0.2);
  color: ${colors.accentGold};
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ToggleButton = styled.button`
  background: rgba(200, 170, 110, 0.1);
  border: none;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accentGold};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(200, 170, 110, 0.2);
    transform: scale(1.1);
  }
`;

const ProcessTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding-left: 3rem;

  &::before {
    content: "";
    position: absolute;
    left: 1.25rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${colors.accentGold} 0%,
      transparent 90%
    );
    z-index: 0;
  }
      @media (max-width: 768px) {
      
   padding-left: 2rem;
  }
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  background: rgba(21, 51, 92, 0.4);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
       @media (max-width: 768px) {
   
    padding: 0 1rem;
  }
`;

const StepIndicator = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background: ${p => p.color}20;
  border: 2px solid ${p => p.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${p => p.color};
  flex-shrink: 0;
  position: relative;
`;

const StepNumber = styled.span`
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: ${colors.overlay};
  border: 2px solid ${p => p.color};
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${colors.white};
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: ${colors.accentGold};
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
    @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StepDescription = styled.p`
  color: ${colors.white};
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;
    @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StepConnector = styled(motion.div)`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accentGold};
  padding-left: 3rem;
  transform-origin: top center;
`;

export default React.memo(InvestorProcess);