import React from 'react';
import {View} from 'react-native';
import { Container, Text, Button, Content } from 'native-base';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Logout extends React.Component {
  handleLogout = () => {
    return this.props.screenProps.changeLoginState(false);
  };

  render() {
    const {authenticatedUser} = this.props.data; 
    return (
      <Container>
        <Content>
        {authenticatedUser &&
          <View>
           <Text>{authenticatedUser._id}</Text>
           <Text>{authenticatedUser.email}</Text>
          </View>
        }
          <Button full onPress={this.handleLogout}>
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default graphql{
  gql`
  query User{
    authenticatedUser {
      email
    }
  }
  `
}(Logout);
