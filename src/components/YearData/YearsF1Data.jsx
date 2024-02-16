import React, { Fragment, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const YearsData = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDataForYear = async (year) => {
    try {
      const response = await axios.get(
        `http://ergast.com/api/f1/${year}/results.json`
      );
      setSelectedYear(response.data);
      setLoading(false);
      console.log("get data", response.data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
      },
    },
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.3,
        type: "spring",
      },
    },
  };

  const handleYearOnClick = (year) => {
    getDataForYear(year);
    console.log("Data: ", year);
  };

  if (error) {
    return <div>Errror: {error}</div>;
  }

  const years = [];
  for (let year = 2005; year <= new Date().getFullYear(); year++) {
    years.push(year);
  }

  const splitYears = [];
  for (let i = 0; i < years.length; i += 5) {
    splitYears.push(years.slice(i, i + 5));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {!selectedYear ? (
        <Stack direction="column" spacing={2}>
          {splitYears.map((chunk, index) => (
            <Fragment key={index}>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ textAlign: "center", color: "#F05941" }}
                >
                  {`${chunk[0]} - ${chunk[chunk.length - 1]}`}
                </Typography>
              </motion.div>
              <motion.div
                variants={scrollVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <Grid
                  container
                  justifyContent={index % 2 === 0 ? "flex-start" : "flex-end"}
                >
                  <Grid item xs={12} md={6}>
                    <Timeline position="alternate">
                      {chunk.map((year) => (
                        <motion.div
                          key={year}
                          variants={hoverVariants}
                          whileHover="hover"
                        >
                          <TimelineItem onClick={() => handleYearOnClick(year)}>
                            <TimelineSeparator>
                              <TimelineDot />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ color: "#EEF0E5" }}>
                              {year}
                            </TimelineContent>
                          </TimelineItem>
                        </motion.div>
                      ))}
                    </Timeline>
                  </Grid>
                </Grid>
              </motion.div>
            </Fragment>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 2, color: "#F05941" }}
          >
            Season {selectedYear.MRData.RaceTable.season}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Race name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedYear.MRData.RaceTable.Races.map((race, index) => (
                  <TableRow key={index}>
                    <TableCell>{race.raceName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default YearsData;
