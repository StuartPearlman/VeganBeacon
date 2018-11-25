import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class ZipInput extends Component {
  state = { text: 'ZIP Code' }

  render() {
    return (
      <View style={styles.container}>
        <TextInput value={this.state.text} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
