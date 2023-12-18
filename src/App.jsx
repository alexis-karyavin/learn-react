import './App.css';
import { useState } from 'react';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user-context';

import LeftPanel from './components/layouts/LeftPanel/LeftPanel';
import Body from './components/layouts/Body/Body';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from '@/components/JournalList/JournalList';
import JournalAddButton from '@/components/JournalAddButton/JournalAddButton';
import Header from './components/Header/Header';

function mapItems(items) {
  if (!items) return [];

  return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [listJournal, setListJournal] = useLocalStorage();
  const [dataForm, setDataForm] = useState({});

  function addListItem(item) {
    if (item.id) {
      setListJournal([
        ...mapItems(listJournal).map((el) =>
          el.id === item.id ? { ...item, date: new Date(item.date) } : el
        )
      ]);
    } else {
      setListJournal([
        ...mapItems(listJournal),
        {
          ...item,
          date: new Date(item.date),
          id: Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        }
      ]);
    }
  }

  function clickItem(item) {
    setDataForm(item);
  }

  function deleteItem(id) {
    setListJournal([...listJournal.filter((el) => el.id !== id)]);
  }

  return (
    <UserContextProvider>
      <div className="wrapper">
        <LeftPanel>
          <Header />
          <JournalAddButton />

          <JournalList data={mapItems(listJournal)} clickItem={clickItem} />
        </LeftPanel>

        <Body>
          <JournalForm
            deleteItem={deleteItem}
            addListItem={addListItem}
            data={dataForm}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
