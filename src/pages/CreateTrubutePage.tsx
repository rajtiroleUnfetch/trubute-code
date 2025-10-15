import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const CreateTributePage: React.FC = () => {
  const steps = [
    "Sign in or Create Account",
    "About your loved one",
    "Choose your plan",
    "Privacy options",
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #e8f0f7 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* ---------- HEADER ---------- */}
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          mb={4}
          color="text.primary"
        >
          Create a Memorial Website
        </Typography>

        {/* ---------- STEPPER ---------- */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* ---------- MAIN CARD ---------- */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "#fff",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {/* STEP 1: LOGIN / SIGNUP */}
          {activeStep === 0 && (
            <Stack spacing={3}>
              <Typography variant="h5" textAlign="center">
                Sign in or Create an Account
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={4}
                alignItems="center"
                justifyContent="space-between"
              >
                {/* LEFT SIDE: SOCIAL LOGIN */}
                <Stack spacing={2} flex={1} alignItems="center">
                  <Typography variant="body1">Use your social profile:</Typography>
                  <Button
                    variant="contained"
                    startIcon={<FacebookIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: "#1877f2",
                      "&:hover": { backgroundColor: "#145dbf" },
                      borderRadius: 2,
                      py: 1.2,
                      fontWeight: 500,
                      maxWidth: 280,
                    }}
                  >
                    Sign in with Facebook
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    fullWidth
                    sx={{
                      borderColor: "#dadce0",
                      borderRadius: 2,
                      py: 1.2,
                      fontWeight: 500,
                      maxWidth: 280,
                    }}
                  >
                    Sign in with Google
                  </Button>
                </Stack>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    mx: 3,
                    display: { xs: "none", md: "block" },
                    borderColor: "#ccc",
                  }}
                />

                {/* RIGHT SIDE: MANUAL FORM */}
                <Stack spacing={2} flex={1} sx={{ width: "100%", maxWidth: 350 }}>
                  <Typography variant="body1">Or sign up manually:</Typography>
                  <TextField label="First name" size="small" fullWidth />
                  <TextField label="Last name" size="small" fullWidth />
                  <TextField label="Email address" size="small" fullWidth />
                  <TextField
                    label="Create password"
                    type="password"
                    size="small"
                    fullWidth
                  />
                </Stack>
              </Stack>
            </Stack>
          )}

          {/* STEP 2: ABOUT YOUR LOVED ONE */}
          {activeStep === 1 && (
            <Stack spacing={2}>
              <Typography variant="h5" textAlign="center">
                About Your Loved One
              </Typography>
              <TextField label="First Name" size="small" fullWidth />
              <TextField label="Middle Name" size="small" fullWidth />
              <TextField label="Last Name" size="small" fullWidth />
              <Typography variant="body1" mt={2}>
                Gender:
              </Typography>
              <RadioGroup row>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
              <TextField label="Relationship" size="small" fullWidth />
              <TextField label="Designation" size="small" fullWidth />
              <TextField
                label="Special Designation (optional)"
                size="small"
                fullWidth
              />
              <TextField
                label="More Details (optional)"
                multiline
                rows={3}
                size="small"
                fullWidth
              />
            </Stack>
          )}

          {/* STEP 3: CHOOSE PLAN */}
          {activeStep === 2 && (
            <Stack spacing={3} textAlign="center">
              <Typography variant="h5">Choose Your Plan</Typography>
              <Typography variant="body1" color="text.secondary">
                Select the memorial plan that best fits your needs.
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border:
                      activeStep === 2 ? "2px solid #b68b43" : "1px solid #eee",
                    width: 250,
                    cursor: "pointer",
                    "&:hover": { boxShadow: 5 },
                  }}
                >
                  <Typography variant="h6">Basic</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Free forever
                  </Typography>
                </Paper>

                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    width: 250,
                    border: "2px solid #b68b43",
                    cursor: "pointer",
                    "&:hover": { boxShadow: 5 },
                  }}
                >
                  <Typography variant="h6">Premium</Typography>
                  <Typography variant="body2" color="text.secondary">
                    $5/month – Custom photos, unlimited visitors
                  </Typography>
                </Paper>
              </Stack>
            </Stack>
          )}

          {/* STEP 4: PRIVACY OPTIONS */}
          {activeStep === 3 && (
            <Stack spacing={2}>
              <Typography variant="h5" textAlign="center">
                Privacy Options
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Choose how public or private you want your memorial to be.
              </Typography>

              <RadioGroup>
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public – anyone can view"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private – only invited guests"
                />
              </RadioGroup>
            </Stack>
          )}

          {/* ---------- BUTTONS ---------- */}
          <Stack direction="row" justifyContent="space-between" mt={4}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Back
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  backgroundColor: "#b68b43",
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#a17837" },
                }}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: 2 }}
                onClick={() => alert("Tribute Created Successfully!")}
              >
                Finish
              </Button>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateTributePage;
