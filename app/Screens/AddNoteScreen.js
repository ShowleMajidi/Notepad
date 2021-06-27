import React, {useState, useContext} from 'react';
import shortId from 'shortid';
import {StyleSheet} from 'react-native';
import {Button, Textarea, Form, Item, Input, Label, Text} from 'native-base';
import Layout from '../Components/Layout';
import { NoteContext } from './../context/NoteContext';
import { strings } from '../locale/i18n';

const AddNoteScreen = props => {
  const [getTitle, setTitle] = useState('');
  const [getContent, setContent] = useState('');
  const context = useContext(NoteContext);

  const saveNote = () => {
    const note = {
      _id: shortId.generate(),
      title: getTitle,
      content: getContent,
    };

    context.addNote(note);
    props.navigation.navigate('Home');
  };
  return (
    <Layout
      title={strings('addHeaderTitle')}
      footer={
        <>
          <Button full onPress={saveNote}>
            <Text>{strings('saveNote-btn')}</Text>
          </Button>
          <Button full onPress={() => props.navigation.navigate('Home')}>
            <Text>{strings('cancel-btn')}</Text>
          </Button>
        </>
      }>
      <Form style={styles.container}>
        <Item>
          <Label>{strings('titleInput')}</Label>
          <Input value={getTitle} onChangeText={title => setTitle(title)} />
        </Item>
        <Textarea
          style={styles.container}
          value={getContent}
          onChangeText={content => setContent(content)}
          bordered
          placeholder={strings('contentInput')}
        />
      </Form>
    </Layout>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
