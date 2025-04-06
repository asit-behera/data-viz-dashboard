import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Chip,
  Box,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const getColor = (value: any) => {
  if (value > 25) return "green";
  if (value < -25) return "red";
  return "gray";
};

function getChip(value: number) {
  if (!value)
    return (
      <Chip
        sx={{
          //background: theme.palette.mode === "light" ? red[50] : brown[900],
          //backgroundColor: "rgba(0, 255, 0, 0.1)",
          fontSize: "14px",
        }}
        size="medium"
        variant="outlined"
        color="default"
        label={<strong>{"NA"}</strong>}
      />
    );
  if (value > 25)
    return (
      <Chip
        sx={{
          //background: theme.palette.mode === "light" ? red[50] : brown[900],
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          fontSize: "14px",
        }}
        size="medium"
        variant="outlined"
        color={"success"}
        icon={<TrendingUpIcon fontSize="medium" color="success" />}
        label={<strong>{`${value}%`}</strong>}
      />
    );
  if (value < -25)
    return (
      <Chip
        sx={{
          //background: theme.palette.mode === "light" ? red[50] : brown[900],
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          fontSize: "14px",
        }}
        size="medium"
        variant="outlined"
        color={"error"}
        icon={<TrendingDownIcon fontSize="medium" color="error" />}
        label={<strong>{`${value}%`}</strong>}
      />
    );

  return (
    <Chip
      sx={{
        //background: theme.palette.mode === "light" ? red[50] : brown[900],
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
      }}
      size="medium"
      variant="outlined"
      color="default"
      icon={<TrendingFlatIcon fontSize="medium" />}
      label={<strong>{`${value}%`}</strong>}
    />
  );
}

const StatsDisplay = ({ data }: any) => {
  const { result, resultKeys, previousQuarter, secondLastQuarter } = data;

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          pt: 1,
          pb: 2,
        }}
      >
        Performance:
        <span
          style={{
            color: "#888",
          }}
        >
          {previousQuarter} vs {secondLastQuarter}
        </span>
      </Typography>

      {/* Industry Section */}
      <Grid container spacing={9} sx={{ flex: 1 }}>
        <Grid sx={{ xs: 3, md: 3, sm: 3 }}>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Table size="small" sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6" gutterBottom>
                        Industry Performance
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Industry</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Percentage Change</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultKeys.industry.map((industry: any) => (
                    <TableRow key={industry}>
                      <TableCell>{industry}</TableCell>
                      <TableCell
                        style={{ color: getColor(result.industry[industry]) }}
                        align="right"
                      >
                        {getChip(result.industry[industry])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Grid>

        {/* Customer Type Section */}
        <Grid sx={{ xs: 3, md: 3, sm: 3 }}>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Table size="small" sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6" gutterBottom>
                        Customer Type Performance
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Type</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Percentage Change</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultKeys.customer.map((customerType: any) => (
                    <TableRow key={customerType}>
                      <TableCell>{customerType}</TableCell>
                      <TableCell
                        style={{
                          color: getColor(result.customer[customerType]),
                        }}
                        align="right"
                      >
                        {getChip(result.customer[customerType])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Grid>

        {/* ACV Range Section */}
        <Grid sx={{ xs: 3, md: 3, sm: 3 }}>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Table size="small" sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6" gutterBottom>
                        ACV Ranges Performance
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>ACV Range</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Percentage Change</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultKeys.acv.map((acvRange: any) => (
                    <TableRow key={acvRange}>
                      <TableCell>{acvRange}</TableCell>
                      <TableCell
                        style={{ color: getColor(result.acv[acvRange]) }}
                        align="right"
                      >
                        {getChip(result.acv[acvRange])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Grid>

        {/* Team Performance Section */}
        <Grid sx={{ xs: 3, md: 3, sm: 3 }}>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Table size="small" sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6" gutterBottom>
                        Team Performance
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Team</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Percentage Change</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultKeys.team.map((team: any) => (
                    <TableRow key={team}>
                      <TableCell>{team}</TableCell>
                      <TableCell
                        style={{ color: getColor(result.team[team]) }}
                        align="right"
                      >
                        {getChip(result.team[team])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StatsDisplay;
