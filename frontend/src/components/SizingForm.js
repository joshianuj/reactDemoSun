import OptionList from './common/OptionList';
import RoofSelect from './RoofSelect';
import SizingOutput from './SizingOutput';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import BoxList from './common/BoxList';
import CustomRadio from './common/CustomRadio';
import AlertContainer from 'react-alert';

//Redux dependencies
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import {locationActions, solarSizeActions} from '../actions';

//util
import * as objectHelperUtil from '../utils/objectHelperUtil';

class SizingForm extends React.Component {

  constructor(props,context){
    super(props, context);

    this.state={
      outputShown: false,
      isShowingModal: false,
      monthForm : [0],
      radioSelected: 'Residential',
      sizeSelected: 'Monthly Bill',
      average: 0
    };

    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };

    this.showOutput = this.showOutput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addMonthForm = this.addMonthForm.bind(this);
    this.delMonthForm = this.delMonthForm.bind(this);
    this.removeAllMonthForm = this.removeAllMonthForm.bind(this);
    this.checkSelected = this.checkSelected.bind(this);
    this.checkSizing = this.checkSizing.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.calculateAverage = this.calculateAverage.bind(this);
  }

  componentWillMount(){
    this.props.actions.fetchLocations();
  }

  handleClick(e){e.preventDefault(); this.setState({isShowingModal: true})};
  handleClose(e){this.setState({isShowingModal: false})};

  showAlert(status, message){
    this.msg.show(message, {
      time: 5000,
      type: status,
      icon: <i className="material-icons alert-box">notifications</i>
    });
  }

  componentWillUnmount(){
    this.props.actions.clearSolarSize();
  }

  getFormData(){
    let informations = [];
    let monthForm  = this.state.monthForm;
    monthForm.map((index)=>{
      informations.push({
        "total": this.refs['billPerMonth'+index].refs.totalUsage.value,
        "percentage": this.refs['billPerMonth'+index].refs.percentUsed.value
      })
    });
    let orientation = this.refs.roofSelect.state.radioSelected!='Flat Roof'? this.refs.roofSelect.state.orientation: ''
    let payload =  {
      "location": this.props.selectedLocation,
      "shading": this.refs.roofSelect.state.shading,
      "purpose": this.state.radioSelected,
      "roof": this.refs.roofSelect.state.radioSelected,
      "orientation": orientation,
      "informations": informations
    };
    return objectHelperUtil.removeEmptyValue(payload);
  }

  showOutput(e){
    e.preventDefault();
    this.props.actions.postDetails(this.getFormData())
        .then((response)=>{          
        })
        .catch((error)=>{
          this.showAlert('error', error.text)
        });
  }

  checkSizing(val, e){
    e.preventDefault();
    this.setState({sizeSelected : val});
  }

  checkSelected(val, e){
    e.preventDefault();
    this.setState({radioSelected : val});
  }

  addMonthForm(e){
    e.preventDefault();
    var newMonth = this.state.monthForm;
    newMonth.push(this.state.monthForm.length);
    this.setState({monthForm: newMonth});
  }

  removeAllMonthForm(e){
    e.preventDefault();
    this.setState({monthForm: [0]});
  }

  delMonthForm(value, e){
    e.preventDefault();
    if(this.state.monthForm.length > -1){
      let changeArray = this.state.monthForm;
      let index= changeArray.indexOf(value);
      changeArray.splice(index,1);
      this.setState({monthForm : changeArray});
    }
  }

  calculateAverage(){
    let monthForm  = this.state.monthForm;
    let sum = 0;
    for (let i in monthForm){
      sum += parseFloat(this.refs['billPerMonth'+i].refs.totalUsage.value);
    }
    this.setState({average: sum/monthForm.length});
  }

  render(){
    let timeStamp = Date.now() / 1000 | 0;
    return (
      <div className="form-monthly-size col s12 m8 offset-m2">
        <h2 className="header col s12">Your Usage Data</h2>
        <div className="col s12 m12">
          <div className="row no-margin">
            <form onSubmit={this.showOutput}>
              {
              // <div  className="card">
              //     <div className="custom-row top-border col s12">
              //       <p className="radio-title no-margin-bot">Size By:</p>
              //       <CustomRadio prop={{label : 'Monthly Bill', icon : 'date_range', img: ''}} valHold={this.state.sizeSelected} handleClick={this.checkSizing}/>
              //       <CustomRadio prop={{label : 'Interval Data', icon : 'timeline', img: ''}} valHold={this.state.sizeSelected} handleClick={this.checkSizing}/>
              //     </div>
              // </div>
              }
              <div className="card">
                <div className="custom-row bottom-border col s12">
                  <div className="radio-wrapper">
                    <CustomRadio prop={{label : 'Residential', icon : 'home', img: ''}} valHold={this.state.radioSelected} handleClick={this.checkSelected}/>
                    <CustomRadio prop={{label : 'Business', icon : 'location_city', img: ''}} valHold={this.state.radioSelected} handleClick={this.checkSelected}/>
                  </div>
                </div>
                <div className="box-block col s12">
                  <div className="box-block-header">
                    <label className="custom-label no-margin-bot left">Insert your Electricity Bill Information:</label>
                    <div className="right">
                      <button className="btn-small right" onClick={this.addMonthForm}><i className="material-icons">add</i>Add</button>
                      {(this.state.monthForm.length > 1) ? <button className="btn-small-alt right" onClick={this.removeAllMonthForm}><i className="material-icons">delete_sweep</i>Clear</button>:''}
                    </div>
                  </div>
                  <div className="box-block-content">
                      <ul className="custom-ul s10">
                        {
                          this.state.monthForm.map((index) => {
                            return <BoxList calculateAverage={this.calculateAverage} ref={'billPerMonth'+index} key={index} delMonth={this.delMonthForm} index={index}/>
                          })
                        }
                      </ul>
                      {//<div className="custom-block top-border">
                        //<span>Average KWH: </span>
                        //<span>{this.state.average || 'N/A'}</span>
                      //</div>
                    }
                    </div>
                </div>
              </div>
              <div  className="card">
                <RoofSelect ref="roofSelect"/>
              </div>
              <div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
              </div>
              <div className="custom-row right">
                <button className="btn btn-large waves-effect waves-light sw-btn" type="submit">
                  GET MY SOLAR SIZE
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
            {this.props.result.size?<SizingOutput/>:''}
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    isFetchingLocations: state.locationReducer.get('isFetching'),
    locations: state.locationReducer.get('locations'),
    selectedLocation: state.locationReducer.get('selectedLocation'),
    isFetchingSolarSize: state.solarSizeReducer.get('isFetching'),
    result: state.solarSizeReducer.get('result')
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, locationActions, solarSizeActions), dispatch)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SizingForm);
