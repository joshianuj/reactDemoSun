import Header from './common/Header';
import Footer from './common/Footer';
import Main from './Main';
import Banner from './common/Banner';
import CSSAnim from 'react-addons-css-transition-group';
class App extends React.Component {
  constructor(props,context){
    super(props, context);
    this.state = {
      bannerShown: true,
      formShown: false
    };
    this.removeBanner = this.removeBanner.bind(this);
    this.showBanner = this.showBanner.bind(this);
  }

  removeBanner(){
    this.setState({bannerShown : false, formShown: true});
  }
  showBanner(){
    this.setState({bannerShown : true, formShown: false});
  }
  getBanner(){
    return(
      <Banner removeBanner={this.removeBanner}/>
    )
  }
  render() {
    return (
      <div className="page-wrapper">
        <Header formShown={this.state.formShown}/>
        <CSSAnim transitionName="slideUp" component="div" className="banner-wrapper" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {this.state.bannerShown?this.getBanner():''}
        </CSSAnim>
        <CSSAnim transitionName="fadeIn" component="main" transitionEnterTimeout={1000} transitionLeaveTimeout={100}>
          {this.state.formShown?<Main showBanner={this.showBanner}/>:''}
        </CSSAnim>
        {!this.state.bannerShown?<Footer/>:''}
      </div>
    )
  }
}

export default App;
