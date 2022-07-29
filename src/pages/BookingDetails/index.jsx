import * as React from 'react';
import {Component, Fragment} from 'react';
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PinDropIcon from '@mui/icons-material/PinDrop';
import prius from "../../assets/img/prius.jpg";
import Typography from "@mui/material/Typography";
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PaletteIcon from '@mui/icons-material/Palette';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EvStationIcon from '@mui/icons-material/EvStation';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import user from "../../assets/img/user.png"
import logo from "../../assets/img/carLogo.jpg"
import slip from "../../assets/img/slip.jpg"
import Button from "@mui/material/Button";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import CreateIcon from '@mui/icons-material/Create';
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SendIcon from '@mui/icons-material/Send';
import BookingDetailService from "../../services/BookingDetailService";
import GDSESnackBar from "../../components/common/snackBar";
import CarService from "../../services/CarService";
import Radio from '@mui/material/Radio';
import Toyota from "../../assets/img/Toyota.jpg"
import BMWM5 from "../../assets/img/BMWM5.jpg"
import BMWMz4 from "../../assets/img/BMWz4.jpg"
import benze from "../../assets/img/benze.jpg";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import { pink } from '@mui/material/colors';



class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

            formData: {
                bdid: '',
                uid: '',
                cid: '',
                did: '',
                pickUp: '',
                dropOff: '',
                pickUpDate: '',
                dropOffDate: '',
                pickUpTime: '',
                dropOffTime: '',
                rentPrice: ''
            },
            alert: false,
            message: '',
            severity: '',

            data: [],
            btnLabel: 'Save',
            btnColor: 'primary',

            file: null,

        }

        this.handleChange = this.handleChange.bind(this)

    }
    loadData = async () => {
        let res = await CarService.fetchCar();
        if (res.status === 200) {
            this.setState({
                data: res.data.data
            })
        }
        console.log(this.state.data)
        console.log("Hello")
    }

    handleChange(event) {
        this.state({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    searchCar = async (cid) => {
        let res = CarService.searchCar(cid);
        console.log(res)
        if (res.status === 200) {
            console.log(res.data.data)
        }
    }


    submitBookingDetails = async () => {
        let formData = this.state.formData;
        if (this.state.btnLabel === "Save") {
            let res = await BookingDetailService.postBookingDetailsService(formData);
            console.log(res);

            if (res.status === 201) {
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: "success"
                });
                this.clearFields();
                this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: "error"
                });
            }
        } else {
            console.log("error")
        }
    }

    componentDidMount() {
        this.searchCar();
        this.carMap();

        console.log(this.state.data)
    }

    carMap = () => {
        this.state.data.map((value, index) => {
            // console.log(value.userName)
            // console.log(index)
            console.log(value)

            // this.state.data[index].id="U00_002"

        })

    }

    setImage = (e) => {
        // var imageList=[{BMWMz4},{BMWM5},{Toyota},{benze}];
        // var imgName = imageList[Math.floor(Math.random()*imageList.length)];
        //


    }
    changeImage = (e) => {
        console.log("change Image")
        e.src={BMWMz4}

    }

    render() {
        const {classes} = this.props;

        return (

            <Fragment>
                <Grid container className="pt-7" spacing={2}>

                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Typography variant="h2" className={classes.columnHeaderTitleContainer} sx={{mb: 5}}>Booking
                            Details
                        </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                alt="Remy Sharp"
                                src={logo} alt=""
                                sx={{width: 100, height: 100}}
                            />
                        </Stack>

                    </Grid>


                </Grid>

                <Grid container className="pt-7" spacing={2}>

                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Card sx={{maxWidth: 750, maxHeight: 350}}>
                            <CardActionArea>

                                {/*<Typography variant="h5" >Car Manage</Typography>*/}
                                <CardContent>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Car Id"
                                        placeholder={"C00_001"}
                                        //sx={{mb: 15}}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        value={this.state.formData.cid}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.cid = e.target.value
                                            this.setState({formData})
                                        }}

                                        onKeyPress={(ev)=>{
                                            console.log(`pressed keyCode {ev.key}`);
                                            if (ev.key==='Enter'){
                                                this.loadData()
                                                //DocodeHere
                                                ev.preventDefault();
                                            }
                                        }}
                                        //validators={['required','matchRegexp:^(B00_)[0-9]{3,4}$']}
                                    />
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Booking Detail Id"
                                        placeholder={"BD00_001"}
                                        //sx={{mb: 15}}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        value={this.state.formData.bdid}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.bdid = e.target.value
                                            this.setState({formData})
                                        }}
                                        //validators={['required','matchRegexp:^(B00_)[0-9]{3,4}$']}
                                    />
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Pick Up"
                                        placeholder={"Gall"}
                                        //sx={{mb: 15}}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        value={this.state.formData.pickUp}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.pickUp = e.target.value
                                            this.setState({formData})
                                        }}
                                    />


                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Pickup Date"
                                        type={"date"}
                                        placeholder={"2022-07-24"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {/*<TodayIcon/>*/}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        value={this.state.formData.pickUpDate}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.pickUpDate = e.target.value
                                            this.setState({formData})
                                        }}
                                    />
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Pickup Time"
                                        placeholder={"08-00-00"}
                                        type={"time"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {/*<AccessTimeIcon/>*/}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        value={this.state.formData.pickUpTime}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.pickUpTime = e.target.value
                                            this.setState({formData})
                                        }}
                                    />
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Grid>


                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Card sx={{maxWidth: 750, maxHeight: 350}}>
                            <CardActionArea>
                                {/*<Typography variant="h5" >Car Manage</Typography>*/}
                                <CardContent>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="DropOff"
                                        placeholder={"Colombo"}
                                        //sx={{mb: 15}}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PinDropIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        value={this.state.formData.dropOff}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.dropOff = e.target.value
                                            this.setState({formData})
                                        }}
                                    />
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Drop Off Date"
                                        placeholder={"2022-07-30"}
                                        type={"date"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {/*<TodayIcon/>*/}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"

                                        value={this.state.formData.pickUpDate}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.pickUpDate = e.target.value
                                            this.setState({formData})
                                        }}
                                    />
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Drop Off Time"
                                        placeholder={"10-00-00"}
                                        type={"time"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {/*<AccessTimeIcon/>*/}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        value={this.state.formData.dropOffTime}
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.dropOffTime = e.target.value
                                            this.setState({formData})
                                        }}
                                    />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>


                    <Grid item lg={3} md={3} sm={3} xm={3}>
                        <Card sx={{maxWidth: 1750}}>
                            <CardActionArea sx={{mb: 9}}>
                                <div sx={{maxWidth: 120}} onClick={this.changeImage}>
                                    <img id={"prius"} src={prius} alt=""/>
                                </div>

                                <Typography gutterBottom variant="h5" component="div" className={classes.TableHead}>
                                    Toyota
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Total = LKR 25000/=
                                </Typography>


                                {/*<Radio id={"btn"} color="success"*/}
                                {/*       onChange={this.setImage}*/}
                                {/*/>*/}
                                {/*<Radio color="primary"/>*/}
                                {/*<Radio color="error"/>*/}
                                {/*<Radio color="warning"/>*/}


                            </CardActionArea>
                        </Card>

                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xm={3}>


                        <Card sx={{maxWidth: 1750}}>

                            <CardActionArea>
                                <div sx={{maxWidth: 120}}>

                                        <CardContent>

                                            <Typography variant="body2" color="text.secondary">
                                                <CarRentalIcon/>
                                                abcId
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <DirectionsCarIcon/>
                                                Premium
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <PaletteIcon/>
                                                White
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <EngineeringIcon/>
                                                Auto
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <EvStationIcon/>
                                                Petrol
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <AirlineSeatReclineExtraIcon/>
                                                4
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <StackedLineChartIcon/>
                                                priceForTheExtraKm =30.00
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <PriceCheckIcon/>
                                                freeMileageForDay = 1000
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <PriceCheckIcon/>
                                                freeMileageForMonth =2000
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <PriceCheckIcon/>
                                                priceForTheDailyRate =1000.00
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <PriceCheckIcon/>
                                                priceForTheMonthlyRate =20000.00
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <CreditCardIcon/>
                                                damageWaver = 15000.00
                                            </Typography>


                                        </CardContent>




                                </div>

                            </CardActionArea>


                        </Card>


                    </Grid>

                    <Grid item lg={3} md={3} sm={3} xm={3}>
                        <Card sx={{maxWidth: 1750}}>
                            <CardActionArea>
                                <div sx={{maxWidth: 120}}>
                                    <img src={user} alt=""/>
                                    <CardContent sx={{mb: 9}}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="UserName"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreateIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}


                                            variant="standard"
                                        />
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Password"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreateIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onKeyPress={(ev)=>{
                                                console.log(`pressed keyCode {ev.key}`);
                                                if (ev.key==='Enter'){

                                                    //DocodeHere
                                                    ev.preventDefault();
                                                }
                                            }}
                                            variant="standard"
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                            Name
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Address
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Contact No
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Email
                                        </Typography>

                                        <Grid sx={{maxWidth: 1750}}>
                                            <Link to={"/User"}>
                                                <Button variant="outlined" color="success">
                                                    Register
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </CardContent>
                                </div>

                            </CardActionArea>
                        </Card>

                    </Grid>

                    <Grid item lg={3} md={3} sm={3} xm={3}>
                        <Card sx={{maxWidth: 1750}}>
                            <CardActionArea>
                                <Typography variant="body2" color="text.secondary">
                                    Bank Account Details
                                </Typography>
                                <div sx={{maxWidth: 5}}>
                                    {/*<img src={user} alt=""/>*/}
                                    <CardContent sx={{mb: 9}}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Account No"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreateIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                        />

                                        <Grid sx={{maxWidth: 1750}}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                label="Add Bank Slipt"
                                                type={'file'}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">

                                                        </InputAdornment>
                                                    ),
                                                }}
                                                // onClick={this.setState.file}
                                                variant="standard"
                                            />

                                            <div sx={{maxWidth: 120}}>
                                                {/*{console.log(this.handleChange.event)}*/}
                                                {/*<img src={this.handleChange.event} alt=""/>*/}
                                                <img src={slip} alt=""/>
                                            </div>

                                        </Grid>
                                    </CardContent>

                                    <Button variant="outlined" color="success" type={'file'} endIcon={<SendIcon/>}
                                            onClick={this.submitBookingDetails}
                                    >Rent Car</Button>

                                </div>

                            </CardActionArea>
                        </Card>

                    </Grid>


                </Grid>
                <GDSESnackBar
                    open={this.state.alert}
                    onClose={() => {
                        this.setState({alert: false})
                    }}
                    message={this.state.message}
                    autoHideDuration={3000}
                    severity={this.state.severity}
                    variant="filled"

                />






                <Grid container>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="user table">
                            <TableHead >
                                <TableRow>
                                    <TableCell align="right">Car Id</TableCell>
                                    <TableCell align="right">Number Of Passengers</TableCell>
                                    <TableCell align="right">Transmission Type</TableCell>
                                    <TableCell align="right">Car Color</TableCell>
                                    <TableCell align="right">Car Registration Number</TableCell>
                                    <TableCell align="right">Car Fuel Type</TableCell>
                                    <TableCell align="right">Car Brand</TableCell>
                                    <TableCell align="right">Car Type</TableCell>
                                    <TableCell align="right">Car Status</TableCell>
                                    <TableCell align="right">Car Img</TableCell>
                                    <TableCell align="right">Price Of Extra Km</TableCell>
                                    <TableCell align="right">Free Mileage For Day</TableCell>
                                    <TableCell align="right">Free Mileage For Month</TableCell>
                                    <TableCell align="right">Price For The Daily Rate</TableCell>
                                    <TableCell align="right">Price For The Monthly Rate</TableCell>
                                    <TableCell align="right">Damage Waver</TableCell>
                                    <TableCell align="right">Run Km</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.data.map((row) => (
                                        <TableRow>
                                            <TableCell align="right">{row.cid}</TableCell>
                                            <TableCell align="right">{row.numberOfPassengers}</TableCell>
                                            <TableCell align="right">{row.transmissionType}</TableCell>
                                            <TableCell align="right">{row.color}</TableCell>
                                            <TableCell align="right">{row.registrationNumber}</TableCell>
                                            <TableCell align="right">{row.fuelType}</TableCell>
                                            <TableCell align="right">{row.brand}</TableCell>
                                            <TableCell align="right">{row.carType}</TableCell>
                                            <TableCell align="right">{row.status}</TableCell>
                                            <TableCell align="right">{row.img}</TableCell>
                                            <TableCell align="right">{row.priceForTheExtraKm}</TableCell>
                                            <TableCell align="right">{row.freeMileageForDay}</TableCell>
                                            <TableCell align="right">{row.freeMileageForMonth}</TableCell>
                                            <TableCell align="right">{row.priceForTheDailyRate}</TableCell>
                                            <TableCell align="right">{row.priceForTheMonthlyRate}</TableCell>
                                            <TableCell align="right">{row.damageWaver}</TableCell>
                                            <TableCell align="right">{row.runKm}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Edit">
                                                    <IconButton

                                                    >
                                                        <EditIcon color={"primary"}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Delete">
                                                    <IconButton

                                                    >
                                                        <DeleteIcon color={"error"}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>

                    </TableContainer>
                </Grid>
            </Fragment>

        )
    }


}

export default withStyles(styleSheet)(BookingDetails);
;