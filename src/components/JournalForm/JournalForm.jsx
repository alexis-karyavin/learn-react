import styles from './JournalForm.module.css';

import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

import Button from '@/components/Button/Button';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import { UserContext } from '../../context/user-context';

function JournalForm({ addListItem }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    let timerId = null;

    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
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
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, addListItem, values]);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  }, [userId]);

  const savedForm = (e) => {
    e.preventDefault();

    dispatchForm({ type: 'SUBMIT' });
  };

  const onInput = (e) => {
    const { value, name } = e.target;
    dispatchForm({ type: 'SET_VALUE', payload: { [name]: value } });
  };

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  return (
    <>
      <form className={cn(styles['journal-form'])} onSubmit={savedForm}>
        {userId}
        <div className={cn(styles['journal-form__title-wrapper'])}>
          <input
            ref={titleRef}
            className={cn(
              styles['journal-form__input'],
              styles['journal-form__title'],
              { [styles['journal-form__input--invalid']]: !isValid.title }
            )}
            value={values.title}
            type="text"
            name="title"
            placeholder="Название статьи"
            onInput={onInput}
          />

          <ButtonDelete />
        </div>

        <input
          ref={dateRef}
          className={cn(
            styles['journal-form__input'],
            styles['journal-form__date'],
            { [styles['journal-form__input--invalid']]: !isValid.date }
          )}
          value={values.date}
          type="date"
          name="date"
          onInput={onInput}
        />
        <textarea
          ref={textRef}
          className={cn(
            styles['journal-form__input'],
            styles['journal-form__post'],
            { [styles['journal-form__input--invalid']]: !isValid.text }
          )}
          value={values.text}
          name="text"
          onInput={onInput}
        ></textarea>
        <Button text={'Сохранить'}></Button>
      </form>
    </>
  );
}

export default JournalForm;
