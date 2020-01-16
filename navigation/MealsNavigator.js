import React from 'react'
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const defaultStackNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
}

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOption
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOption
  }
)

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.primaryColor,//works only when shifting :true
      tabBarLabel: Platform === 'android' ?
        <Text
          style={{ fontFamily: 'open-sans-bold' }}
        >Meals</Text> : 'Meals'
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: 'Favorites!',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star-outline' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: Platform === 'android' ?
        <Text
          style={{ fontFamily: 'open-sans-bold' }}
        >Favorites</Text> : 'Favorites'
    }
  }
}

const MealsFavTabNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(
    tabScreenConfig,
    {
      activeColor: 'white',
      shifting: true,
      barStyle: {
        backgroundColor: Colors.primaryColor
      }
    })
  : createBottomTabNavigator(
    tabScreenConfig,
    {
      tabBarOptions: {
        labelStyle: {
          fontFamily: 'open-sans'
        },
        activeTintColor: Colors.accentColor
      }
    })

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOption
  }
)

const MainNavigator = createDrawerNavigator({
  MealsFav: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
      }
    }
  }
)

export default createAppContainer(MainNavigator);
