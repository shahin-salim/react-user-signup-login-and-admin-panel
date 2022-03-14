import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from 'axios';
import { Paper, Box, Grid, TextField, Typography, Button } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import IsLoggedIn from "../IsLoggedIn";
import { shadows } from '@mui/system';

const Login = () => {

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("username is required"),
        password: Yup.string()
            .required("password is required")
            .min(4, "password must be at least 6 characters")
            .max(10, "password must not exceed 40 characters"),

    });

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema), });

    const [wrongData, setWrongData] = useState(false)

    const onSubmit = (data) => {
        axios({ method: 'post', url: 'api/token/', data: data })
            .then(response => {
                window.localStorage.setItem("access_token", response.data.access)
                IsLoggedIn.find((value) => navigate(value))
            })
            .catch(error => {
                console.log(error.response.data)
                setWrongData(true)
            })
    };




    useEffect(() => {
        IsLoggedIn.find((value) => navigate(value))
    }, [])



    return (
        <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", minHeight: "100vh" }} >
            <div style={{ maxWidth: "600px" }}>

                <Fragment>
                    <Paper>
                        <Box px={3} py={2} sx={{ borderColor: 'primary.main' }} boxShadow={5}>
                            <Typography variant="h4" align="center" margin="dense">
                                Login
                            </Typography>

                            {wrongData && <Box border={2} borderColor="error.main" p={2} mt={3}  >No active account found with the given credentials</Box>}

                            <Grid container spacing={1}>

                                <Grid item xs={12} sm={12}>
                                    <TextField required id="username" name="username" label="username" fullWidth margin="dense" {...register("username")} error={errors.username ? true : false} />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.username?.message}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField required id="password" name="password" label="password" type="password" fullWidth margin="dense" {...register("password")} error={errors.password ? true : false} />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.password?.message}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                                    Login
                                </Button>
                            </Box>

                            <Box mt={3}>
                            <Link to="/signup/0">Create new account</Link>

                            </Box>
                        </Box>

                    </Paper>
                </Fragment >
            </div>  
        </div>
    );
};

export default Login;
