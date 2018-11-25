import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { menuItemService } from './services';

let styles;

export default class App extends Component {
    state = {};

    async componentDidMount() {
      try {
        const restaurants = await menuItemService.getVenues();
        this.setState({ restaurants });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }

    getRestaurantsMarkup = () => {
      const { restaurants } = this.state;
      return restaurants.map(restaurant => <Text key={restaurant.name}>{restaurant.name}</Text>);
    };

    render() {
      const { restaurants } = this.state;

      return (
        <View style={styles.container}>
          {restaurants
            ? this.getRestaurantsMarkup()
            : <Text>Loading...</Text>
          }
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
