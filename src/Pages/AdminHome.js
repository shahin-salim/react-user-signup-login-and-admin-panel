import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@material-ui/core";
import Box from "@mui/material/Box";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";

import AlertBox from "../Components/AlertBox";
// import AlertBox from '../Components/AlertBox'

import { useNavigate } from "react-router-dom";
import IsLoggedIn from "../IsLoggedIn";
import axios from "axios";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
     return { name, calories, fat, carbs, protein };
}

export default function AdminHome() {
     const navigate = useNavigate();

     const [userData, setUserData] = useState([]);

     React.useEffect(() => {
   
          axios({ method: "get", url: "/admin_home", headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },})
               .then((response) => {
                    setUserData(response.data)
               })
               .catch((error) => {
                    console.log(error.response.data);
                    localStorage.removeItem('access_token')
                    navigate('/login')
               });

          IsLoggedIn.find((value) => navigate(value));
     }, []);

     console.log(userData);

     return (
          <Box>
               <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                         <Toolbar>
                              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                   <MenuIcon />
                              </IconButton>
                              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                   News
                              </Typography>
                              <Button
                                   color="inherit"
                                   style={{ marginRight: "50px" }}
                                   onClick={() => navigate(`/signup/createuser`)}
                              >
                                   Create User
                              </Button>

                              <Button color="inherit" onClick={() => IsLoggedIn.logout(() => navigate("/login"))}>
                                   Logout
                              </Button>
                         </Toolbar>
                    </AppBar>
               </Box>

               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="right">No:</TableCell>
                                   <TableCell align="right">first name</TableCell>
                                   <TableCell align="right">last name</TableCell>
                                   <TableCell align="right">username</TableCell>
                                   <TableCell> email</TableCell>
                                   <TableCell align="right">Update&nbsp;(g)</TableCell>
                                   <TableCell align="right">Delete&nbsp;(g)</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {userData.map((data) => (
                                   <TableRow key={data.id}>
                                        <TableCell align="right">{data.id}</TableCell>

                                        <TableCell align="right">{data.first_name}</TableCell>
                                        <TableCell align="right">{data.last_name}</TableCell>
                                        <TableCell align="right">{data.username}</TableCell>
                                        <TableCell align="right">{data.email}</TableCell>
                                        <TableCell align="right">
                                             <Button variant="contained" onClick={() => navigate(`/edit_user/${data.id}`)}>
                                                  Update
                                             </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                             <AlertBox userId={data.id} userData={userData} setUserData={setUserData} />
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
          </Box>
     );
}
