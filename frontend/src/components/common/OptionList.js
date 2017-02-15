const OptionList = ({list, index, value}) => {
    return(
      <option value={list} key={list + index}>{value}</option>
    );
}

export default OptionList ;
