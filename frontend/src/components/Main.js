import SizingForm from './SizingForm';

class Main extends React.Component {

  constructor(props,context){
    super(props, context);
        this.bannerShow = this.bannerShow.bind(this);
  }
  bannerShow(e){
    e.preventDefault();
    this.props.showBanner();
  }
  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row no-margin">
            <SizingForm/>
          </div>
          <a className="btn-floating btn-large waves-effect waves-light orange" onClick={this.bannerShow} title="Go Up"><i className="material-icons">navigation</i></a>
        </div>
      </div>
    )
  }
}

export default Main;
