const CustomRadio = ({prop, icon, valHold, handleClick}) => {
  return(
    <p className="radio-wrap">
      <span className={"account-type custom-radio" + ((valHold === prop.label)?' radio-active':'')} onClick={handleClick.bind(null,prop.label)}>
        {(valHold === prop.label)?<i className="material-icons radio-tick">done</i>:''}
        {prop.icon?(<i className="material-icons">{prop.icon}</i>):''}
        {prop.img?(<span className={"custom-font-icon " + prop.img}></span>):''}
        <span className="radio-label">{prop.label}</span>
      </span>
    </p>
  )
}

export default CustomRadio;
