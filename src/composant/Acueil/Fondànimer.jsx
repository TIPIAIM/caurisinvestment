import { motion } from "framer-motion";
import styled from "styled-components";

const AnimatedGrid = styled(motion.svg)`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
`;

function Fondànimer() {
  return (
    <AnimatedGrid
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      initial={{ x: -30, y: -25, opacity: 0.3 }}
      animate={{ x: 30, y: 25, opacity: 0.7 }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {/* Grille : traits diagonaux et verticaux */}
      {[...Array(40)].map((_, i) => (
        <line
          key={"v" + i}
          x1={i * 30}
          y1="0"
          x2={i * 30}
          y2="800"
          stroke="#2A4B7C"
          strokeWidth="0.6"
          opacity="0.38"
        />
      ))}
      {[...Array(28)].map((_, i) => (
        <line
          key={"d" + i}
          x1="0"
          y1={i * 30}
          x2="1200"
          y2={i * 30}
          stroke="#2A4B7C"
          strokeWidth="0.6"
          opacity="0.27"
        />
      ))}
      {/* Traits diagonaux (optionnel, effet dynamique) */}
      {[...Array(10)].map((_, i) => (
        <line
          key={"diag" + i}
          x1={i * 120}
          y1="0"
          x2="0"
          y2={i * 80}
          stroke="#2A4B7C"
          strokeWidth="0.5"
          opacity="0.13"
        />
      ))}
    </AnimatedGrid>
  );
}
export default Fondànimer;