// src/App.tsx
import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import theme from "./theme";
import CarouselCards from "./components/CarouselCards";
import HeroSection from "./components/HeroSection";
import ObituaryList from "./components/ObituaryList";
import MakeWebTrubuteForm from "./components/makeWebTrubuteForm";
import { useNavigate } from "react-router-dom";
import MemorialForm from "./components/MemorialForm";

const App: React.FC = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleContinue = () => {
    // Your validation or API logic here
    navigate("/plan");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
  };

  // inside App component:
  const [openForm, setOpenForm] = useState(false);

  const handleCreateTribute = (data: any) => {
    console.log("Tribute created:", data);
    // Later: POST to your backend via axios
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ------------------ NAVBAR ------------------ */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            Trubute<span style={{ color: "#1565c0" }}>.com</span>
          </Typography>

          <MakeWebTrubuteForm
            open={openForm}
            onClose={() => setOpenForm(false)}
            onSubmit={handleCreateTribute}
          />
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 5,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              },
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search obituaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: {
                  border: "none",
                  "& fieldset": { border: "none" },
                  px: 2,
                  fontSize: "0.95rem",
                },
              }}
              sx={{
                flexGrow: 1,
                backgroundColor: "transparent",
              }}
            />
            <IconButton
              type="submit"
              sx={{
                backgroundColor: "#1565c0",
                color: "#fff",
                borderRadius: 0,
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#0d47a1",
                },
              }}
            >
              <Search />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", borderRadius: 2 }}
            onClick={() => setOpenForm(true)}
          >
            Submit an Obituary
          </Button>
        </Toolbar>
      </AppBar>
      {/* <HeroSection /> */}
      <MemorialForm />
      <ObituaryList />
      {/* ------------------ HERO SECTION ------------------ */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Remember and Honor Loved Ones
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Search obituaries, create tributes, and celebrate cherished lives.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ borderRadius: 3 }}
          >
            Browse Tributes
          </Button>
        </Container>
      </Box>

      {/* ------------------ FEATURED TRIBUTES (CAROUSEL) ------------------ */}

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={3} fontWeight={600}>
          Featured Tributes
        </Typography>
        <CarouselCards />
        {/* <Slider {...sliderSettings}>
          {mockTributes.map((item) => (
            <Card key={item.id} sx={{ mx: 2 }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{ height: 300, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" color="primary" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.message}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Slider> */}
      </Container>

      {/* ------------------ ABOUT SECTION ------------------ */}
      <Box sx={{ backgroundColor: "#f8f9fa", py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            color="primary"
            fontWeight={700}
            mb={2}
          >
            About Trubute.com
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Trubute.com is the largest online obituary and memorial platform,
            helping families share tributes and preserve cherished memories.
            Whether you’re celebrating a life or connecting with others, our
            mission is to ensure every story lives on.
          </Typography>
        </Container>
      </Box>

      {/* ------------------ FOOTER ------------------ */}
      <Box
        sx={{
          backgroundColor: "#0d47a1",
          color: "#fff",
          textAlign: "center",
          py: 3,
          mt: 6,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Trubute Tribute. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
