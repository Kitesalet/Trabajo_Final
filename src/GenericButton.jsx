function GenericButton({ text }) {
  return (
    <div className="pt-10">
      <button className="button" type="submit">
        {text}
      </button>
    </div>
  );
}

export default GenericButton;
