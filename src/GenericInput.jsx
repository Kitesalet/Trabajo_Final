function GenericInput({ inputType, name }) {
    return (
      <div className="p-14">
        <label className="d-block" htmlFor={name}>
          {name}
        </label>
        <input className="input" type={inputType} name={name} id={name} />
      </div>
    );
  }
export default GenericInput
