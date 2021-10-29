import React, {Component, useState} from "react";
import ComputersService from "../Services/computers.service";
import Button from "@material-ui/core/Button";
import { flashSuccess, flashError } from '../Utils/flashMessage';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";


export default class AddComputerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setOpen: false,
            open: false,
            disabledBtn: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen   = this.handleOpen.bind(this);
        this.handleClose  = this.handleClose.bind(this);
    }


    async handleChange(event) {
        if (event.target.value.length > 3) {
            await this.setState({ name: event.target.value, disabledBtn: false });
        } else {
            await this.setState({ name: event.target.value, disabledBtn: true });
        }
    }


    async handleSubmit(event) {
        event.preventDefault();
        try {
            let dataSend = {
                name: this.state.name
            };

            const computer = await ComputersService.create(dataSend)
            let responseData = computer.data;

            if(responseData.success) {
                this.props.computers(true);
                await this.setState({ name: "" });
                flashSuccess(responseData.message)
                this.handleClose();
            } else {
                flashError(responseData.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Handle open modal
     */
    async handleOpen() {
        await this.setState({ open: true })
    };

    /**
     * handle close modal
     */
    async handleClose() {
        await this.setState({open: false})
    };


    render() {
        let buttonSubmit;
        if(this.state.disabledBtn) {
            buttonSubmit = (<Button type="submit" variant="contained" color="primary" className="btnSpace" disabled>Ajouter</Button>);
        } else {
            buttonSubmit = (<Button type="submit" variant="contained" color="primary" className="btnSpace">Ajouter</Button>);
        }

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleOpen} >
                    Ajouter poste
                </Button>
                <div>
                    <Modal open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title"
                           className="modalStyle"
                    >
                        <div>
                            <form onSubmit={this.handleSubmit} className="formStyle">
                                <h3>Ajouter un ordinateur</h3>
                                <div className="formInput">
                                    <input type="text" placeholder="Nom du poste" value={this.state.name} onChange={this.handleChange} />
                                    <div>
                                        <Button variant="contained" color="default" onClick={this.handleClose} className="btnSpace">Annuler</Button>
                                        {buttonSubmit}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
