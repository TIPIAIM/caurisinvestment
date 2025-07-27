import { motion } from "framer-motion";
import styled from "styled-components";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  ArrowUp,
  HelpCircle,
  FileText,
  Lock,
  Hand,
  X,
} from "lucide-react";
import { useState } from "react";
import colors from "../../Styles/colors";

// Animations
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

const FullWidthFooter = styled.footer`
  width: 100vw;
  background: ${colors.accentTurquoise};
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const FooterContainer = styled.footer`
  background: ${colors.overlayAlpha};
  width: 100%;
`;

const InnerContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SectionTitle = styled(motion.h3)`
  color: ${colors.accentGold};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  position: relative;
  padding-bottom: 0.5rem;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${colors.accentGold};
    border-radius: 2px;
  }
`;

const ContactSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;
const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: ${colors.white};
  font-size: 1rem;
  svg {
    color: ${colors.accentGold};
    flex-shrink: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: ${colors.accentGold};
    }
  }
`;

const ServicesSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ServiceItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${colors.white};
  font-size: 0.97rem;
  svg {
    color: ${colors.accentGold};
    flex-shrink: 0;
  }
`;

const SocialSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${colors.accentTurquoise};
  border: 1.5px solid ${colors.accentGold};
  border-radius: 100px;
  color: ${colors.white};
  transition: all 0.3s ease;
  &:hover {
    background: ${colors.accentGold};
    color: ${colors.white};
    border-color: ${colors.accentTurquoise};
  }
`;

const NewsletterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NewsletterButton = styled(motion.button)`
  background: ${colors.accentGold};
  color: ${colors.accentTurquoise};
  border: none;
  padding: 0.8rem 1.3rem;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  &:hover {
    background: ${colors.accentTurquoise};
    color: ${colors.white};
  }
`;

const LegalSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-column: 1 / -1;
  border-top: 1px solid ${colors.accentGold}33;
  padding-top: 2rem;
  margin-top: 1.3rem;
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: left;
`;
//securis
const LegalLink = styled(motion.a)`
  color: ${colors.accentGold};
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  background: none;
  border: none;
  &:hover {
    color: ${colors.white};
  }
`;

const CopyrightSection = styled(motion.div)`
  text-align: center;
  color: ${colors.white};
  font-size: 0.95rem;
  margin-top: 2rem;
`;

const BackToTop = styled(motion.button)`
  background: none;
  border: none;
  color: ${colors.accentGold};
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 1.5rem auto 0;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s;
  &:hover {
    color: ${colors.white};
  }
`;

// Modal Styles
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled(motion.div)`
  background: ${colors.white};
  padding: 2rem;
  border-radius: 8px;
  max-width: 480px;
  width: 94%;
  position: relative;
  color: ${colors.dark};
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${colors.dark};
  cursor: pointer;
  font-size: 1.3rem;
`;
const ModalTitle = styled.h3`
  color: ${colors.primary};
  font-size: 1.45rem;
  margin-bottom: 1.1rem;
`;

const ModalText = styled.div`
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: left;
  h4 {
    color: ${colors.primary};
    margin: 1.4rem 0 0.45rem;
  }
  ul {
    padding-left: 1.2rem;
    margin: 0.5rem 0;
  }
  li {
    margin-bottom: 0.5rem;
  }
`;

const Footer = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Contenus légaux adaptés Cauris Investment
  const legalContents = {
    mentions: {
      title: "Mentions Légales",
      content: (
        <ModalText>
          <h4>Éditeur du site</h4>
          <p>
            CAURIS INVESTMENT SARL
            <br />
            Capital social : 250 000 000 GNF
            <br />
            RCCM : GN-KAL-01-2022-B14-00001
            <br />
            Siège social : Minière, Commune de Dixinn, Conakry, Guinée
          </p>
          <h4>Directeur de publication</h4>
          <p>M. Saeed Khan Zaman, Gérant</p>
          <h4>Hébergement</h4>
          <p>
            AWS - Amazon Web Services
            <br />
            Serveur sécurisé Europe
          </p>
          <h4>Protection des données</h4>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, modification
            et suppression des données vous concernant.
          </p>
        </ModalText>
      ),
    },
    privacy: {
      title: "Politique de Confidentialité",
      content: (
        <ModalText>
          <h4>Données collectées</h4>
          <ul>
            <li>Nom, prénom</li>
            <li>Adresse email</li>
            <li>Téléphone</li>
            <li>Données de navigation</li>
          </ul>
          <h4>Utilisation</h4>
          <ul>
            <li>Gestion de la relation client</li>
            <li>Envoi d'informations et offres professionnelles</li>
            <li>Optimisation des services et sécurité</li>
          </ul>
          <h4>Sécurité</h4>
          <p>
            Toutes les données sont stockées sur des serveurs sécurisés
            conformément aux normes en vigueur.
          </p>
        </ModalText>
      ),
    },
    faq: {
      title: "Foire Aux Questions",
      content: (
        <ModalText>
          <h4>Paiements & investissements</h4>
          <ul>
            <li>
              <strong>Qui peut investir avec Cauris Investment ?</strong>
              <br />
              Tout investisseur institutionnel ou privé, après validation KYC.
            </li>
            <li>
              <strong>
                Comment suivre l'évolution de mon investissement ?
              </strong>
              <br />
              Vous disposez d'un espace dédié, reporting régulier et contact
              direct avec nos équipes.
            </li>
          </ul>
          <h4>Contact & services</h4>
          <ul>
            <li>
              <strong>Comment joindre Cauris ?</strong>
              <br />
              Via le formulaire de contact, WhatsApp, téléphone ou email.
            </li>
          </ul>
        </ModalText>
      ),
    },
    cgu: {
      title: "Conditions Générales d'Utilisation",
      content: (
        <ModalText>
          <h4>Article 1 - Objet</h4>
          <p>
            Les présentes CGU régissent l’utilisation de la plateforme
            caurisinvestment.com et des services proposés.
          </p>
          <h4>Article 2 - Confidentialité</h4>
          <p>
            Cauris Investment s’engage à protéger vos données conformément au
            RGPD.
          </p>
          <h4>Article 3 - Propriété intellectuelle</h4>
          <p>
            Tous les contenus (textes, images, logos) sont la propriété
            exclusive de Cauris Investment.
          </p>
        </ModalText>
      ),
    },
  };

  return (
    <FullWidthFooter>
      <FooterContainer>
        <InnerContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerVariants}
        >
          <GridContainer>
            {/* --- Contact --- */}
            <ContactSection variants={itemVariants}>
              <SectionTitle>Contact</SectionTitle>
              <ContactItem>
                <MapPin size={18} />
                <span>Minière, Dixinn, Conakry, Guinée</span>
              </ContactItem>
              <ContactItem>
                <Phone size={18} />
                <a href="tel:+224612858507">+224 612 85 85 07</a>
              </ContactItem>
              <ContactItem>
                <Mail size={18} />
                <a href="mailto:contact@caurisinvestment.com">
                  contact@caurisinvestment.com
                </a>
              </ContactItem>
            </ContactSection>
            {/* --- Activités / Services --- */}
            <ServicesSection variants={itemVariants}>
              <SectionTitle>Nos activités</SectionTitle>
              <ServiceItem>
                <Hand size={18} />
                <span>Structuration d’investissements</span>
              </ServiceItem>
              <ServiceItem>
                <FileText size={18} />
                <span>Partenariats & Conseil</span>
              </ServiceItem>
              <ServiceItem>
                <Lock size={18} />
                <span>Gouvernance & Conformité</span>
              </ServiceItem>
            </ServicesSection>
            {/* --- Réseaux sociaux --- */}
            <SocialSection variants={itemVariants}>
              <SectionTitle>Réseaux sociaux</SectionTitle>
              <SocialLinks>
                <SocialLink
                  href="https://www.linkedin.com/company/caurisinvestment"
                  target="_blank"
                  aria-label="LinkedIn"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={22} />
                </SocialLink>
                <SocialLink
                  href="https://www.facebook.com/caurisinvestment"
                  target="_blank"
                  aria-label="Facebook"
                  rel="noopener noreferrer"
                >
                  <Facebook size={22} />
                </SocialLink>
              </SocialLinks>
            </SocialSection>
            {/* --- À propos / Newsletter --- */}
            <NewsletterSection variants={itemVariants}>
              <SectionTitle>À propo</SectionTitle>
              <p style={{ color: colors.white, fontSize: "1rem" }}>
                Cauris Investment accompagne les investisseurs et institutions
                en Guinée et Afrique de l’Ouest sur des projets innovants,
                responsables et sécurisés.
              </p>
              <NewsletterForm>
                <NewsletterButton>Merci pour votre confiance</NewsletterButton>
              </NewsletterForm>
            </NewsletterSection>
          </GridContainer>
          {/* --- Légal / CGU --- */}
          <LegalSection variants={itemVariants}>
            <LegalLinks>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.mentions)}
              >
                <FileText size={16} /> Mentions légales
              </LegalLink>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.privacy)}
              >
                <Lock size={16} /> Confidentialité
              </LegalLink>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.faq)}
              >
                <HelpCircle size={16} /> FAQ
              </LegalLink>
              <LegalLink
                as="button"
                onClick={() => openModal(legalContents.cgu)}
              >
                <FileText size={16} /> CGU
              </LegalLink>
            </LegalLinks>
          </LegalSection>
          {/* --- Copyright --- */}
          <CopyrightSection variants={itemVariants}>
            <p>
              © {new Date().getFullYear()} Cauris Investment – Tous droits
              réservés
            </p>
            <BackToTop onClick={scrollToTop}>
              <ArrowUp size={18} />
              Retour en haut
            </BackToTop>
          </CopyrightSection>
        </InnerContainer>

        {/* --- Modal Légal --- */}
        {isModalOpen && (
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <X size={24} />
              </CloseButton>
              <ModalTitle>{modalContent.title}</ModalTitle>
              {modalContent.content}
            </ModalContent>
          </ModalBackdrop>
        )}
      </FooterContainer>
    </FullWidthFooter>
  );
};

export default Footer;
