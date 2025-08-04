import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { imagess } from "../../assets/imagess";
import colors from "../../Styles/colors";

const TestimonialContainer = styled.section`
  padding: 4rem 1rem;
  background: linear-gradient(
    120deg,
    ${colors.overlay} 65%,
    ${colors.accentGold} 60%
  );  position: relative;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
`;

const Controls = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1.5rem;
  z-index: 2;
`;

const NavButton = styled.button`
  background: ${({ $active }) => ($active ? "#6c757d" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "#6c757d")};
  border: 1px solid #6c757d;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #6c757d;
    z-index: -1;
    transform: scale(0);
    transition: transform 0.3s ease;
    border-radius: 50%;
  }

  &:hover {
    color: white;
    transform: scale(1.1);

    &::before {
      transform: scale(1);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TestimonialContent = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0rem 0.5rem;
    text-align: center;
  }
`;

const AuthorImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 2rem;
  border: 3px solid white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  filter: grayscale(20%);
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%);
    transform: scale(1.05);
  }
`;

const QuoteContainer = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 20px;
    height: 20px;
    background: white;
  }
`;

const Quote = styled.blockquote`
  font-size: 1.3rem;
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
  position: relative;
  padding: 0 1rem;
  font-weight: 400;
  font-style: italic;

  svg {
    color: #adb5bd;
    font-size: 1.2rem;
    margin: 0 0.5rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AuthorInfo = styled.cite`
  display: block;
  font-style: normal;
  color: ${colors.accentGold};
  font-weight: 800;
  margin-top: 1.5rem;
  font-size: 1.5rem;

  span {
    display: block;
    font-weight: 400;
    color: #6c757d;
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#6c757d" : "#ced4da")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.3);
    background: #6c757d;
  }
`;

const Temoignage = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const testimonials =
  [
    {
      author: "  Abdoulaye Keita  ",
      role: "Cliente – Projet d'achat immobilier à Conakry",
      text: "Je recommande vivement ce cabinet ! De la première consultation à la signature définitive, j’ai senti un accompagnement réel : les conseils juridiques étaient clairs, précis et adaptés à ma situation financière. Tout a été fait pour me rassurer, même lorsque je ne connaissais rien au droit immobilier.",
      image: imagess.abdoulayeavoc,
    },
    {
      author: "Ibrahima Diallo",
      role: "Particulier – Location commerciale à Kaloum",
      text: "En tant que propriétaire, je souhaitais louer mes espaces avec toutes les garanties légales possibles. Le cabinet a pris en main la rédaction du bail, la vérification des dossiers du locataire, et m’a informé à chaque étape. Résultat : un contrat parfaitement sécurisé et conclu en un temps record.",
      image: imagess.paul,
    },
    {
      author: "Naroumba",
      role: "Fondatrice d’entreprise – Booster Event",
      text: "J’avais besoin d’un conseil fiscal et contractuel pour l’ouverture de ma première salle événementielle. J’ai trouvé un service très professionnel et humain : explications claires, langue simple, sans jargon. Le dossier a été réglé efficacement, sans mauvaise surprise.",
      image: imagess.naroumb,
    },
    {
      author: "Fatoumata Keita",
      role: "Investisseur particulier – Financement mixte",
      text: "Le cabinet m’a guidé dans la structuration de mon apport personnel et de mes partenaires financiers. Grâce à leur expertise, notre dossier a convaincu la banque en moins d’un mois. Merci pour le suivi personnalisé et réactif.",
      image: imagess.keitaseul2,
    }
  ]  

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isDragging]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.3, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <TestimonialContainer>
      <AnimatePresence mode="wait" custom={direction}>
        <TestimonialContent
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, { offset, velocity }) => {
            setIsDragging(false);
            const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500;
            if (swipe) {
              offset.x > 0 || velocity.x > 0 ? handlePrev() : handleNext();
            }
          }}
        >
          <AuthorImage
            src={testimonials[current].image}
            alt={testimonials[current].author}
            loading="lazy"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          />
          
          <QuoteContainer>
            <Quote>
              <FaQuoteLeft />
              {testimonials[current].text}
              <FaQuoteRight />
            </Quote>
            
            <AuthorInfo>
              {testimonials[current].author}
              <span>{testimonials[current].role}</span>
            </AuthorInfo>
          </QuoteContainer>
        </TestimonialContent>
      </AnimatePresence>

      <Controls>
        <NavButton onClick={handlePrev} aria-label="Précédent">
          ‹
        </NavButton>
        <NavButton onClick={handleNext} aria-label="Suivant">
          ›
        </NavButton>
      </Controls>

      <DotsContainer>
        {testimonials.map((_, index) => (
          <Dot
            key={index}
            $active={index === current}
            onClick={() => goToTestimonial(index)}
          />
        ))}
      </DotsContainer>
    </TestimonialContainer>
  );
};

export default Temoignage;