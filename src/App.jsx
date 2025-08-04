import { Routes, Route } from "react-router-dom";
import React, { lazy, memo } from "react";
import Services from "./composant/services/Services";
import Projet from "./composant/services/Projet";
import Contact from "./composant/contact/Contact";
import Footer from "./composant/Acueil/Footer";
import MonQRCode from "./MonQRCode";
//import Temoignage from "./composant/services/Temoignge";
const DomainesIntervention = lazy(() =>
  import("./composant/domainesIntervention/DomainesIntervention")
);
const Navbar = lazy(() => import("./composant/Acueil/Barnav"));
const Apropos = lazy(() => import("./composant/apropos/Apropos"));

function App() {
  return (
    <>
      <Routes>
   
        <Route index element={<Navbar />} />
        <Route path="Projet" element={<Projet />} />
        <Route path="/presentation" element={<Apropos />} />

        <Route path="/domaines" element={<DomainesIntervention />} />

        <Route path="projet" element={<Services />} />

        <Route path="contact" element={<Contact />} />
        <Route path="projets" element={<Projet />} /> {/*retire àpres*/}
        <Route path="MonQRCode" element={<MonQRCode />} />
    
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
