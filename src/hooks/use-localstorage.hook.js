import { useState, useEffect } from 'react';

export function useLocalStorage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('data'));
    if (res) {
      setData(res);
    }
  }, []);

  const saveData = (newData) => {
    localStorage.setItem('data', JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}
