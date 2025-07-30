import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { send } from "@emailjs/browser";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../../SEO";
import { imagess } from "../../assets/imagess";
import Barnaventete from "../Acueil/Barnaventete";

// EmailJS ENV send
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_IDC,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_IDC,
  userId: import.meta.env.VITE_EMAILJS_USER_IDC,
};


// ------ Email, téléphone, WhatsApp -----------
const EMAIL = "contact@caurisinvestment.com";
const PHONE = "+224612858507";
const WHATSAPP = "+224612858507";

// Animation d'entrée
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ContactWrapper = styled(motion.section)`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${colors.overlay} 65%,
    ${colors.accentGold} 60%
  );
  overflow: hidden;
  padding: 4rem 0;
  @media (max-width: 900px) {
    padding: 2rem 0;
  }
`;

const ContactContainer = styled(motion.div)`
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
  display: grid;
  margin-top: 10rem;
  margin-bottom: 8rem;
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
  z-index: 2;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfoPanel = styled(motion.div)`
  background: linear-gradient(
    120deg,
    ${colors.overlay} 90%,
    ${colors.accentGold} 60%
  );
  backdrop-filter: blur(12px);
  border-radius: 0 0 0 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  z-index: 2;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  @media (max-width: 900px) {
    width: 100%;
    padding: 2rem 1.5rem;
  }
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
  line-height: 1.2;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 160px;
    height: 4px;
    background: ${colors.accentGold};
    border-radius: 2px;
  }

  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

const ContactDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  line-height: 1.6;

  svg {
    color: ${colors.accentGold};
    font-size: 1.3rem;
    margin-top: 0.2rem;
    flex-shrink: 0;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      color: ${colors.accentGold};
    }
  }

  b {
    font-weight: 600;
    color: ${colors.accentGold};
  }
`;

const WhatsappButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: #25d366;
  color: white;
  font-weight: 600;
  border-radius: 0 0 0 22px;
  padding: 1rem 1.8rem;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  width: fit-content;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #128c7e;
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 1.4rem;
  }
`;

const FormPanel = styled(motion.form)`
  background: linear-gradient(
    120deg,
    ${colors.white} 90%,
    ${colors.overlay} 60%
  );
  border-radius: 0 56px 0 0;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 2;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.6s ease-out forwards;

  @media (max-width: 900px) {
    padding: 2rem 1.5rem;
    width: 100%;
  }
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${colors.navyBg};
  opacity: 0.8;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(245, 245, 245, 0.8);
  border: 1px solid ${({ $invalid }) => ($invalid ? colors.error : "#e2e8f0")};
  border-radius: 2px;
  font-size: 1rem;
  padding: 1rem 1.2rem;
  outline: none;
  color: ${colors.navyBg};
  font-weight: 500;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ $invalid }) =>
      $invalid ? colors.error : colors.accentGold};
    background: white;
    box-shadow: 0 0 0 3px
      ${({ $invalid }) =>
        $invalid ? `${colors.error}20` : `${colors.accentGold}20`};
  }

  &::placeholder {
    color: #94a3b8;
    opacity: 0.7;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background: rgba(245, 245, 245, 0.1);
  border: 1px solid ${({ $invalid }) => ($invalid ? colors.error : "#e2e8f0")};
  border-radius: 2px;
  font-size: 1rem;
  padding: 1rem 1.2rem;
  outline: none;
  color: ${colors.accentTurquoise};
  font-weight: 500;
  min-height: 150px;
  max-height: 300px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ $invalid }) =>
      $invalid ? colors.error : colors.accentGold};
    background: white;
    box-shadow: 0 0 0 3px
      ${({ $invalid }) =>
        $invalid ? `${colors.error}20` : `${colors.accentGold}20`};
  }

  &::placeholder {
    color: #94a3b8;
    opacity: 0.7;
  }
`;

const SubmitBtn = styled(motion.button)`
  background: linear-gradient(
    126deg,
    ${colors.accentTurquoise} 90%,
    ${colors.accentGold} 10%
  );
  color: white;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  padding: 1.2rem 2.5rem;
  margin-top: 1rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(
      126deg,
      ${colors.accentGold} 90%,
      ${colors.accentTurquoise} 10%
    );
    color: ${colors.accentTurquoise};
    &::after {
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: 0.85rem;
  margin-top: 0.3rem;
  display: block;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease-out;
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 0.85rem;
  color: ${({ $invalid }) => ($invalid ? colors.error : "#64748b")};
  margin-top: 0.3rem;
  font-weight: ${({ $invalid }) => ($invalid ? "600" : "400")};
`;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSending, setIsSending] = useState(false);

  // Fonction pour supprimer les caractères HTML
  const sanitizeInput = (value) => {
    return value.replace(/<[^>]*>?/gm, "");
  };

  // Validation des champs
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length >= 2;
      case "email":
        return /^[^\s@]+@[^\s@]+\.com$/.test(value);
      case "message":
        return value.trim().length >= 10;
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = sanitizeInput(value);

    // Transformation en majuscules pour le nom
    if (name === "name") {
      sanitizedValue = sanitizedValue.toUpperCase();
    }

    setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Validation globale du formulaire
  const validateForm = () => {
    return (
      validateField("name", form.name) &&
      validateField("email", form.email) &&
      validateField("message", form.message)
    );
  };

  // Envoi avec email.js (config via .env)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(
        "Veuillez corriger les erreurs dans le formulaire avant de soumettre."
      );
      return;
    }
    setIsSending(true);

    try {
      await send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          //     date: new Date().toLocaleString("fr-FR"),
        },
        EMAILJS_CONFIG.userId
      );

      toast.success("Message envoyé avec succès !");
      setForm({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch (error) {
       toast.error("Erreur lors de l'envoi du message. Essayez à nouveau.");
    } finally {
      setIsSending(false);
    }
 
  };

  return (
    <div>
      <Barnaventete />
      <ContactWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SEO
          title="Contactez-nous | Cauris Investment Guinée"
          description="Contactez notre équipe Cauris Investment pour toute demande d'information, devis ou partenariat. Réponse rapide par e-mail, WhatsApp ou téléphone."
          keywords={[
            "contact",
            "Cauris Investment",
            "immobilier Guinée",
            "investissement Guinée",
            "partenariat",
            "demande de devis",
            "projets immobiliers",
            "WhatsApp Cauris",
            "numéro téléphone",
            "adresse Cauris",
          ]}
          url="https://www.caurisinvestment.com/contact"
          image={imagess.àlphà}
          type="website"
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <ContactContainer>
          {/* --- Colonne Gauche : Infos --- */}
          <ContactInfoPanel
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ContactTitle>Contactez-nous</ContactTitle>
            <ContactDescription>
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions. N'hésitez pas à nous contacter via le formulaire ou
              directement par téléphone.
            </ContactDescription>

            <InfoList>
              <InfoItem>
                <Mail />
                <div>
                  <b>Email :</b> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </InfoItem>

              <InfoItem>
                <Phone />
                <div>
                  <b>Téléphone :</b> <a href={`tel:${PHONE}`}>{PHONE}</a>
                </div>
              </InfoItem>

              <InfoItem>
                <MapPin />
                <div>
                  <b>Adresse :</b> Conakry, Guinée – Quartier Kipé
                </div>
              </InfoItem>
            </InfoList>

            <WhatsappButton
              href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactez-nous sur WhatsApp"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp /> WhatsApp Direct
            </WhatsappButton>
          </ContactInfoPanel>

          {/* --- Colonne Droite : Formulaire --- */}
          <FormPanel
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InputGroup>
              {/*        <InputLabel>Nom complet *</InputLabel>
               */}{" "}
              <Input
                type="text"
                name="name"
                placeholder="Votre nom complet"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={touched.name && !validateField("name", form.name)}
                required
              />
              {touched.name && !validateField("name", form.name) && (
                <ErrorMessage>
                  Le nom doit contenir au moins 2 lettres
                </ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              {/*<InputLabel>Adresse email *</InputLabel>*/}
              <Input
                type="email"
                name="email"
                placeholder="votre emàil : exemple@domaine.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={touched.email && !validateField("email", form.email)}
                required
              />
              {touched.email && !validateField("email", form.email) && (
                <ErrorMessage>
                  Veuillez entrer une adresse email valide se terminant par .com
                </ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              {/*           <InputLabel>Votre message *</InputLabel>
               */}{" "}
              <Textarea
                name="message"
                placeholder="Décrivez votre demande en détails..."
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={
                  touched.message && !validateField("message", form.message)
                }
                required
              />
              <CharCount $invalid={form.message.length < 10 && touched.message}>
                {form.message.length}/10 caractères minimum
              </CharCount>
              {touched.message && !validateField("message", form.message) && (
                <ErrorMessage>
                  Le message doit contenir au moins 10 caractères
                </ErrorMessage>
              )}
            </InputGroup>

            <SubmitBtn
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSending || !validateForm()}
            >
              <Send size={20} />
              {isSending ? "Envoi en cours..." : "Envoyer le message"}
            </SubmitBtn>
          </FormPanel>
        </ContactContainer>
      </ContactWrapper>
    </div>
  );
};

export default React.memo(Contact);
