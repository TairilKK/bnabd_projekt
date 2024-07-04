import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";

const TotalRevenueDashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8090/api/v1/rents/stats/category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching the stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Łączny Przychód</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={stats}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalRevenue"
                fill="#82ca9d"
                name="Łączny Przychód"
              />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default TotalRevenueDashboard;
