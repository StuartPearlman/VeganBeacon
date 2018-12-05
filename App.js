import React, { Component } from 'react';
import {
  StyleSheet, View, BackHandler, FlatList, Text,
} from 'react-native';
import { Font } from 'expo';
import {
  Container, Header, Button, Left, Body, Title, Right,
} from 'native-base';

import { menuItemService } from './services';
import { ZipInput, MenuCard, RippleIcon } from './components';

let styles;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: '', fontLoaded: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.backHandler = this.backHandler.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({ /* eslint-disable global-require */
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    this.backHandler();
  }

  componentWillUnmount() {
    this.backHandler.remove();
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

  keyExtractor = item => item.name;

  getRestaurantsMarkup = () => {
    const { restaurants } = this.state;
    return (
      <FlatList
        data={restaurants}
        keyExtractor={this.keyExtractor}
        renderItem={
          ({ item: restaurant }) => <MenuCard key={restaurant.name} restaurant={restaurant} />
        }
      />
    );
  };

  backHandler() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack();
      return true;
    });
  }

  goBack() {
    this.setState({ restaurants: null, zip: '' });
  }

  handleInputChange(text) {
    this.setState({ zip: text.replace(/[^0-9]/g, '') });
  }

  render() {
    const { restaurants, zip, fontLoaded } = this.state;

    if (fontLoaded) {
      return (
        <Container>
          <Header>
            <Left style={{ flex: 1, marginLeft: restaurants && -40 }}>
              {
                restaurants && (
                  <Button transparent>
                    <RippleIcon name="arrow-back" color="#fff" size={40} onPress={this.goBack} />
                  </Button>
                )
              }
            </Left>
            <Body style={{ flex: 1, marginLeft: restaurants && 40 }}>
              <Title>Vegan Beacon</Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          {
            restaurants
              ? this.getRestaurantsMarkup()
              : (
                <View style={styles.container}>
                  <ZipInput name="zip" value={zip} onChangeText={this.handleInputChange} />
                  <Button primary onPress={this.getRestaurants} style={{ marginLeft: 'auto', marginRight: 'auto', padding: 10 }}>
                    <Text style={{ color: '#fff' }}> Search </Text>
                  </Button>
                </View>
              )
          }
        </Container>
      );
    }

    return null;
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
