import css from './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  Section,
  ContactAddForm,
  ContactsList,
  Notification,
} from 'components';

import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';

export const App = () => {
  const firstRenderRef = useRef(true);

  const [contacts, setContacts] = useState(() => {
    const getParsedItemFromLocStor = key => {
      // function return parsed data from local storage or null

      const checkData = localStorage.getItem(key);

      return checkData ? JSON.parse(checkData) : null;
    };

    const KEY = 'contactsList';

    return getParsedItemFromLocStor(KEY);
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    // if first render, interrupt and change firstRenderRef to false
    if (firstRenderRef.current === true) {
      if (contacts)
        Notify.success(
          `Contact list successfully loaded from local storage. Quantity of contacts: ${contacts.length} `
        );
    }

    if (firstRenderRef.current === false) {
      const setStringifiedDataToLocStor = (key, data) => {
        // function update data in local storage

        const stringifiedData = JSON.stringify(data);
        localStorage.setItem(key, stringifiedData);
        return;
      };

      const KEY = 'contactsList';

      setStringifiedDataToLocStor(KEY, contacts);
    }

    return () => {
      firstRenderRef.current = false;
    };
  }, [contacts]);

  const checkAddDoubleContact = name => {
    // check empty contact

    if (!contacts) {
      return false;
    }

    // looking for new name in contacts

    const check = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    // if true, contact name is dublicate

    return check ? true : false;
  };

  const onAddFormSubmit = e => {
    e.preventDefault();

    // get refs to inputs

    const inputNameRef = e.target.elements?.name;
    const inputTelRef = e.target.elements?.tel;

    // get values of refs

    let inputNameValue = inputNameRef?.value;
    let inputTelValue = inputTelRef?.value;

    // check dublicate name

    const check = checkAddDoubleContact(inputNameValue);

    if (check) {
      Notify.failure(
        `The contact ${inputNameValue} has already been added before.`
      );
      return;
    }
    Notify.success(`The contact ${inputNameValue} successfully added.`);

    // create new contact with entered data

    const newContact = {
      name: inputNameValue,
      tel: inputTelValue,
      id: nanoid(5),
    };

    // update state

    setContacts(prev => [newContact, ...(prev ?? [])]);

    // reset filter value

    setFilter('');
    inputNameRef.value = '';
    inputTelRef.value = '';
  };

  const onDeleteBtnClick = e => {
    e.preventDefault();

    // check is e.target a button

    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    // get element id for delete

    const elemForDeleteId = e.target.getAttribute('data-delete');

    // check is element has data-delete attribute

    if (!elemForDeleteId) {
      return;
    }

    // update state without selected element

    setContacts(prev => prev.filter(item => item.id !== elemForDeleteId));

    //? if contacts.length === 1, after deleting will be 0, reset state to null

    if (contacts.length === 1) {
      setContacts(null);
    }
    Notify.success(`The contact successfully deleted.`);
  };

  const onFilterInput = e => {
    // method update filter in state
    setFilter(e.target.value);
  };

  const getContacts = () => {
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.app}>
      <Section title="Phonebook">
        <ContactAddForm onAddFormSubmit={onAddFormSubmit} />
      </Section>
      <Section title="Contacts">
        {contacts ? (
          <ContactsList
            contacts={getContacts()}
            onDeleteBtnClick={onDeleteBtnClick}
            onFilterInput={onFilterInput}
            filterValue={filter}
          />
        ) : (
          <Notification />
        )}
      </Section>
    </div>
  );
};
