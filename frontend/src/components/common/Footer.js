class Footer extends React.Component{
  constructor(props, context){
    super(props, context);
  }

  render(){
    return(
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="row no-margin">
              <div className="left col l3">
                <h3><span className="text-orange">SOLAR</span><span className="text-blue">WISELY</span></h3>
                <ul className="social">
                  <li><a href="#" title="facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                  <li><a href="#" title="twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                  <li><a href="#" title="google plus"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                  <li><a href="#" title="pinterest"><i className="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
                </ul>
              </div>
              <div className="right col l3">
                <h3>Contact Us:</h3>
                <div className="contact-phone"><i className="material-icons">phone</i><span>+0 (123) 456-789</span></div>
                <div className="contact-email"><i className="material-icons">email</i><span>someproject@someproject.com</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row no-margin">
              <div className="cpy-right-box left">&#169; 2016 someproject</div>
              <ul className="footer-nav right">
                <li><a href="#" title="home">Home</a></li>
                <li><a href="#" title="contact">Contact</a></li>
                <li><a href="#" title="blog">Blog</a></li>
                <li><a href="#" title="about">About</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
