class Header extends React.Component{
  constructor(props, context){
    super(props, context);
  }

  render(){
    return(
      <header className={this.props.formShown?'morph z-depth-1':''} >
        <div className="container-fluid">
          <div className="row">
            <h1>
              <span className="text-orange">SOLAR</span><span className="text-blue">WISELY</span>
            </h1>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
