import CustomRadio from './common/CustomRadio';

class RoofSelect extends React.Component {

  constructor(props,context){
    super(props, context);
    this.state={
      selectedRadio : 'opt1',
      radioSelected: 'Flat Roof',
      orientation: 'North, NE, NW',
      shading: 'Light'
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkSelected = this.checkSelected.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
    this.setShading = this.setShading.bind(this);
  }

  checkSelected(val, e){
    e.preventDefault();
    this.setState({radioSelected : val});
  }
  setOrientation(e){
    this.setState({orientation: e.target.value})
  }
  setShading(e){
    this.setState({shading: e.target.value})
  }
  handleChange(e){
    this.setState({selectedRadio : e.target.value});
  }

  toggleOrientation(){
    if(this.state.radioSelected !== 'Flat Roof'){
      return(
        <div className="orient box-block-content-row">
          <h3 className="margin-bot col s12">What is your roof orientation?</h3>
          <ul className="custom-ul s10">
            <li className="custom-list col s12 m12 l12">
              <input className="with-gap" name="group4" type="radio" id="orn_1" value="North, NE, NW"  onClick={this.setOrientation} defaultChecked/>
              <label htmlFor="orn_1">North, NE, NW</label>
            </li>
            <li className="custom-list col s12 m12 l12">
              <input className="with-gap" name="group4" type="radio" id="orn_2" value="East or West" onClick={this.setOrientation} />
              <label htmlFor="orn_2">East or West</label>
            </li>
            <li className="custom-list col s12 m12 l12">
              <input className="with-gap" name="group4" type="radio" id="orn_3" value="South, SE, SW" onClick={this.setOrientation} />
              <label htmlFor="orn_3">South, SE, SW</label>
            </li>
          </ul>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="box-block">
        <div className="box-block-header">
          <h2 className="center-align">Is there shading on your roof?</h2>
          <div ref="roofType" className="radio-wrapper" data-val={this.state.radioSelected}>
            <CustomRadio prop={{label : 'Flat Roof', img: 'icon-flat-roof'}} valHold={this.state.radioSelected} handleClick={this.checkSelected}/>
            <CustomRadio prop={{label : 'Pitched Roof', img: 'icon-pitched-roof'}} icon={'home'} valHold={this.state.radioSelected} handleClick={this.checkSelected}/>
          </div>
        </div>
        <div className="box-block-content">
          {this.toggleOrientation()}
          <div className="box-block-content-row">
            <h3 className="margin-bot col s12">Shading</h3>
            <ul className="custom-ul s10">
              <li className="custom-list col s12 m12 l12">
                <input className="with-gap" name="group5" type="radio" value="Light" id="light_shd"  onClick={this.setShading} defaultChecked/>
                  <label htmlFor="light_shd">Light or No Shading</label>
                  <span className="radio-para">Less than 10% of the roof is shaded.</span>
              </li>
              <li className="custom-list col s12 m12 l12">
                <input className="with-gap" name="group5" type="radio" value="Moderate" id="moderate_shd" onClick={this.setShading} />
                <label htmlFor="moderate_shd">Moderate</label>
                <span className="radio-para">Less than 20% of the roof is shaded.</span>
              </li>
              <li className="custom-list col s12 m12 l12">
                <input className="with-gap" name="group5" type="radio" value="Heavy" id="heavy_shd" onClick={this.setShading} />
                <label htmlFor="heavy_shd">Heavy</label>
                <span className="radio-para">More than 20% of the roof is shaded.</span>
              </li>
              <li className="custom-list col s12 m12 l12">
                <input className="with-gap" name="group5" type="radio" value="Not Sure" id="notsure_shd" onClick={this.setShading} />
                <label htmlFor="notsure_shd">Not Sure</label>
                <span className="radio-para">I need help. I dont know for sure.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default RoofSelect;
