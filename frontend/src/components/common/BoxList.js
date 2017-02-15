export default class BoxBlock extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.calculateAverage();
    }

    checkFirst() {
        let index = this.props.index;
        if (index > 0) {
            return (
                <p className="col s1 m1">
          <span className="row no-margin-bot">
            <button className="btn-small-icon" onClick={this.props.delMonth.bind(null, index)}><i
                className="material-icons">clear</i></button>
          </span>
                </p>
            )
        }
        return ''
    }

    render() {
        let index = this.props.index;
        return (
            <li key={index} className="custom-list col s12 m12 l12">
                <p className="col s12 m6">
                    <span className="row no-margin-bot">
                        <input id="" type="text" onChange={this.handleChange} className="validate" ref="totalUsage"
                            placeholder="Average Daily Usage (KWH)"/>
                    </span>
                </p>
                <p className="col s12 m5">
                    <span className="row no-margin-bot">
                        <input id="" type="text" className="validate" ref="percentUsed"
                            placeholder="Approx. % used between 9 - 5pm"/>
                    </span>
                </p>
                {this.checkFirst()}
            </li>
        )
    }
}
