import React from "react";
import { motion } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";
import formulaF1 from "../../images/sample1.jpg";
import backImage from "../../images/sample2.jpg";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const imageVariants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        stiffness: 120,
        duration: 1.2,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
    float: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
      },
    },
  };

  return (
    <motion.div
      className="landing-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <motion.div
        variants={textVariants}
        className="landing-text"
        style={{
          color: "#FBFBFB",
          maxWidth: "600px",
          textAlign: "left",
          marginRight: isMobile ? "0" : "2rem",
          marginBottom: isMobile ? "2rem" : "0",
          padding: "20px",
        }}
      >
        <h1>Explore Detailed Race Winners for Each F1 Season</h1>
        <p>
          Discover the champions of every race in each F1 season with just a
          click. Get ready to dive into the thrilling world of Formula 1.
        </p>
      </motion.div>
      <motion.img
        variants={imageVariants}
        src={formulaF1}
        initial="hidden"
        animate="visible"
        alt="Formula F1"
        whileHover="float"
        style={{
          width: isMobile ? "100%" : "40%",
          maxWidth: "100%",
          height: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10%",
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
};

export default LandingPage;
