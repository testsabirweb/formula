import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'
import { setFilters } from '../store/actions/meals';

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={props.state}
        onValueChange={props.onStateChange}
      />
    </View>
  )
}

const FiltersScreen = props => {
  const { navigation } = props

  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)

  const dispatch = useDispatch()

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }
    dispatch(setFilters(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filters!!!</Text>
      <FilterSwitch
        label='Gluten-Free'
        state={isGlutenFree}
        onStateChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label='Lactose-Free'
        state={isLactoseFree}
        onStateChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label='Vegan'
        state={isVegan}
        onStateChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label='Vegetarian'
        state={isVegetarian}
        onStateChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};


FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filters',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName='ios-menu'
        onPress={() => {
          navData.navigation.toggleDrawer()
        }}
      />
    </HeaderButtons>,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Save'
        //iconName='ios-menu'
        onPress={navData.navigation.getParam('save')}
      />
    </HeaderButtons>
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '80%',
    marginVertical: 15
  }
});

export default FiltersScreen;
