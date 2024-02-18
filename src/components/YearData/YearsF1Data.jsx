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
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const YearsData = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [error, setError] = useState(null);
  const [loadingYear, setLoadingYear] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const getDataForYear = async (year) => {
    setCurrentPage(0);
    setLoadingYear(year);
    try {
      const response = await axios.get(
        `http://ergast.com/api/f1/${year}/results/1.json`
      );
      setSelectedYear(response.data);
      console.log("get data", response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingYear(null);
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

  const resetView = () => {
    setSelectedYear(null);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const racesToShow = selectedYear
    ? selectedYear.MRData.RaceTable.Races.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage
      )
    : [];

  return (
    <Container>
      {!selectedYear ? (
        <Stack direction="column" spacing={2} sx={{ marginTop: "40px" }}>
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
                          <TimelineItem
                            onClick={() => handleYearOnClick(year)}
                            sx={{
                              cursor: "pointer",
                              "&:hover": {
                                "& .MuiTimelineContent-root": {
                                  color: "#F05941",
                                },
                              },
                            }}
                          >
                            <TimelineSeparator>
                              <TimelineDot />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ color: "#EEF0E5" }}>
                              {year}
                              {loadingYear === year && (
                                <CircularProgress
                                  size={20}
                                  sx={{ marginLeft: 1 }}
                                />
                              )}
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
            <Button sx={{ margin: 2 }} variant="outlined" onClick={resetView}>
              Close
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Race name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Winner</TableCell>
                  <TableCell>Circuit Name</TableCell>
                  <TableCell>Constructor</TableCell>
                  <TableCell>Nationality</TableCell>
                  <TableCell>Laps</TableCell>
                  <TableCell>Grid Position</TableCell>
                  <TableCell>Final Position</TableCell>
                  <TableCell>Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {racesToShow.map((race, index) => (
                  <TableRow key={index}>
                    <TableCell>{race.raceName}</TableCell>
                    <TableCell>{race.date}</TableCell>
                    <TableCell>{race.Circuit.circuitName}</TableCell>
                    <TableCell>{`${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`}</TableCell>
                    <TableCell>{race.Results[0].Constructor.name}</TableCell>
                    <TableCell>{race.Results[0].Driver.nationality}</TableCell>
                    <TableCell>{race.Results[0].laps}</TableCell>
                    <TableCell>{race.Results[0].grid}</TableCell>
                    <TableCell>{race.Results[0].positionText}</TableCell>
                    <TableCell>{race.Results[0].points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Button onClick={handlePrevious} disabled={currentPage === 0}>
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  racesToShow.length < rowsPerPage ||
                  (currentPage + 1) * rowsPerPage >=
                    selectedYear.MRData.RaceTable.Races.length
                }
              >
                Next
              </Button>
            </Box>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default YearsData;
