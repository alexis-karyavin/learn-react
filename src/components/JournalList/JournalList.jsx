import './JournalList.css';
import CardButton from '@/components/CardButton/CardButton';
import JournalItem from '@/components/JournalItem/JournalItem';

function JournalList({ data }) {
  function clickItem() {
    console.log('Click item');
  }
  const journalItems = data.map(({ date, text, title }, i) => (
    <CardButton onClick={clickItem} key={i}>
      <JournalItem date={date} text={text} title={title} />
    </CardButton>
  ));
  return <div className="journal-list">{journalItems}</div>;
}

export default JournalList;
