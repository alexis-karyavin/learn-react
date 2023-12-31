import './JournalList.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context';

import CardButton from '@/components/CardButton/CardButton';
import JournalItem from '@/components/JournalItem/JournalItem';

function JournalList({ data, clickItem }) {
  const { userId } = useContext(UserContext);

  function clickCard(i) {
    clickItem(data[i]);
  }

  const journalItems = data
    .filter((item) => item.userId === userId)
    .map(({ date, text, title }, i) => (
      <CardButton onClick={() => clickCard(i)} key={i}>
        <JournalItem date={date} text={text} title={title} />
      </CardButton>
    ));

  return <div className="journal-list">{journalItems}</div>;
}

export default JournalList;
