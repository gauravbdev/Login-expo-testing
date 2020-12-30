import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.19
import { ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset';
import { ApolloProvider} from 'react-apollo';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import {signIn, signOut, getToken} from './util';
import {setContext} from 'apollo-link-context';

const AuthStack = StackNavigator({
  Register: { screen: Register, navigationOptions: { headerTitle: 'Register' } },
  Login: { screen: Login, navigationOptions: { headerTitle: 'Login' } },
});

const LoggedInStack = StackNavigator({
  Profile: { screen: Profile, navigationOptions: { headerTitle: 'Profile' } },
});

const httpLink = new HttpLink({
    uri:'http://localhost:3000/admin/graphiql'
});

const authLink = setContext(async (req,{headers})=>{
   const token = await getToken();;
   
   return{
     ...headers,
     headers: {
       authorization: token ? 'Bearer ${token}' : null,
     },
    
   }
});

const link = authLink.concat(HttpLink);

const client = new ApolloClient({
  link: 
  //new HttpLink({
    //uri:'http://localhost:3000/admin/graphiql'

  //}),
  cache = new InMemoryCache(),
})

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  async componentWillMount() {
    const token = await getToken();
    if (token){
      this.setState({
        loggedIn: true
      });
    }
  }

  handleChangeLoginState = (loggedIn = false, token) => {
    this.setState({ loggedIn });
    if (loggedIn) {
      signIn(token);
    } else {
      signOut();
    }
  };

  render() {
    return {
      <ApolloProvider client={client}>
      {this.state.loggedIn ?
        <LoggedInStack screenProps={{ changeLoginState: this.handleChangeLoginState }} /> :
      <AuthStack screenProps={{ changeLoginState: this.handleChangeLoginState }} />
  }
       
      </ApolloProvider>
    }
    return 
      
}
