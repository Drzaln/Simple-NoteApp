import React, { Component } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/public/redux/store'
import MainNavigator from './src/public/navigators/MainNavigator'

export default class App extends Component {
  render () {
    return (
      <StoreProvider store={store}>
        <MainNavigator />
      </StoreProvider>
    )
  }
}
