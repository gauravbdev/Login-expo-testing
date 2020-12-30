import React from 'react';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
    };
  }

  handleInputChange = (field, value) => {
    const newState = {
      ...this.state,
      [field]: value,
    };
    this.setState(newState);
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    if (email.length === 0) {
      return this.setState({ emailError: true });
    }
    this.setState({ emailError: false });

    if (password.length === 0) {
      return this.setState({ passwordError: true });
    }
    this.setState({ passwordError: false });

    //return this.props.screenProps.changeLoginState(true);
    this.props
    .login(email, password)
    .then(({data}) => {
      return this.props.screenProps.changeLoginState(true, data.logoin.token)
    })
    .catch( e=>{
      if (/email/i.test(e.message) {
        this.setState({emailError: true});
      })
      if (/password/i.test(e.message)) {
        this.setState({passwordError:true})
      }
    });  
  };

  render() {
    const { emailError, passwordError } = this.state;

    return (
      <Container>
        <Content>
          <Form>
            <Item error={emailError}>
              <Input
                placeholder="Email"
                onChangeText={value => this.handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item error={passwordError}>
              <Input
                placeholder="Password"
                onChangeText={value => this.handleInputChange('password', value)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>
          </Form>
          <Button full onPress={this.handleSubmit}>
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default graphql(
  gql`
  mutation authenticateUserWithPassword($email: String!, $password: String!){
    authenticateUserWithPassword(email: $email, password: $password) {
      email
      token
    }
    `,
    {
      props: ({mutate}) =>({
        authenticateUserWithPassword:(email, password) => mutate({ variables: {email, password}}),
      });
    }
  }(login);
