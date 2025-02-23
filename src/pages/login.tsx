import React, { useContext, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress
} from "@mui/material";
// import { AuthContext } from "../../../Context/authContext";



interface IFormInput {
    email: string
    password: string
  }
  

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm();

  //   const { login } = useContext(AuthContext);

  //   const validateEmail = () => {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(email)) {
  //       setEmailError("Please enter a valid email");
  //       return false;
  //     }
  //     setEmailError("");
  //     return true;
  //   };

  //   const validatePassword = () => {
  //     const passwordRegex = /^(?=.*[0-9]).{8,}$/;
  //     if (!password.match(passwordRegex)) {
  //       setPasswordError("Password must be at least 8 characters and include a number");
  //       return false;
  //     }
  //     setPasswordError("");
  //     return true;
  //   };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("daa is submitted", data);
    // if (validateEmail() && validatePassword()) {
    //   try {
    //     // await login({ email, password });
    //     setSuccessMessage("Login successful");
    //     navigate("/");
    //   } catch (error: any) {
    //     setError(error.response?.data?.message || "An error occurred during login.");
    //     setTimeout(() => setLoading(false), 2000);
    //   }
    // } else {
    //   setLoading(false);
    // }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">Login</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", marginTop: 16 }}
        >
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                // helperText={errors.email?.message}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password}
                // helperText={errors.password?.message}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
