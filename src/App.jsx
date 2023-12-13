import './App.css';

import LeftPanel from './components/layouts/LeftPanel/LeftPanel';
import Body from './components/layouts/Body/Body';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from '@/components/JournalList/JournalList';
import JournalAddButton from '@/components/JournalAddButton/JournalAddButton';
import Header from './components/Header/Header';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user-context';

function mapItems(items) {
  if (!items) return [];

  return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [listJournal, setListJournal] = useLocalStorage();

  function addListItem(item) {
    setListJournal([
      ...mapItems(listJournal),
      { ...item, date: new Date(item.date) }
    ]);
  }

  return (
    <UserContextProvider>
      <div className="wrapper">
        <LeftPanel>
          <Header />
          <JournalAddButton />

          <JournalList data={mapItems(listJournal)} />
        </LeftPanel>

        <Body>
          <JournalForm addListItem={addListItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
