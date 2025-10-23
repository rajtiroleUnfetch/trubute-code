import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

interface Memorial {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: string;
  relationship?: string;
  relationshipOther?: string;
  designation?: string;
  designationOther?: string;
  specialDesignation?: string;
  moreDetails?: string;
  bornYear?: string;
  bornMonth?: string;
  bornDay?: string;
  bornCity?: string;
  bornState?: string;
  bornCountry?: string;
  passedYear?: string;
  passedMonth?: string;
  passedDay?: string;
  passedCity?: string;
  passedState?: string;
  passedCountry?: string;
  website?: string;
  plan?: string;
  privacy?: string;
  createdBy?: string;
  approved?: boolean;
  createdAt?: string;
}

// ✅ Create a reusable query function
const fetchMemorialByWebsite = async (website: string): Promise<Memorial> => {
  const { data } = await axiosInstance.get(`/memorials/${website}`);
  return data.memorial;
};

const formatDate = (year?: string, month?: string, day?: string) => {
  if (!year && !month && !day) return "—";
  const dateParts = [day, month, year].filter(Boolean).join(" ");
  return dateParts || "—";
};

const MemorialPage = () => {
  const { website } = useParams<{ website: string }>();

  // ✅ React Query v5 (TanStack) Hook
  const memorialQuery = useQuery({
    queryKey: ["memorial", website],
    queryFn: () => fetchMemorialByWebsite(website!),
    enabled: !!website,
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });

  if (memorialQuery.isPending)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (memorialQuery.isError)
    return (
      <Typography color="error" textAlign="center" mt={10}>
        ❌ Failed to load memorial. Please try again later.
      </Typography>
    );

  const memorial = memorialQuery.data;
  if (!memorial)
    return (
      <Typography textAlign="center" mt={10}>
        Memorial not found.
      </Typography>
    );

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fdfaf6",
        }}
      >
        <Typography
          variant="h4"
          color="#0b2c52"
          fontWeight={700}
          textAlign="center"
          mb={1}
        >
          In Loving Memory of {memorial.firstName} {memorial.middleName || ""}{" "}
          {memorial.lastName}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          {memorial.specialDesignation || "Forever remembered and loved."}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" color="#b68b43" mb={1}>
              Personal Information
            </Typography>
            <Typography>
              <strong>Gender:</strong> {memorial.gender || "—"}
            </Typography>
            <Typography>
              <strong>Relationship:</strong>{" "}
              {memorial.relationshipOther || memorial.relationship || "—"}
            </Typography>
            <Typography>
              <strong>Designation:</strong>{" "}
              {memorial.designationOther || memorial.designation || "—"}
            </Typography>
            <Typography>
              <strong>More Details:</strong> {memorial.moreDetails || "—"}
            </Typography>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" color="#b68b43" mb={1}>
              Life Details
            </Typography>
            <Typography>
              <strong>Born:</strong>{" "}
              {formatDate(
                memorial.bornYear,
                memorial.bornMonth,
                memorial.bornDay
              )}{" "}
              {memorial.bornCity &&
                `in ${memorial.bornCity}, ${memorial.bornState || ""}, ${
                  memorial.bornCountry || ""
                }`}
            </Typography>
            <Typography>
              <strong>Passed Away:</strong>{" "}
              {formatDate(
                memorial.passedYear,
                memorial.passedMonth,
                memorial.passedDay
              )}{" "}
              {memorial.passedCity &&
                `in ${memorial.passedCity}, ${memorial.passedState || ""}, ${
                  memorial.passedCountry || ""
                }`}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" color="#b68b43" mb={1}>
          Memorial Details
        </Typography>
        <Typography>
          <strong>Plan:</strong> {memorial.plan || "—"}
        </Typography>
        <Typography>
          <strong>Privacy:</strong> {memorial.privacy || "—"}
        </Typography>
        <Typography>
          <strong>Approved:</strong>{" "}
          {memorial.approved ? "✅ Yes" : "⏳ Pending"}
        </Typography>
        <Typography>
          <strong>Created:</strong>{" "}
          {memorial.createdAt
            ? new Date(memorial.createdAt).toLocaleDateString()
            : "—"}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
          🌐 Website: <strong>{memorial.website}.tribute.com</strong>
        </Typography>
      </Paper>
    </Box>
  );
};

export default MemorialPage;
