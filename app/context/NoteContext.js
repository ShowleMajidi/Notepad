import React, {useEffect, createContext, useState} from 'react';
import {Alert} from 'react-native';
// ToDo Database import
import { realmDb } from './../db/db';

export const NoteContext = createContext();

export const NoteProvider = props => {
  const [getNotes, setNotes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        //ToDo dataAction Sync
        await dataAction('Sync');
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const addNote = async note => {
    //ToDo dataAction Add
    await dataAction('Add', note);
    //ToDo dataAction sync
    await dataAction('Sync');
  };

  const updateNote = async (note, id) => {
    //ToDo dataAction Add
    await dataAction('Update', note, id);
    //ToDo dataAction sync
    await dataAction('Sync');
  };

  const deleteNote = async id => {
    //ToDo dataAction Add
    await dataAction('Delete', null, id);
    //ToDo dataAction sync
    await dataAction('Sync');
  };

  const dataAction = async (action, note, id) => {
    try {
      //ToDo Realm Intance
      const realm = await realmDb();

      switch (action) {
        case 'Sync':
          //ToDo find all notes
          const notes = realm.objects('Note');
          return setNotes(notes);
        case 'Add':
          //ToDo Add Note to database
          return realm.write(() => {
            realm.create('Note', note);
          });
        case 'Update':
          //ToDo update note
          return realm.write(() => {
            const dbNote = realm.objectForPrimaryKey('Note', id);
            dbNote.title = note.title;
            dbNote.content = note.content;
          });
        case 'Delete':
          //ToDo deleate note
          return realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Note', id));
          });
      }

      //ToDo realm close
      realm.close();
    } catch (err) {
      console.log(err);
      Alert.alert('Erore in Note', 'A problem is in realm ');
    }
  };

  return (
    <NoteContext.Provider value={{getNotes, addNote, updateNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
