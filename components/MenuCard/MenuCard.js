import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,
} from 'native-base';
import iconImg from '../../assets/icon.png';
import { avatarService } from '../../services';

export default function MenuCard({ restaurant }) {
  return (
    <Content>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: avatarService.getAvatarUrl(restaurant.name) }} />
            <Body>
              <Text>{restaurant.name}</Text>
              <Text note>April 15, 2016</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={iconImg} style={{ height: 200, width: '100%', flex: 1 }} />
            <Text>
              Blah blah blah
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: '#87838B' }}>
              <Icon name="logo-github" />
              <Text>1,926 stars</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    </Content>
  );
}

MenuCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
