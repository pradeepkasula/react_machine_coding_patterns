// A simple button component for all actions
const Action = ({ handleClick, type, className }) => {
  return (
    <div className={className} onClick={handleClick}>
      {type}
    </div>
  );
};

export default Action;
