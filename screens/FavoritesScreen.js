import React from 'react';
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText';


const FavoritesScreen = props => {
  const favMeals = useSelector((state) => {
    return state.meals.favoriteMeals
  })

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.noFav}>
        <DefaultText>No favorites found!!! start adding some</DefaultText>
      </View>
    )
  }

  return (
    <MealList listData={favMeals} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Favorites',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName='ios-menu'
        onPress={() => {
          navData.navigation.toggleDrawer()
        }}
      />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  noFav: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default FavoritesScreen;
