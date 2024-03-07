import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Checkbox, Grid, TextField, useTheme, Box, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import Asailogo from "app/components/icons/Asailogo"
import * as Yup from "yup";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center"
}));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)"
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
}));

// initial login credentials
const initialValues = {
  email: "",
  password: "",
  username: "",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function JwtRegister() {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      register(values.email, values.phone, values.username, values.password);
      // navigate("/");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              {/* <Asailogo /> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" data-name="Слой 1" viewBox="0.0 0.0 240.0 80.0" width="150" height="90" className="null uk-svg">
                <path className="cls-1" fill="#ed8b2d" d="M64.38,20.48C69.58,15.89,74.77,11.28,80,6.7c5.23,4.55,10.4,9.16,15.62,13.72a3.84,3.84,0,0,1-4.83,6C87.13,23.3,83.63,20,80,17c-3.57,3.06-7,6.23-10.6,9.32a3.84,3.84,0,0,1-5-5.82"></path>
                <path className="cls-1" fill="#ed8b2d" d="M51.19,28.37a5.17,5.17,0,1,1-2.71,7.47,5.19,5.19,0,0,1,2.71-7.47"></path>
                <path className="cls-2" fill="#2c211a" d="M19,31.91c2.67.05,5.36-.1,8,.07Q34.49,52.4,41.89,72.81H33.67c-1.11-2.8-2.14-5.63-3.27-8.43-4.91,0-9.82,0-14.73,0-1,2.82-2,5.61-3.05,8.42h-8Q11.82,52.36,19,31.91m3.8,11.81c-.06.32-.14.64-.22,1-1.53,4.47-3.09,8.93-4.61,13.4H28q-2.4-6.81-4.78-13.63c-.13-.22-.14-.6-.38-.73"></path>
                <path className="cls-2" fill="#2c211a" d="M64.75,31.91h7.72V48.46H87.69c0-5.52,0-11,0-16.55,2.57,0,5.14,0,7.72,0v40.9H87.69c0-5.54,0-11.08,0-16.62-5.08,0-10.15,0-15.23,0,0,5.54,0,11.07,0,16.61H64.75c0-7.48,0-15,0-22.44.1-6.15,0-12.3,0-18.46"></path>
                <path className="cls-2" fill="#2c211a" d="M49.32,42.09H57V72.81H49.32Z"></path>
                <path className="cls-2" fill="#2c211a" d="M140.73,42.08h7.79c0,6,0,11.89,0,17.84a5.51,5.51,0,0,0,11-.31V42.08c2.57,0,5.14,0,7.71,0,0,5.85,0,11.71,0,17.56a13.22,13.22,0,0,1-14.91,13,13,13,0,0,1-7.78-3.86,13.24,13.24,0,0,1-3.82-9.24c0-5.83,0-11.67,0-17.51"></path>
                <path className="cls-2" fill="#2c211a" d="M115.21,42.43a15.36,15.36,0,0,1,15.92,23.43,15.36,15.36,0,1,1-15.92-23.43M116.59,50a7.69,7.69,0,1,0,9.34,7.09A7.76,7.76,0,0,0,116.59,50"></path>
                <path className="cls-2" fill="#2c211a" d="M177.14,45.4c2.43-2.52,6.11-3.13,9.46-3.24s6.69.13,9.61,1.72a11,11,0,0,1,5.09,7.82c-2.68,0-5.35-.12-8-.07a4.78,4.78,0,0,0-2.82-3.18,11.46,11.46,0,0,0-6.15-.1c-1.08.23-2.29,1.06-2.16,2.3s1.35,1.61,2.31,1.92c4.76,1.62,10,1.91,14.34,4.7a7.66,7.66,0,0,1,3.07,7.37,9.55,9.55,0,0,1-4.18,6.86c-2.5,1.77-5.64,2.27-8.63,2.44h-1.74c-3.55-.18-7.24-1.22-9.86-3.74A18.36,18.36,0,0,1,173,62.71h8a9.19,9.19,0,0,0,2.52,4,6.84,6.84,0,0,0,4.5,1.37,8.25,8.25,0,0,0,4.6-1,2.53,2.53,0,0,0,.78-3.48,5.1,5.1,0,0,0-2.57-1.17,84.82,84.82,0,0,1-9.68-2.62A10.49,10.49,0,0,1,176.6,57a8.55,8.55,0,0,1,.54-11.58"></path>
                <path className="cls-2" fill="#2c211a" d="M209.2,48A13.06,13.06,0,0,1,218,42.34c4.41-.66,9.35.34,12.54,3.64,3.07,3,4.05,7.41,4.32,11.54V60.4H214.79a8.29,8.29,0,0,0,2,5.53,6.08,6.08,0,0,0,6.79,1.45,5.89,5.89,0,0,0,2.83-3.86c2.7.43,5.39.89,8.09,1.35a13.11,13.11,0,0,1-6.2,7.54,15.65,15.65,0,0,1-6.23,1.52h-1.67a14.49,14.49,0,0,1-9.19-3.28c-3.3-3-4.7-7.53-4.7-11.86A18.38,18.38,0,0,1,209.2,48m8,1.75A7.21,7.21,0,0,0,215,55.41c4,0,8,0,12,0a11.36,11.36,0,0,0-.68-3.42,5.69,5.69,0,0,0-9.05-2.24"></path>
              </svg> */}
              <svg viewBox="0.0 0.0 450.0 180.0" width="450.0" height="180.0">
                <g>
                  <g>
                    <g>
                      <path fill="#2C446B" d="M242.5,76.1v31.2H232V92.8h-29.2v14.5h-10.3V76.1c0-16.9,10-25.9,25-25.9C232.4,50.2,242.5,59.2,242.5,76.1z M232,84v-8.9c0-10.7-5.7-15.7-14.6-15.7c-8.9,0-14.6,5.1-14.6,15.7V84H232z" />
                      <path fill="#2C446B" d="M267.1,101.3l3.6-8.1c4.5,3.6,11.7,6.2,18.6,6.2c8.8,0,12.5-3.1,12.5-7.3c0-12.1-33.4-4.2-33.4-25.1 c0-9.1,7.2-16.8,22.7-16.8c6.7,0,13.8,1.8,18.7,5l-3.3,8.1c-5.1-3-10.6-4.4-15.5-4.4c-8.7,0-12.2,3.4-12.2,7.6 c0,12,33.3,4.2,33.3,24.8c0,9-7.3,16.7-22.7,16.7C280.5,108,271.7,105.3,267.1,101.3z" />
                      <path fill="#2C446B" d="M386.5,76.1v31.2H376V92.8h-29.2v14.5h-10.3V76.1c0-16.9,10-25.9,25-25.9C376.4,50.2,386.5,59.2,386.5,76.1z M376,84v-8.9c0-10.7-5.7-15.7-14.6-15.7c-8.9,0-14.6,5.1-14.6,15.7V84H376z" />
                      <path fill="#2C446B" d="M431.4,59.7v38.7h10.4v8.8h-31.1v-8.8H421V59.7h-10.4V51h31.1v8.8H431.4z" />
                    </g>
                    <g>
                      <path fill="#8AACDB" d="M259.7,154.4l1.6-3.5c2,1.6,5.1,2.7,8.1,2.7c3.8,0,5.4-1.4,5.4-3.2c0-5.3-14.6-1.8-14.6-10.9 c0-4,3.2-7.3,9.9-7.3c2.9,0,6,0.8,8.2,2.2l-1.4,3.5c-2.2-1.3-4.6-1.9-6.8-1.9c-3.8,0-5.3,1.5-5.3,3.3c0,5.2,14.5,1.8,14.5,10.8 c0,3.9-3.2,7.3-9.9,7.3C265.5,157.4,261.7,156.2,259.7,154.4z" />
                      <path fill="#8AACDB" d="M289.1,144.7c0-7.3,5.6-12.6,13.2-12.6c7.6,0,13.2,5.3,13.2,12.6c0,7.3-5.6,12.6-13.2,12.6 C294.7,157.4,289.1,152,289.1,144.7z M310.9,144.7c0-5-3.7-8.6-8.6-8.6c-4.9,0-8.6,3.6-8.6,8.6c0,5,3.7,8.6,8.6,8.6 C307.2,153.4,310.9,149.8,310.9,144.7z" />
                      <path fill="#8AACDB" d="M331.9,136.3v7.5h11.8v3.9h-11.8v9.4h-4.6v-24.5h17.9v3.8H331.9z" />
                      <path fill="#8AACDB" d="M361.8,136.3h-8.1v-3.9h20.8v3.9h-8.1V157h-4.6V136.3z" />
                    </g>
                  </g>
                  <g>
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="30.4416" y1="154.3434" x2="138.6981" y2="78.5414">
                      <stop offset="0" />
                      <stop offset="0.4695" />
                      <stop offset="0.9317" />
                    </linearGradient>
                    <path fill="url(#SVGID_1_)" d="M140.5,93.7l-1.1-6c-1.7-7.3-4.6-14.1-8.5-20.3c-2.6-4.1-5.7-7.9-9.1-11.3c-12-12-28.5-19.4-46.7-19.4 C38.5,36.8,9,66.3,9,102.8v0c0,36.5,29.6,66.1,66.1,66.1c18.2,0,34.7-7.4,46.6-19.3c0.2-0.2,0.4-0.4,0.6-0.6l-5.8-31.4 c-2.2,6.2-5.8,11.8-10.3,16.3l-0.1,0.1c-8,7.9-18.9,12.8-31,12.8c-24.3,0-44-19.7-44-44v0c0-12.2,4.9-23.2,12.9-31.1    c8-8,19-12.9,31.1-12.9c20.7,0,38.1,14.3,42.8,33.6l0.9,4.6l1.1,5.8l8.9,48.1c2.2,12,13.7,19.9,25.7,17.6L140.5,93.7z" />

                    <linearGradient id="SVGID_00000166664393257537949370000010773385350480973213_" gradientUnits="userSpaceOnUse" x1="39.7611" y1="87.8531" x2="110.3137" y2="117.8009">
                      <stop offset="0" />
                      <stop offset="0.5998" />
                      <stop offset="0.9626" />
                    </linearGradient>
                    <path d="M75,141.1L75,141.1 c-21.2,0-38.3-17.2-38.3-38.3v0c0-21.2,17.2-38.3,38.3-38.3h0c21.2,0,38.3,17.2,38.3,38.3v0C113.4,124,96.2,141.1,75,141.1z M94.9,102.8L94.9,102.8C94.9,91.9,86,83,75,83h0c-10.9,0-19.8,8.9-19.8,19.8v0c0,10.9,8.9,19.8,19.8,19.8h0 C86,122.7,94.9,113.8,94.9,102.8z" />
                    <g>

                      <linearGradient id="SVGID_00000006689627228784556220000007667348777914871207_" gradientUnits="userSpaceOnUse" x1="138.5043" y1="60.6155" x2="140.317" y2="8.7075">
                        <stop offset="7.458905e-08" />
                        <stop offset="0.9317" />
                      </linearGradient>
                      <path d="M149,41l-14,19.4l0,0 c-10.3-7.5-12.7-21.9-5.2-32.2l14-19.4l0,0C154.2,16.3,156.5,30.7,149,41z" />
                    </g>
                  </g>
                </g>
              </svg>
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="phone"
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(errors.phone && touched.phone)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}>
                      Register
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}>
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
}
