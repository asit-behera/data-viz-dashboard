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
} from "@mui/material";

const getColor = (value: any) => {
  if (value > 0) return "green";
  if (value < 0) return "red";
  return "gray";
};

const StatsDisplay = ({ data }: any) => {
  const { result, resultKeys, previousQuarter, secondLastQuarter } = data;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Performance Comparison Between {previousQuarter} and {secondLastQuarter}
      </Typography>

      {/* Industry Section */}
      <Grid container spacing={3}>
        <Grid sx={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Industry Performance
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
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
                      {result.industry[industry]}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Customer Type Section */}
        <Grid sx={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Customer Type Performance
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
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
                      style={{ color: getColor(result.customer[customerType]) }}
                      align="right"
                    >
                      {result.customer[customerType]}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* ACV Range Section */}
        <Grid sx={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            ACV Ranges Performance
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
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
                      {result.acv[acvRange]}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Team Performance Section */}
        <Grid sx={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Team Performance
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
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
                      {result.team[team]}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatsDisplay;
