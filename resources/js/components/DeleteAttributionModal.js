import {Component} from "react";
import React from 'react';
import Modal from "@material-ui/core/Modal";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { getToken } from '../Utils/tokenConfig';
import { flashSuccess } from '../Utils/flashMessage';
import AttributionService from '../Services/attributions.service';

export default class DeleteAttribution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idAssign: this.props.idAssign,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const assignData = await AttributionService.delete(this.state.idAssign);
            let responseData = assignData.data;
            console.log(responseData)
            if(responseData.success) {
                await this.props.deletedAttribution(this.state.idAssign);
                flashSuccess(responseData.message);
                this.handleClose();
            }
        } catch (error) {
            console.error(error)
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
     handleClose() {
        this.setState({ open: false })
    };
    render(){
        return(
            <div>
                <DeleteIcon size="small" className="redFont btnStyle" onClick={this.handleOpen} />
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <div>
                        <form onSubmit={this.handleSubmit} className="formStyle">
                            <h3>Voulez vous vraiment annuler cette attribution ?</h3>
                            <div className="formInput">
                                <div>
                                    <Button variant="contained" color="primary" onClick={this.handleClose} className="btnSpace">Non</Button>
                                    <Button type="submit" variant="contained" color="secondary" className="btnSpace">Oui</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}
