import './App.css';

import LeftPanel from './components/layouts/LeftPanel/LeftPanel';
import Body from './components/layouts/Body/Body';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from '@/components/JournalList/JournalList';
import JournalAddButton from '@/components/JournalAddButton/JournalAddButton';
import { useEffect, useState } from 'react';

function App() {
  const [listJournal, setListJournal] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    setListJournal(data.map((el) => ({ ...el, date: new Date(el.date) })));
  }, []);

  useEffect(() => {
    if (listJournal.length) {
      localStorage.setItem('data', JSON.stringify(listJournal));
    }
  }, [listJournal]);

  function addListItem(item) {
    setListJournal((list) => [...list, { ...item, date: new Date(item.date) }]);
  }

  return (
    <div className="wrapper">
      <LeftPanel>
        <h2 className="left-panel__header">Персональный журнал</h2>
        <JournalAddButton />

        <JournalList data={listJournal} />
      </LeftPanel>

      <Body>
        <JournalForm addListItem={addListItem} />
      </Body>
    </div>
  );
}

export default App;
