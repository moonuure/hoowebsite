import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  percentage,
  iconBgColor,
  bgColor,
  iconColor,
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: 20,
        backgroundColor: bgColor,
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
      }}
      className="Papers"
    >
      <Box
        style={{
          position: "absolute",
          top: 5,
          left: 10,
          backgroundColor: iconBgColor || "#000",
          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Icon style={{ fontSize: 30, color: iconColor || "#fff" }} />
      </Box>

      <Box style={{ textAlign: "right", marginBottom: 20 }}>
        <Typography
          variant="body2"
          style={{ color: "#555", fontWeight: "revert-layer" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          style={{ color: "#B80", marginTop: 5, fontWeight: "bold" }}
        >
          {value}
        </Typography>
      </Box>

      <Box
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ddd",
          margin: "20px 0",
        }}
      />

      <Typography
        variant="body2"
        style={{
          color: percentage >= 0 ? "green" : "red",
          fontWeight: "normal",
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

export default StatCard;
