import SelectUser from '../SelectUser/SelectUser';

function Header() {
  return (
    <>
      <h2 className="left-panel__header">Персональный журнал</h2>
      <SelectUser />
    </>
  );
}

export default Header;
