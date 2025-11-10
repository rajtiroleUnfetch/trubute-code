import React, { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    let ok = true;
    setEmailError(null);
    setPasswordError(null);
    setApiError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required");
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setEmailError("Enter a valid email");
      ok = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      ok = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      ok = false;
    }

    return ok;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // defensive: avoid duplicate requests
    if (loading) return;

    if (!validate()) return;

    setLoading(true);
    setApiError(null);

    try {
      //FIXME: add the env api
      const res = await axios.post("http://localhost:3000/user/login", {
        email: email.trim(),
        password,
      });
      // FIXME: remove the log from here
      console.log("login successful", res.data);
    } catch (err: any) {
      console.error("Login failed", err);
      console.log("axios response data:", err?.response?.data);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md shadow-lg w-full">
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome Back
          </Typography>

          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={!!emailError}
              helperText={emailError ?? ""}
              autoComplete="email"
              autoFocus
              sx={{ mt: 1 }}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={!!passwordError}
              helperText={passwordError ?? ""}
              autoComplete="current-password"
              sx={{ mt: 2 }}
            />

            <Box sx={{ mt: 3 }}>
              <Button
                startIcon={<LoginIcon/>}
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ py: 1.2 }}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress size={18} sx={{ mr: 1 }} />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </Box>
          </form>

          <Typography align="center" variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Don't have an account? Create account
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
