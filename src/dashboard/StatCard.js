import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  percentage,
  bgColor,
  iconBgColor,
  iconColor,
}) => {
  return (
    <Card sx={{ backgroundColor: bgColor, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Box
            sx={{
              backgroundColor: iconBgColor,
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 2,
            }}
          >
            <Icon sx={{ color: iconColor, fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
        </Box>
        <Typography variant="body2">{description}</Typography>
        {percentage !== undefined && (
          <Typography
            variant="caption"
            sx={{ color: percentage >= 0 ? "green" : "red" }}
          >
            {percentage}% {percentage >= 0 ? "increase" : "decrease"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
