import { Grid, Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ sm: 12, md: 6 }}>
        <Skeleton variant="rectangular" height={400} />
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Skeleton variant="rectangular" height={400} />
      </Grid>

      <Grid size={{ sm: 12, md: 12 }}>
        <Skeleton variant="rectangular" height={400} />
      </Grid>
    </Grid>
  );
};

export default SkeletonLoader;
