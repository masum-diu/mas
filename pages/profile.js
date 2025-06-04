import React, { useState, useEffect } from "react";
import { useAuth } from "../authcontext/AuthContext";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
const Profile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!loading && !user) {
      router.push("/checkout");
    }
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, loading, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const result = await updateUserProfile(formData);
      if (result.success) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          margin: "0 auto",
          py: 6,
          color: "#f0f8ff",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          sx={{ color: "#f0f8ff" }}
        >
          My Profile
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              "& .MuiAlert-message": {
                color: "#000",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
              "& .MuiAlert-message": {
                color: "#000",
              },
            }}
          >
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#787878",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-disabled": {
                    "& fieldset": {
                      borderColor: "#565656",
                    },
                    "& input": {
                      color: "#c0c0c0",
                    },
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#f0f8ff",
                },
                "& .MuiInputLabel-root": {
                  color: "#f0f8ff",
                  "&.Mui-disabled": {
                    color: "#c0c0c0",
                  },
                },
                "& .Mui-focused": {
                  color: "#f0f8ff",
                },
              }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#787878",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-disabled": {
                    "& fieldset": {
                      borderColor: "#565656",
                    },
                    "& input": {
                      color: "#c0c0c0",
                    },
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#f0f8ff",
                },
                "& .MuiInputLabel-root": {
                  color: "#f0f8ff",
                  "&.Mui-disabled": {
                    color: "#c0c0c0",
                  },
                },
                "& .Mui-focused": {
                  color: "#f0f8ff",
                },
              }}
            />

            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#787878",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-disabled": {
                    "& fieldset": {
                      borderColor: "#565656",
                    },
                    "& input": {
                      color: "#c0c0c0",
                    },
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#f0f8ff",
                },
                "& .MuiInputLabel-root": {
                  color: "#f0f8ff",
                  "&.Mui-disabled": {
                    color: "#c0c0c0",
                  },
                },
                "& .Mui-focused": {
                  color: "#f0f8ff",
                },
              }}
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              multiline
              rows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#787878",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9A0E20",
                  },
                  "&.Mui-disabled": {
                    "& fieldset": {
                      borderColor: "#565656",
                    },
                    "& textarea": {
                      color: "#c0c0c0",
                    },
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#f0f8ff",
                },
                "& .MuiInputLabel-root": {
                  color: "#f0f8ff",
                  "&.Mui-disabled": {
                    color: "#c0c0c0",
                  },
                },
                "& .Mui-focused": {
                  color: "#f0f8ff",
                },
              }}
            />

            <Stack direction="row" spacing={2} justifyContent="center">
              {!isEditing ? (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#9A0E20",
                    "&:hover": {
                      bgcolor: "#7A0B19",
                    },
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#f0f8ff",
                      borderColor: "#f0f8ff",
                      "&:hover": {
                        borderColor: "#9A0E20",
                        color: "#9A0E20",
                      },
                    }}
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        address: user.address || "",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      bgcolor: "#9A0E20",
                      "&:hover": {
                        bgcolor: "#7A0B19",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
};

export default Profile;
