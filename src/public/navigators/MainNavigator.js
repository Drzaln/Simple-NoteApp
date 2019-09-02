import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from "react-navigation-drawer";
import Drawer from "../../component/Drawer";

import Home from '../../screens/Home'
import AddNote from "../../screens/AddNote";
import EditNote from "../../screens/EditNote";
const stackNavigator = createStackNavigator(
  {
    Home,
    AddNote,
    EditNote
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
)

const AppNavigator = createDrawerNavigator({
  stackNavigator,
}, {
      contentComponent: Drawer,
      drawerBackgroundColor: 'rgba(255,255,255,0.9)',
      overlayColor: 'rgba(0,0,0,0.7)',
      contentOptions: {
          activeTintColor: '#fff',
          activeBackgroundColor: '#6b52ae',
      }
  })

export default createAppContainer(AppNavigator)
