import React, { useRef, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import colors from "../../Styles/colors";
import Barnaventete from "../Acueil/Barnaventete";
import { imagess } from "../../assets/imagess";

const SEO = lazy(() => import("../../SEO"));

const Accueilpourservice = lazy(() => import("./Accueilpourservice1"));
const PortfolioSection = lazy(() => import("./Portoffeille2"));
const ModelesPartenariat = lazy(() => import("./ModèlesPartenariat3"));
const CreationValeur = lazy(() => import("./SourcesRevenus4"));
const Approche = lazy(() => import("./Approche6"));
const Governance = lazy(() => import("./Gouvernance7"));
const Engagement = lazy(() => import("./Engagement8"));

const Loader = styled.div`
  color: ${colors.primaryBlue};
  font-size: 1.18rem;
  padding: 2.5rem;
  text-align: center;
  width: 100%;
  letter-spacing: 0.01em;
`;

const ProjectContainer = styled(motion.div)`
  background: ${colors.overlay};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 0;
  @media (max-width: 1024px) {
    gap: 3rem;
    padding: 3rem 0;
  }
  @media (max-width: 600px) {
    gap: 2.2rem;
    padding: 2rem 0;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.19, when: "beforeChildren" }
  }
};
const childVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const sections = [
  { key: "Accueil", Comp: Accueilpourservice, delay: 0 },
  { key: "Portfolio", Comp: PortfolioSection, delay: 0.08 },
  { key: "ModelesPartenariat", Comp: ModelesPartenariat, delay: 0.16 },
  { key: "CreationValeur", Comp: CreationValeur, delay: 0.24 },
  { key: "Approche", Comp: Approche, delay: 0.32 },
  { key: "Governance", Comp: Governance, delay: 0.4 },
  { key: "Engagement", Comp: Engagement, delay: 0.48 }
];

function Projet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  // SEO DATA
  const seoTitle = "Projet | Portefeuille, Partenariats, Valeur et ESG - Cauris Investment";
  const seoDescription =
    "Découvrez l'ensemble de notre portefeuille immobilier sélectif, nos modèles de partenariat et structuration d'investissement, nos sources de revenus, notre démarche ESG & impact, ainsi que notre gouvernance et gestion des risques. Investissez avec transparence, expertise et sécurité avec Cauris Investment.";
  const seoImage = imagess.imàgelogostextetrànspàrente || imagess.imàgelogosimpletrànspàrente;
  const seoKeywords = [
    "Cauris Investment",
    "immobilier Guinée",
    "portefeuille immobilier",
    "partenariat investissement",
    "ESG",
    "impact communautaire",
    "gouvernance",
    "gestion des risques",

    "valeur ajoutée","cauris investment", "holding immobilière", "guinée", "république de guinée", "investissement durable", "contrats long terme",  "environnemental social gouvernance", "logements abordables", "services communautaires", "emploi local", "indicateurs d'impact", "unités livrées", "emplois créés", "fournisseurs locaux", "capacités scolaires", "gouvernance", "vérification cadastrale", "audits techniques", "phasage financier", "milestones", "reporting", "comité de pilotage", "assurance chantier", "processus investisseur", "engagement"
  ];
  const seoUrl = "https://www.caurisinvestment.com/projets";

  return (
    <ProjectContainer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* === SEO POUR LE REFERENCEMENT === */}
      <Suspense fallback={null}>
        <SEO
          title={seoTitle}
          description={seoDescription}
          image={seoImage}
          keywords={seoKeywords}
          url={seoUrl}
        />
      </Suspense>
      <Barnaventete />
      <InnerContainer>
        <Suspense fallback={<Loader>TIPTAMCode</Loader>}>
          {sections.map(({ key, Comp, delay }) => (
            <motion.div
              key={key}
              variants={childVariants}
              transition={{ duration: 0.9, delay, ease: "easeOut" }}
            >
              <Comp />
            </motion.div>
          ))}
        </Suspense>
      </InnerContainer>
    </ProjectContainer>
  );
}

export default React.memo(Projet);
