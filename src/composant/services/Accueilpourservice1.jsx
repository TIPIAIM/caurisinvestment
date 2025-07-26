import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../../Styles/colors";
import { FaTimes, FaChevronRight, FaHandshake, FaChartLine, FaShieldAlt, FaCity, FaUsers, FaHeart } from "react-icons/fa";
import { imagess } from "../../assets/imagess";
// =============== STYLED COMPONENTS ===============
 

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.9;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${colors.accentTurquoise} 30%,
      ${colors.accentTurquoise} 100%
    );
    mix-blend-mode: multiply;
  }
`;

 
const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 56rem;
  margin: 0 auto;
  width: 100%;
`;

const MainHeading = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${colors.white};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #f5d742 00%, ${colors.accentGold} 10%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

const MessageText = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
`;

const WhyInvestButton = styled(motion.button)`
  background: linear-gradient(135deg, ${colors.lightGrey} 50%, ${colors.accentGold} 50%);
  color: ${colors.darkText};
  border: none;
  padding: 1.1rem 2.75rem;
  font-size: 1.15rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 2rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: center;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${colors.accentGold} 50%, ${colors.lightGrey} 50%);
    z-index: -1;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
      transform: scale(1.1);
    }

    svg {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.darkOverlay};
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContainer = styled(motion.div)`
  background: ${colors.white};
  border-radius: 2px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background:${colors.accentGold};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accentTurquoise};
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(2px);

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: rotate(90deg) scale(1.1);
  }
`;

const ModalContent = styled.div`
  padding: 4.5rem 3.5rem 3.5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 3.5rem 2rem 2.5rem;
  }
`;

const ModalTitle = styled.h2`
  color: ${colors.accentTurquoise};
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 3.5rem;
  text-align: center;
  position: relative;
  font-weight: 700;

  &::after {
    content: "";
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: linear-gradient(90deg, ${colors.accentGold} 0%, #f5b342 100%);
    border-radius: 3px;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BenefitCard = styled(motion.div)`
  background: ${({ $isLeft }) =>
    $isLeft ? "rgba(26, 127, 138, 0.05)" : "rgba(245, 179, 66, 0.05)"};
  border-radius: 16px;
  padding: 2.5rem 2rem;
  border: 1px solid
    ${({ $isLeft }) =>
      $isLeft ? "rgba(26, 127, 138, 0.15)" : "rgba(245, 179, 66, 0.15)"};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  min-height: 420px;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${({ $isLeft }) =>
      $isLeft ? colors.accentTurquoise : colors.accentGold};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
    background: ${({ $isLeft }) =>
      $isLeft ? "rgba(26, 127, 138, 0.08)" : "rgba(245, 179, 66, 0.08)"};
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 2rem 1.5rem;
  }
`;

const BenefitHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${({ $isLeft }) =>
    $isLeft ? "rgba(26, 127, 138, 0.1)" : "rgba(245, 179, 66, 0.1)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isLeft }) =>
    $isLeft ? colors.accentTurquoise : colors.accentGold};
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BenefitTitle = styled.h3`
  color: ${({ $isLeft }) =>
    $isLeft ? colors.accentTurquoise : colors.accentGold};
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BenefitListItem = styled(motion.li)`
  padding: 1rem 0;
  color: ${colors.darkText};
  position: relative;
  padding-left: 2rem;
  line-height: 1.6;
  font-size: 1.05rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  min-height: 60px;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 1.5rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $isLeft }) =>
      $isLeft ? colors.accentTurquoise : colors.accentGold};
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 0.8rem 0;
    font-size: 1rem;
  }
`;
// =============== STYLED COMPONENTS ===============
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    min-height: auto;
  }
`;

const BackgroundSlider = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  display: flex;
`;

const BackgroundSlide = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
       ${colors.accentTurquoise}CC 100%,
     ${colors.accentTurquoise} 100%
    );
    mix-blend-mode: multiply;
  }
`;

const AnimatedOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(
      circle at 55% 25%,
      ${colors.accentGold}22 10%,
      transparent 25%
    ),
    radial-gradient(
      circle at 25% 75%,
     ${colors.accentTurquoise}99 100%,
      transparent 25%
    );
  background-size: 200% 200%;
  animation: gradientMove 20s ease infinite alternate;

  @keyframes gradientMove {
    0% { background-position: 0% 0% }
    100% { background-position: 100% 100% }
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;

  span {
    position: absolute;
    background: ${colors.accentGold};
    border-radius: 50%;
    filter: blur(1px);
    animation: floatParticle linear infinite;

    &:nth-child(1) {
      width: 10px;
      height: 10px;
      top: 20%;
      left: 10%;
      animation-duration: 15s;
    }
    &:nth-child(2) {
      width: 10px;
      height: 10px;
      top: 80%;
      left: 25%;
      animation-duration: 20s;
    }
    &:nth-child(3) {
      width: 5px;
      height: 5px;
      top: 40%;
      left: 90%;
      animation-duration: 12s;
    }
    &:nth-child(4) {
      width: 5px;
      height: 5px;
      top: 60%;
      left: 70%;
      animation-duration: 18s;
    }
    &:nth-child(5) {
      width: 5px;
      height: 5px;
      top: 30%;
      left: 50%;
      animation-duration: 25s;
    }
  }

  @keyframes floatParticle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
  }
`;

// ... (conservez tous les autres styles existants)

// =============== COMPONENT ===============
const Accueilpourservice = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  // Tableau des images de fond
  const backgroundImages = [
    imagess.solde,
    imagess.businesskey,
     imagess.businesskey3,
    imagess.businesskey4,
    imagess.gestionimobetconsierge,
 //   imagess.coris_meuble,
    imagess.salon3,

   ];

  const messages = [
    "Accédez à une sélection exclusive de terrains et immeubles à fort potentiel.",
    "Investissez dans des programmes résidentiels innovants, adaptés à tous les budgets.",
    "Location sécurisée et gestion locative professionnelle, pour une tranquillité totale.",
    "Participez à des projets d'envergure avec un accompagnement sur mesure.",
    "Investissez dans l'éducation : écoles et campus conçus pour l'avenir.",
    "Plateforme dédiée aux investisseurs étrangers : sécurité, étude de marché et accompagnement complet.",
    "Bénéficiez de conseils d'experts pour valoriser et céder vos biens en toute confiance.",
    "Achetez en VEFA ou clé en main : suivi rigoureux, garanties solides.",
    "Un accompagnement personnalisé de la première visite à la remise des clés.",
    "Contactez-nous pour donner vie à vos projets immobiliers !",
  ];

  const investBenefits = {
    avantages: [
      { text: "Accès foncier sécurisé", icon: <FaShieldAlt /> },
      { text: "Pipeline réel & immédiat", icon: <FaChartLine /> },
      { text: "Expertise locale éprouvée", icon: <FaCity /> },
      { text: "Modèles flexibles", icon: <FaHandshake /> },
      { text: "Marché porteur", icon: <FaUsers /> },
      { text: "Impact & Inclusion", icon: <FaHeart /> }
    ],
    significations: [
      "Dossiers vérifiés, traçabilité des titres, accompagnement notarial.",
      "Programme 260 logements + opportunités foncières prêtes à structurer.",
      "Réseau d'acteurs techniques, juridiques et institutionnels.",
      "Co-développement, club deal, SPV dédié, dette privée ou equity.",
      "Urbanisation rapide, pression démographique, demande locative solide.",
      "Logements sociaux + projets éducatifs = valeur sociale mesurable."
    ]
  };

  // Animation des messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3500);

    return () => clearInterval(messageInterval);
  }, [messages.length]);

  // Animation des backgrounds
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(bgInterval);
  }, [backgroundImages.length]);

  return (
    <HeroSection>
      <BackgroundSlider>
        {backgroundImages.map((image, index) => (
          <BackgroundSlide
            key={index}
            $image={image}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentBg ? 0.9 : 0,
              transition: { duration: 1.5 }
            }}
          />
        ))}
      </BackgroundSlider>

      <AnimatedOverlay />
      <FloatingParticles>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </FloatingParticles>

      <ContentWrapper>
        <MainHeading
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Transformer ensemble le paysage <GradientText>immobilier guinéen</GradientText>
        </MainHeading>

        <MessageText
          key={currentMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {messages[currentMessage]}
        </MessageText>

        <WhyInvestButton
          onClick={() => setIsModalOpen(true)}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{
            y: -5,
            transition: { type: "spring", stiffness: 400, damping: 10 },
          }}
          whileTap={{ scale: 0.97 }}
          animate={{
            scale: isHovering ? 1.03 : 1,
            boxShadow: isHovering
              ? "0 15px 35px rgba(245, 179, 66, 0.4)"
              : "0 8px 25px rgba(0,0,0,0.2)",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
            duration: 0.3,
          }}
        >
          Investir avec nous ?
          <motion.span
            animate={{
              x: isHovering ? 8 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
          >
            <FaChevronRight />
          </motion.span>
        </WhyInvestButton>
      </ContentWrapper>

      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          >
            <ModalContainer
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 350,
                delay: 0.1,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </CloseButton>

              <ModalContent>
                <ModalTitle>
                  Pourquoi investir avec Cauris Investment ?
                </ModalTitle>

                <BenefitsGrid>
                  <BenefitCard
                    $isLeft={true}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    <BenefitHeader>
                      <BenefitIcon $isLeft={true}>
                        <FaHandshake />
                      </BenefitIcon>
                      <BenefitTitle $isLeft={true}>Avantages</BenefitTitle>
                    </BenefitHeader>
                    <BenefitList>
                      {investBenefits.avantages.map((item, index) => (
                        <BenefitListItem
                          key={index}
                          $isLeft={true}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            type: "spring",
                            stiffness: 150,
                            damping: 12,
                          }}
                        >
                          <div>
                            <strong>{item.text}</strong>
                          </div>
                        </BenefitListItem>
                      ))}
                    </BenefitList>
                  </BenefitCard>

                  <BenefitCard
                    $isLeft={false}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.25,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    <BenefitHeader>
                      <BenefitIcon $isLeft={false}>
                        <FaChartLine />
                      </BenefitIcon>
                      <BenefitTitle $isLeft={false}>
                        Bénéfices Investisseur
                      </BenefitTitle>
                    </BenefitHeader>
                    <BenefitList>
                      {investBenefits.significations.map((item, index) => (
                        <BenefitListItem
                          key={index}
                          $isLeft={false}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.35 + index * 0.1,
                            type: "spring",
                            stiffness: 150,
                            damping: 12,
                          }}
                        >
                          <div>{item}</div>
                        </BenefitListItem>
                      ))}
                    </BenefitList>
                  </BenefitCard>
                </BenefitsGrid>
              </ModalContent>
            </ModalContainer>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </HeroSection>
  );
};

export default Accueilpourservice;