//Redux dependencies
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import {userActions} from '../actions';

//plugins
import AlertContainer from 'react-alert';

//util
import * as objectHelperUtil from '../utils/objectHelperUtil';

const STOREY = {
    SINGLE: 'Single',
    DOUBLE: 'Double',
    WAREHOUSE: 'Warehouse'
};

const BATTERY = {
    YES: 'Yes, now',
    MAYBE: 'Yes, later',
    NO: 'No'
};

const VISIT = {
    YES: 'Yes',
    NO: 'No'
};

const INTERESTED = {
    FINANCE: 'Finance',
    MICRO_INVERTER: 'Micro Inverters'
};

class InfoForm extends React.Component {

    constructor(props, context) {
        super();
        this.state = {
            storey: STOREY.SINGLE,
            visit: VISIT.YES,
            battery: BATTERY.YES,
        };
        this.bill = props.location.state.bill;
        this.size = props.location.state.size;
        this.submitForm = this.submitForm.bind(this);
        this.changeVisit = this.changeVisit.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.changeStorey = this.changeStorey.bind(this);
        this.changeBattery = this.changeBattery.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.actions.postDetails(this.getFormData())
            .then((response)=>{
                setTimeout(()=>this.context.router.push('/'), 2000);
                this.showAlert('success', response.text);
            })
            .catch((response)=>{
                this.showAlert('error', response.text)
            });
    }

    showAlert(status, message){
        this.msg.show(message, {
            time: 5000,
            type: status,
            icon: <i className="material-icons alert-box">notifications</i>
        });
    }

    getFormData() {
        let payload = {
            first_name: this.refs.firstName.value,
            last_name: this.refs.lastName.value,            
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            location: this.refs.location.value,
            purpose: this.bill.purpose,
            storey: this.state.storey,
            visit: this.state.visit,
            battery: this.state.battery,
            interested: [{
                finance: this.refs.finance.value === 'on',
                micro_inverter: this.refs.microInverter.value === 'on'
            }],
            size: this.size,
        };
        return objectHelperUtil.removeEmptyValue(payload);
    }

    changeStorey(value) {
        this.setState({
            storey: value
        })
    }

    changeBattery(value) {
        this.setState({
            battery: value
        })
    }

    changeVisit(value) {
        this.setState({
            visit: value
        })
    }

    render() {
        return (
            <div className="row no-margin-bot">
                <div className="card col s12 l6 offset-l3">
                    <form onSubmit={this.submitForm}>
                        <h1>User Details</h1>
                        <div className="row col s12 m6">
                            <span className="col t18 s6 m3">Sizing:</span>
                            <span className="col t18 s6 m9">{this.size} KW</span>
                        </div>
                        <div className="row col s12 m6">
                            <span className="col t18 s6 m3">Type:</span>
                            <span className="col t18 s6 m9">{this.bill.purpose}</span>
                        </div>
                        <div className="row col s12">
                            <label className="custom-label">When do you plan to install solar panels?</label>
                            <p className="col s12 m4 l4">
                                <input className="with-gap" id="battery-yes" type="radio"
                                    checked={this.state.battery === BATTERY.YES}
                                    onChange={()=> this.changeBattery(BATTERY.YES)}/>
                                <label htmlFor="battery-yes">Right-away</label>
                            </p>
                            <p className="col s12 m4 l4">
                                <input className="with-gap" id="battery-maybe" type="radio"
                                    checked={this.state.battery === BATTERY.MAYBE}
                                    onChange={()=> this.changeBattery(BATTERY.MAYBE)}/>
                                <label htmlFor="battery-maybe">1-month</label>
                            </p>
                            <p className="col s12 m4 l4">
                                <input className="with-gap" id="battery-no" type="radio"
                                    checked={this.state.battery === BATTERY.NO}
                                    onChange={()=> this.changeBattery(BATTERY.NO)}/>
                                <label htmlFor="battery-no">6-months</label>
                            </p>
                        </div>
                        <div className="input-field">
                            <div className="custom-row col s12 m6">
                                <input id="" type="text" className="validate" ref="firstName" placeholder="First Name"/>
                            </div>
                            <div className="custom-row col s12 m6">
                                <input id="" type="text" className="validate" ref="lastName" placeholder="Last Name"/>
                            </div>
                        </div>
                        <div className="input-field col s12">
                            <div className="icon-input">
                                <div className="material-icons is-collapsed-mobile left input-icon">mail</div>
                                <input ref="email" type="text" className="validate right"
                                       placeholder="Enter your Email address"/>
                            </div>
                        </div>
                        <div className=" input-field col s12">
                            <div className="icon-input">
                                <div className="material-icons is-collapsed-mobile left input-icon">location_on</div>
                                <input ref="location" type="text" className="validate right"
                                       placeholder="Enter your address"/>
                            </div>
                        </div>
                        <div className="input-field col s12">
                            <div className="icon-input">
                                <div className="material-icons is-collapsed-mobile left input-icon">phone</div>
                                <input ref="phone" type="text" className="validate right"
                                       placeholder="Enter your phone number"/>
                            </div>
                        </div>
                        <div className="row col s12">
                            <label className="custom-label">Storey: </label>
                            <p className="col s12 m4 l4">
                                <input className="with-gap" name="single" id="single" type="radio" value={STOREY.SINGLE}
                                       checked={this.state.storey === STOREY.SINGLE}
                                       onChange={()=> this.changeStorey(STOREY.SINGLE)}/>
                                <label htmlFor="single">single</label>
                            </p>
                            <p className="col s12 m4 l4">
                                <input className="with-gap" id="double" type="radio" value={STOREY.DOUBLE}
                                       checked={this.state.storey === STOREY.DOUBLE}
                                       onChange={()=> this.changeStorey(STOREY.DOUBLE)}/>
                                <label htmlFor="double">Double</label>
                            </p>
                            <p className="col s12 m4 l4">
                                <input className="with-gap" id="warehouse" type="radio" value={STOREY.WAREHOUSE}
                                       checked={this.state.storey === STOREY.WAREHOUSE}
                                       onChange={()=> this.changeStorey(STOREY.WAREHOUSE)}/>
                                <label htmlFor="warehouse">Warehouse</label>
                            </p>
                        </div>
                        <div className="row col s12">
                            <label className="custom-label">Are you interested in any of the following?</label>
                            <p>
                                <input type="checkbox" id="finance" ref="finance"/>
                                <label htmlFor="finance">Finance</label>
                            </p>
                            <p>
                                <input type="checkbox" id="micro_inverter" ref="microInverter"/>
                                <label htmlFor="micro_inverter">Micro Inverters</label>
                            </p>
                        </div>
                        <div className="row col s12 center-align">
                            <button className="btn waves-effect waves-light btn-large sw-btn" type="submit">
                                <i className="material-icons right">send</i>
                                SUBMIT
                            </button>
                        </div>
                    </form>
                    <div>
                        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                    </div>
                </div>
            </div>
        )
    }

}

InfoForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};


let mapStateToProps = (state) => {
    return {
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, userActions), dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoForm);
