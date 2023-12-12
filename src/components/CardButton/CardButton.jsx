import './CardButton.css';

function CardButton({ children, onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`${className} card-button`}>
      {children}
    </button>
  );
}

export default CardButton;
