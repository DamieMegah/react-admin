import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import { useState, useEffect } from "react";


const cleanNumber = (str) => Number(str.replace(/[^\d]/g, '')); // remove everything except digits

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Check if title contains ₦
  const hasCurrency = title.includes('₦');

  const [displayValue, setDisplayValue] = useState(cleanNumber(title));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) {
      setDisplayValue(cleanNumber(title)); // reset on mouse leave
      return;
    }

    const target = Math.floor(cleanNumber(title) * 1.05); // 5% increase example
    const step = Math.max(1, Math.floor((target - displayValue) / 100));
    const interval = setInterval(() => {
      setDisplayValue(prev => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + step;
      });
    }, 40); // slower step for smoother animation
     
    return () => clearInterval(interval);
  }, [hovered]);

  const formattedValue = displayValue.toLocaleString();

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      width="100%" m="0 30px"
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100], cursor: "pointer" }}
          >
            {hasCurrency ? `₦${formattedValue}` : formattedValue}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};
export default StatBox;