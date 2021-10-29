import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

import CustomersService from "../Services/customers.service";
import AttributionsService from "../Services/attributions.service";
import {flashSuccess} from "../Utils/flashMessage";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Modal from "@material-ui/core/Modal";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCustomerModal from "./AddCustomerModal";
import {getToken} from "../Utils/tokenConfig";

class AddAttributionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            computerId : this.props.computerId,
            customerId: null,
            hours: this.props.hours,
            date: this.props.date,
            attributeInfo: {},
            userExist: false,
            openModal: false,
            setOpenModal: false,
            isNew: false,
            defaultProps: {
                options: [],
                getOptionLabel: (option) => `${option.firstname} ${option.lastname}`,
            },
            open: false,

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getInfoAttributionClient = this.getInfoAttributionClient.bind(this);
    }


    async handleChange(event, value) {
        let customer       = event.target.value;
        let customerLength = customer.length;
        if(customerLength > 2) {
            try {
                const customerData = await CustomersService.search(customer)

                const responseData =  customerData.data.data;
                let userLength = responseData.length;
                if (userLength === 0) {
                    await this.setState({ userExist: false, defaultProps: { ...this.state.defaultProps, options: responseData } });
                } else {
                    await this.setState({ userExist: true, defaultProps: { ...this.state.defaultProps, options: responseData } });
                }
            } catch (error) {
                console.error(error)
            }

        }   else {
            await this.setState({ userExist: false });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const attributionData = await AttributionsService.create(
                {
                computerId: this.state.computerId,
                customerId: this.state.attributeInfo.id,
                hours: this.state.hours,
                date: this.state.date
            });

            await this.props.getAddAttributions(attributionData.data.data);
            flashSuccess("Créneau réserver !")
            this.handleClose();

        } catch (error) {
            console.error(error)
        }
    }

    async handleOpen() {
        await this.setState({ open: true })
    };

    handleClose(close) {
         this.setState({ open: false })
    };

    async handleSelect(event, value) {
        await this.setState({ attributeInfo: value });
    }

    async getInfoAttributionClient(infoAssign) {
        await this.props.getAddAttributions(infoAssign);
    }


    render() {
        let buttonAttribution;
        if(this.state.userExist) {
            buttonAttribution = (
                <Button type="submit" variant="contained" color="primary" className="btnSpace">Attribuer</Button>
            );
        } else {
            buttonAttribution=(
                <Button type="submit" variant="contained" color="primary" className="btnSpace" disabled>Attribuer</Button>
            );
        }

        return (
            <div>
                <AddCircleOutlineIcon size="small" className="greenFont btnStyle" onClick={this.handleOpen} />

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >

                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Attribuer</h3>
                        <div className="formInput">
                            <div className="formAutocomplete">
                                <Autocomplete
                                    className="autoCompleteStyle"
                                    {...this.state.defaultProps}
                                    id="auto-complete"
                                    autoComplete
                                    includeInputInList
                                    onKeyUp={this.handleChange}
                                    onChange={this.handleSelect}
                                    renderInput={(params) => <TextField {...params} label="Le client" margin="normal" />}
                                />
                                <AddCustomerModal computerId={this.state.computerId} hours={this.state.hours} date={this.state.date} closeModal={this.handleClose} getInfoAttribution={this.getInfoAttributionClient} />
                            </div>
                            <div>
                                <Button variant="contained" color="default" onClick={this.handleClose} className="btnSpace">Annuler</Button>
                                {buttonAttribution}
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default AddAttributionModal
