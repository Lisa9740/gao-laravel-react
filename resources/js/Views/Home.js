import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Computer from '../components/GetComputerItems'
import AddComputer from '../components/AddComputerModal'
import ComputersService from "../Services/computers.service";
import DateFnsUtils from '@date-io/date-fns';
import Login from './Login';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import {removeToken} from "../Utils/tokenConfig";



const useStyles = () => [({
    computerCard: {
        margin: "100px",
    },
    computerItem: {
        width: "600px"
    },
    addComputerBtn: {
        marginLeft: "0px",
    }
})];



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            computers: [],
            currentDate: new Date().toISOString().substr(0, 10),
            currentPage: 1,
            name: "",
            selectedDate: new Date(),
            setSelectedDate: new Date(),
            setOpen: false,
            open: false,
            redirect: false
        };
        this.getAddedComputer   = this.getAddedComputer.bind(this);
        this.updateComputer     = this.updateComputer.bind(this);
        this.handleDateChange   = this.handleDateChange.bind(this);
        this.logout             = this.logout.bind(this);
    }


    async componentDidMount() {
        await this.retrieveComputers();
    }

    async retrieveComputers() {
        try {
            await this.setState({ computers: [] });
            const response = await ComputersService.getAll(this.state.currentDate)
            console.log(response.data.data);
            await this.setState({ computers: response.data.data });
        } catch(err){
            console.error(err)
        }
    }

    async getAddedComputer() {
        await this.retrieveComputers();
    }

    async updateComputer() {
        await this.retrieveComputers();
    }

    async handleDateChange(event, value){
        await this.setState({ currentDate: value });
        await this.retrieveComputers();
    }
    async logout() {
        await this.setState({ redirect: true })
        removeToken();
    }

    render() {
        const {classes} = this.props

        if (this.state.redirect) {
            return (
                <React.Fragment>
                    <Router>
                        <Route exact path="/" >
                            <Login />
                        </Route>
                        <Redirect to='/'/>
                    </Router>
                </React.Fragment>
            )
        }else {
            return (
                <React.Fragment>
                    <Router>
                        <header>
                            <Link to="/" id="btnWelcome" className="whiteFont">  Gestion ordinateur </Link>
                            <Button onClick={this.logout}>
                                <ExitToAppIcon className="whiteFont" />
                            </Button>
                        </header>
                    </Router>

                    <Container maxWidth="lg">
                        <div className="marginDate alignElement">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container
                                      justifyContent="flex-start">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy-MM-dd"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={this.state.currentDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <AddComputer computers={this.getAddedComputer}/>
                        </div>

                        <Grid container
                              spacing={5}
                              alignItems="flex-end"
                              className={classes.computerCard}
                              id="cardContainer"
                        >
                            {
                                this.state.computers.map((computer) => (
                                    <Grid className={classes.computerItem} key={computer.id} item xs={3}>
                                        <Computer computer={computer} date={this.state.selectedDate} updateComputer={this.updateComputer}  />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
                </React.Fragment>
            )
        }
    }
}


export default withStyles(useStyles)(Home)

