import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

let styles;

export default class ZipInput extends Component {
  state = { text: 'ZIP Code' };

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput value={text} />
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
