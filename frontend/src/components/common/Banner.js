import OptionList from './OptionList';
import AlertContainer from 'react-alert';

//Redux dependencies
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import {locationActions} from '../../actions';

class Banner extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state={
      location: ''
    };

    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };

    this.handleClick = this.handleClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

   showAlert(){
    this.msg.show('Location not selcted.', {
      time: 5000,
      type: 'error',
      icon:  <i className="material-icons alert-box">notifications</i>
    });
  }

  setDynamicHeight(elem){
    if(window.innerHeight > 400){
      elem.style.height = window.innerHeight + 'px';
    }
    else{
      elem.style.height = 'initial';
    }
  }

  getLocation(e){
    this.setState({location: e.target.value})
  }

  componentWillMount(){
    this.props.actions.fetchLocations();
  }

  componentDidMount(){
    let bannerRef = this.refs.banner;
    this.setDynamicHeight(bannerRef);
    window.addEventListener("resize", this.setDynamicHeight.bind(null,bannerRef));
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.setDynamicHeight);
  }

  handleClick(e){
    e.preventDefault();
    if(this.refs.location.value && this.refs.location.value != '0'){
      this.props.actions.selectedLocation(this.refs.location.value);
      this.props.removeBanner();
    }
    else{
      this.showAlert();
    }
  }

  render(){
    return(
      <div ref="banner" className="page-banner">
        <div className="overlay"></div>
        <div className="banner-content">
          <h2>Solar Solutions</h2>
          <p className="is-collapsed-mobile">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam eius,
            tenetur vel perferendis ratione minus eveniet! Dolorum, quisquam iure porro
            est magnam illum assumenda perspiciatis alias provident aliquid deserunt laboriosam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam eius,
            tenetur vel perferendis ratione minus eveniet! Dolorum, quisquam iure porro
            est magnam illum assumenda perspiciatis alias provident aliquid deserunt laboriosam.
          </p>
          <div className="banner-select-wrapper">
            <p>Select a location closest to where you live:</p>
            <div className="banner-select-wrapper">
              <div className="material-icons is-collapsed-mobile left input-icon input-icon-banner">location_on</div>
              <select className="browser-default banner-select" ref="location" defaultValue="0" onChange={this.getLocation}>
                <option value="0" disabled>Choose Location</option>
                  {this.props.locations.map((elem, i)=>
                    <OptionList list={elem._id} key={i} value={elem.nearest}/>
                  )}
              </select>
            </div>
          </div>
          <div className="btn-grp">
            <button className="fancy-btn" onClick={this.handleClick}>Get Started</button>
          </div>
        </div>
        <div>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isFetchingLocations: state.locationReducer.get('isFetching'),
    locations: state.locationReducer.get('locations')
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, locationActions), dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
