import React, { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import PerformanceCards from "./PerformanceCards";
import PerformanceMetricsChart from "./PerformanceMetricsChart";

const AgentDashboard = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const userId = 1; // Assuming the user ID is 1 for now.

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/performance-summary/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setPerformanceData(data);
        } else {
          console.error("Error fetching data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPerformanceData();
  }, [userId]);

  const handleCardClick = (cardTitle) => {
    // Dynamically set data based on the card clicked
    const details = {
      "Total Calls": {
        inbound: performanceData.inbound_calls,
        outbound: performanceData.outbound_calls,
      },
      "Total Call Duration": {
        duration: performanceData.total_call_duration,
      },
      "Avg Call Duration": {
        average: performanceData.average_call_duration,
      },
    };

    setSelectedCard({
      title: cardTitle,
      details: details[cardTitle],
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  if (!performanceData) {
    return <div>Loading...</div>; // Or some kind of loading spinner
  }

  return (
    <>
      <Navbar />
      <PerformanceMetricsChart/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "4px",
          flexWrap: "wrap",
        }}
      >
        <PerformanceCards
          title="Total Calls"
          value={performanceData.total_calls}
          onClick={() => handleCardClick("Total Calls")}
        />
        <PerformanceCards
          title="Total Call Duration"
          value={performanceData.total_call_duration}
          onClick={() => handleCardClick("Total Call Duration")}
        />
        <PerformanceCards
          title="Avg Call Duration"
          value={performanceData.average_call_duration}
          onClick={() => handleCardClick("Avg Call Duration")}
        />
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {selectedCard?.title}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {selectedCard?.title === "Total Calls" && (
              <>
                <p>Inbound Calls: {selectedCard.details.inbound}</p>
                <p>Outbound Calls: {selectedCard.details.outbound}</p>
              </>
            )}
            {selectedCard?.title === "Total Call Duration" && (
              <p>Total Duration: {selectedCard.details.duration} minutes</p>
            )}
            {selectedCard?.title === "Avg Call Duration" && (
              <p>Average Duration: {selectedCard.details.average} minutes</p>
            )}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default AgentDashboard;
