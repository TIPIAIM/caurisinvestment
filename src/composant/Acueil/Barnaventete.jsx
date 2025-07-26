// src/components/Navbar.jsx
import React, { useState, Suspense, memo } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, Briefcase, Layers, Phone } from "lucide-react";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
 
// Import Home1 en lazy + mémo


// Icônes pour chaque lien
const navIcons = {
  "/": Home,
  "/presentation": Users,
  "/domaines": Layers,
  "/projets": Briefcase,
  "/contact": Phone,
};

// --- Styled components (identiques à ta base) ---
const NavbarContainer = styled.nav`
  width: 100%;
  
  background: ${colors.accentTurquoise};
  color: ${colors.white};
  box-shadow: 0 2px 16px rgba(21, 51, 92, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0.7rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoBlock = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  img {
    height: 60px;
    margin-right: 5px;
  }
  span {
    font-weight: 700;
    font-size: 1.6rem;
    color: ${colors.accentGold};
    letter-spacing: 2px;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLinkItem = styled.li``;

const StyledLink = styled(Link)`
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 0px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  transition: color 0.2s, border 0.2s;
  position: relative;

  &:hover {
    color: ${colors.accentGold};
    border-bottom: 2px solid ${colors.accentGold};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${colors.white};
  cursor: pointer;
  font-size: 2rem;

  @media (max-width: 900px) {
    display: block;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? 0 : "-100%")};
  width: 260px;
  height: 100vh;
  background: ${colors.accentTurquoise};
  box-shadow: -2px 0 16px rgba(21, 51, 92, 0.12);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 1.5rem;
  transition: right 0.3s cubic-bezier(0.4, 2, 0.55, 0.67);
  z-index: 200;
  gap: 2rem;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${colors.accentGold};
  font-size: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const SidebarLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 2px solid transparent;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;

  &:hover {
    color: ${colors.accentGold};
    border-bottom: 2px solid ${colors.accentGold};
  }
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.78);
  z-index: 150;
`;

const Barnaventete = memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  // Définition des liens et icônes
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/domaines", label: "Domaines d’intervention" },
    { to: "/presentation", label: "Apropos" },
    { to: "/projets", label: "Références " },
    { to: "/contact", label: "Contact" },
  ];

  // Animation shake
  const shakeAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, -6, 6, -3, 3, 0],
      transition: { duration: 0.35, ease: "easeInOut" },
    },
  };

  return (
    <>
      <NavbarContainer>
        <NavContent>
          <LogoBlock to="/">
            <img src='/img/corislogo.PNG' alt="Cauris Investment Logo" />
          </LogoBlock>
          <NavLinks>
            {links.map((link) => {
              const Icon = navIcons[link.to] || Home;
              const isHovered = hoveredLink === link.to;
              const isActive = location.pathname === link.to;
              return (
                <NavLinkItem key={link.to}>
                  <StyledLink
                    to={link.to}
                    onMouseEnter={() => setHoveredLink(link.to)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: isActive ? colors.accentGold : undefined,
                    }}
                  >
                    <motion.span
                      style={{ display: "flex", alignItems: "center" }}
                      {...(isHovered ? shakeAnimation : { initial: { x: 0 } })}
                    >
                      <Icon size={19} />
                    </motion.span>
                    {link.label}
                  </StyledLink>
                </NavLinkItem>
              );
            })}
          </NavLinks>
          <MenuButton
            aria-label="Ouvrir le menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </MenuButton>
        </NavContent>
      </NavbarContainer>

      {/* Overlay */}
      <Overlay open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar menu mobile */}
      <Sidebar open={sidebarOpen}>
        <CloseButton
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={28} />
        </CloseButton>
        {links.map((link) => {
          const Icon = navIcons[link.to] || Home;
          return (
            <SidebarLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              style={{
                color:
                  location.pathname === link.to ? colors.accentGold : undefined,
              }}
            >
              <Icon size={20} style={{ marginRight: 6 }} />
              {link.label}
            </SidebarLink>
          );
        })}
      </Sidebar>

  
    </>
  );
});

export default Barnaventete;
