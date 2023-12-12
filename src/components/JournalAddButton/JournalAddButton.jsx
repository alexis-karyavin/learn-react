import './JournalAddButton.css';
import CardButton from '@/components/CardButton/CardButton';

function JournalAddButton() {
  function clickBtnNewItem() {
    console.log('New item');
  }
  return (
    <CardButton className="new-item-btn" onClick={clickBtnNewItem}>
      Новая запись
    </CardButton>
  );
}

export default JournalAddButton;
