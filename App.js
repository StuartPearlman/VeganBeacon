import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

import { menuItemService } from './services';
import { ZipInput } from './components';

let styles;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
  }

  async getRestaurants() {
    try {
      const { zip } = this.state;
      const restaurants = await menuItemService.getVenues(zip);
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

  handleInputChange(text) {
    this.setState({ zip: text.replace(/[^0-9]/g, '') });
  }

  render() {
    const { restaurants, zip } = this.state;

    return (
      <View style={styles.container}>
        {restaurants
          ? this.getRestaurantsMarkup()
          : (
            <View style={styles.container}>
              <ZipInput name="zip" value={zip} onChangeText={this.handleInputChange} />
              <Button
                style={styles.container}
                onPress={this.getRestaurants}
                title="Search"
              />
            </View>
          )
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
