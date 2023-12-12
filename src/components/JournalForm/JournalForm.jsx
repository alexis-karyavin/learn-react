import { useEffect, useReducer } from 'react';
import styles from './JournalForm.module.css';
import Button from '@/components/Button/Button';
import cn from 'classnames';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ addListItem }) {
  // const [formValidateState, setFormValidateState] = useState(INITIAL_STATE);
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId = null;
    if (!isValid.date || !isValid.text || !isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      addListItem(values);
    }
  }, [addListItem, isFormReadyToSubmit, values]);

  const savedForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    dispatchForm({ type: 'SUBMIT', payload: formProps });

    addListItem(formProps);
  };

  return (
    <>
      <form className={cn(styles['journal-form'])} onSubmit={savedForm}>
        <div className={cn(styles['journal-form__title-wrapper'])}>
          <input
            className={cn(
              styles['journal-form__input'],
              styles['journal-form__title']
            )}
            type="text"
            name="title"
            placeholder="Название статьи"
          />

          <ButtonDelete />
        </div>

        <input
          className={cn(
            styles['journal-form__input'],
            styles['journal-form__date']
          )}
          type="date"
          name="date"
        />
        <textarea
          className={cn(
            styles['journal-form__input'],
            styles['journal-form__post']
          )}
          name="post"
        ></textarea>
        <Button text={'Сохранить'}></Button>
      </form>
    </>
  );
}

export default JournalForm;
