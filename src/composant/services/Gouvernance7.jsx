import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp,
  Gavel,
  ShieldCheck,
  FileSearch,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";
import colors from "../../Styles/colors";

const GovernanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('legal');
  const [expanded, setExpanded] = useState(true);

  // Données structurées pour les différents onglets
  const governanceData = {
    legal: {
      icon: <Gavel size={20} />,
      items: [
        { 
          title: " Phasage financier ...", 
          status: "in-progress", 
          description: "libération des fonds par milestone" 
        },
        { 
          title: "Audits ...", 
          status: "in-progress", 
          description: "Audits techniques & estimations indépendantes" 
        }, 
         { 
          title: " Phasage financier ...", 
          status: "in-progress", 
          description: "Libération des fonds par milestone" 
        },
      ]
    },
    audit: {
      icon: <FileSearch size={20} />,
      items: [
      
        { 
          title: " Reporting ...", 
          status: "completed", 
          description: "Reporting trimestriel financier & opérationnel aux investisseurs.." 
        },
        { 
            title: " Gouvernance ... ", 
            status: "completed", 
            description: " comité de pilotage projet / comité d'audit." 
          },
          { 
            title: "Assurance ...", 
            status: "completed", 
            description: " Assurance chantier  et responsabilité civile professionnelle." 
          }
      ]
    },
    
  };

  return (
    <DashboardContainer>
      {/* En-tête cliquable pour plier/déplier */}
      <Header onClick={() => setExpanded(!expanded)}>
        <Title>
        Gouvernance, Conformité & Gestion des Risques
          <Pill>{Object.keys(governanceData).length} domaines</Pill>
        </Title>
        <ToggleButton aria-label={expanded ? "Réduire" : "Développer"}>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </ToggleButton>
      </Header>

      {expanded && (
        <>
          {/* Navigation par onglets */}
          <TabContainer>
            {Object.entries(governanceData).map(([key, tab]) => (
              <TabButton 
                key={key} 
                active={activeTab === key}
                onClick={() => setActiveTab(key)}
              >
                {tab.icon}
                {key === 'legal' && 'Detail 1'}
                {key === 'audit' && 'Detail 2'}
             
              </TabButton>
            ))}
          </TabContainer>

          {/* Cartes des éléments */}
          <DashboardGrid>
            {governanceData[activeTab].items.map((item, index) => (
              <DashboardCard 
                key={`${activeTab}-${index}`}
                status={item.status}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <StatusBadge status={item.status}>
                    {item.status === 'completed' && <CheckCircle size={16} />}
                    {item.status === 'in-progress' && <AlertTriangle size={16} />}
                    {item.status === 'pending' && <Clock size={16} />}
                    {item.status.replace('-', ' ')}
                  </StatusBadge>
                </CardHeader>
                <CardContent>{item.description}</CardContent>
              </DashboardCard>
            ))}
          </DashboardGrid>
        </>
      )}
    </DashboardContainer>
  );
};

// Styles optimisés avec variables CSS
const DashboardContainer = styled.section`
  --gold: ${colors.accentGold};
  --blue: ${colors.primaryBlue};
  --white: ${colors.white};
  --success: #4BB543;
  --warning: #FFA500;
  --danger: #FF4B4B;
  
background: linear-gradient(
    120deg,
    ${colors.overlay} 87%,
    ${colors.accentGold} 60%
  ); // border-radius: 1px;
  padding: 2rem;
  margin: 2rem auto;
  //max-width: 1200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(200, 170, 110, 0.1);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem 0;
  margin-bottom: 1rem;
`;
//juridique
const Title = styled.h2`
  font-size: 2rem;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0 1rem;
  }
`;

const Pill = styled.span`
  background: rgba(200, 170, 110, 0.2);
  color: var(--gold);
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ToggleButton = styled.button`
  background: rgba(200, 170, 110, 0.1);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(200, 170, 110, 0.2);
    transform: scale(1.1);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
     @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const TabButton = styled.button`
  background: ${p => p.active ? 'rgba(21, 51, 92, 0.6)' : 'transparent'};
  border: 1px solid ${p => p.active ? 'var(--gold)' : 'rgba(200, 170, 110, 0.3)'};
  color: ${p => p.active ? 'var(--gold)' : 'var(--white)'};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    border-color: var(--gold);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const DashboardCard = styled.div`
  background: rgba(21, 51, 92, 0.4);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid ${p => 
    p.status === 'completed' ? 'var(--success)' : 
    p.status === 'in-progress' ? 'var(--warning)' : 
    'var(--danger)'};
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CardTitle = styled.h3`
  color: var(--gold);
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  background: ${p => 
    p.status === 'completed' ? 'rgba(75, 181, 67, 0.2)' : 
    p.status === 'in-progress' ? 'rgba(255, 165, 0, 0.2)' : 
    'rgba(255, 75, 75, 0.2)'};
  color: ${p => 
    p.status === 'completed' ? 'var(--success)' : 
    p.status === 'in-progress' ? 'var(--warning)' : 
    'var(--danger)'};
  white-space: nowrap;
`;

const CardContent = styled.p`
  color: var(--white);
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export default React.memo(GovernanceDashboard);