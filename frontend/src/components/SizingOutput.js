import InfoForm from './InfoForm';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

//Redux dependencies
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import {locationActions, solarSizeActions} from '../actions';

//util
import {exportTo} from '../utils'

class SizingOutput extends React.Component {
  constructor(props,context){
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount(){
    this.props.actions.clearSolarSize();
  }

  handleClick(e){
    e.preventDefault();
    this.context.router.push({
      pathname: '/user',
      state: {
        bill: this.props.result.bill,
        size: Math.round(this.props.result.size * 100) / 100
      }
    })
  };

  render() {
    let size = Math.round(this.props.result.size * 100) / 100,
    panels = size && Math.round(size*1000/250),
    roofSize = Math.round(panels*1.5),
    shading = this.props.result.shading,
    roof =this.props.result.roof;
    return (
      <div ref="output" className="output card" ref="pdfContent">
          <div className="solar-size custom-row">
            <p>Your Estimated Solar Size</p>
            <div>
              <span className="text-orange">{size}</span><span className="text-blue"> KW</span>
            </div>
            <button ref="exportButton" className="btn-small export-pdf-btn" type="button" onClick={exportTo.toPdf.bind(null, this.refs.pdfContent)}>Export to Pdf</button>
          </div>
          <div className="custom-row top-border col s12">
            <h3>Summary:</h3>
            <table className="bordered highlight">
              <tbody>
                <tr>
                  <td><strong>Solar system size (KW)</strong></td>
                  <td>{size} KW</td>
                  <td>Minimum size requirement</td>
                </tr>
                <tr>
                  <td><strong>Number of Panels</strong></td>
                  <td>{panels}</td>
                  <td>@ 250 Watts / Panel</td>
                </tr>
                <tr>
                  <td><strong>Approx roof space to install (sq.m.)</strong></td>
                  <td>{roofSize}</td>
                  <td>Standard panel size , Each panel = 1m x 1.5m</td>
                </tr>
                <tr>
                  <td><strong>Your Shading Status</strong></td>
                  <td>{shading && shading.type}</td>
                  <td>{shading && shading.message}</td>
                </tr>
                <tr>
                  <td><strong>Your Roof Type</strong></td>
                  <td>{roof && roof.type}</td>
                  <td>{roof && roof.message}</td>
                </tr>
              </tbody>
            </table>
            <p className="note-block">
              <i className="material-icons is-collapsed-mobile">announcement</i>
              <span>
                Note: The recommended size is only a guide, and an estimate that doesn't account for shading or roof orientation. Thus, if your roof is shaded or not facing north, please consult with your solar company for the final size requirement.
              </span>
            </p>
          </div>
          <div className="custom-row col s12 center-align">
            <button className="btn waves-effect waves-light btn-large sw-btn" onClick={this.handleClick}>
              GET 3 SOLAR QUOTES NOW
            </button>
          </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    isFetchingSolarSize: state.solarSizeReducer.get('isFetching'),
    result: state.solarSizeReducer.get('result'),
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, solarSizeActions), dispatch)
  }
};

SizingOutput.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SizingOutput);
