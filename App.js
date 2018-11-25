import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { menuItemService } from './services';

export default class App extends Component {
  state = {}

  getRestaurantsMarkup = () => {
    return this.state.restaurants.map((restaurant) => {
      return <Text key={restaurant.name}>{restaurant.name}</Text>;
    });
  }

  async componentDidMount() {
    try {
      const restaurants = await menuItemService.getVenues();
      this.setState({ restaurants });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.restaurants
          ? this.getRestaurantsMarkup()
          : <Text>Loading...</Text>
        }
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
