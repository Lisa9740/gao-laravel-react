import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import CustomersService from "../Services/customers.service";

export default class AddCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            customerId: this.props.customerId,
            computerId: this.props.computerId,
            hours: this.props.hours,
            date: this.props.date,
            open: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    /**
     * handle the update value for name state
     * @param {*} event
     */
    async handleChangeFirstName(event) {
        await this.setState({ firstname: event.target.value });
    }


    /**
     * handle the update value for surname state
     * @param {*} event
     */
    async handleChangeLastName(event) {
        await this.setState({ lastname: event.target.value});
    }


    /**
     * handle add client and set assign at same time
     * @param {*} event
     */
    async handleSubmit(event) {
        event.preventDefault();
        try {
            let responseData = await CustomersService.create(
                {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    computerId: this.state.computerId,
                    hour: this.state.hours,
                    date: this.state.date
                }
            );

                console.log("created customer", responseData.data.data)
            let assignInfo = responseData.data.data;
                await this.props.getInfoAttribution(assignInfo);
                await this.setState({ firstname: "", lastname: "", open: false });
                await this.props.closeModal();

        } catch (error) {
            console.error(error);
        }
    }


    /**
     * handle open modal
     */
    async handleOpen() {
        await this.setState({ open: true })
    };


    /**
     * handle close modal
     */
    async handleClose() {
        await this.setState({ open: false })
        await this.props.closeModal();
    };


    /**
     * render add client modal
     */
    render() {
        return (
            <div>
                <Button type="button" variant="contained" size="small" className="btnStyle" onClick={this.handleOpen} >
                    <AddCircleOutlineIcon size="small" className="greenFont" />
                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyleClient"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Ajouter un client</h3>
                        <div className="formInput">
                            <input type="text" placeholder="Nom du client" value={this.state.firstname} onChange={this.handleChangeFirstName} />
                            <input type="text" placeholder="Prénom du client" value={this.state.lastname} onChange={this.handleChangeLastName} />
                            <div className="btnSpaceTop">
                                <Button variant="contained" color="default" onClick={this.handleClose} className="btnSpace">Annuler</Button>
                                <Button type="submit" variant="contained" color="primary" className="btnSpace">Ajouter</Button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

