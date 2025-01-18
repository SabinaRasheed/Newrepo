import React, {useEffect, useState } from "react";
import Navbar from "./Navbar";
import PerformanceCards from "./PerformanceCards";

const AgentDashboard = () => {
    const [performanceData, setPerformanceData] = useState(null);
    const userId = 1;  // Assuming the user ID is 1 for now. Replace with actual user ID from session or authentication.
  
    useEffect(() => {
      const fetchPerformanceData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/performance-summary/${userId}`);
          const data = await response.json();
  
          if (response.ok) {
            setPerformanceData(data);
          } else {
            console.error('Error fetching data:', data.message);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchPerformanceData();
    }, [userId]);
  
    if (!performanceData) {
      return <div>Loading...</div>; // Or some kind of loading spinner
    }
return <>
<Navbar/>

<div style={{display:"flex",justifyContent:"space-around",marginTop:"4px",flexWrap:"wrap"}}>
        <PerformanceCards title="Total Calls" value={performanceData.total_calls} />
        <PerformanceCards title="Total Call Duration" value={performanceData.total_call_duration} />
        <PerformanceCards title="Avg Call Duration" value={performanceData.average_call_duration} />
        <PerformanceCards title="Connected Calls" value={performanceData.connected_calls} />
        <PerformanceCards title="Not Connected Calls" value={performanceData.not_connected_calls} />
        <PerformanceCards title="Inbound Calls" value={performanceData.inbound_calls} />
        <PerformanceCards title="Outbound Calls" value={performanceData.outbound_calls} />
        <PerformanceCards title="Missed Calls" value={performanceData.missed_calls} />
        <PerformanceCards title="User Busy Calls" value={performanceData.user_busy_calls} />
        <PerformanceCards title="Not Attended Calls" value={performanceData.not_attended_calls} />
      </div>

</>
  };

  export default AgentDashboard;
