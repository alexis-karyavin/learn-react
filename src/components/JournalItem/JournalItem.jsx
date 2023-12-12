import './JournalItem.css';

function JournalItem({ date, post, title }) {
  const formatDate = new Intl.DateTimeFormat('ru-RU').format(date);
  return (
    <>
      {' '}
      <h2 className="journal-item__header">{title}</h2>
      <div className="journal-item__body">
        <div className="journal-item__date">{formatDate}</div>
        <div className="journal-item__text">{post}</div>
      </div>
    </>
  );
}

export default JournalItem;
