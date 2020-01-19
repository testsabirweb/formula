import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'//it is different form 'HeaderButton' which is used in HeaderButton.js
import { useSelector, useDispatch } from 'react-redux';

import DefaultText from '../components/DefaultText'
import HeaderButton from '../components/HeaderButton'
import { toggleFavorite } from '../store/actions/meals';

const MealDetailScreen = props => {
  const availableMeals = useSelector((state) => {
    return state.meals.meals
  })

  const mealId = props.navigation.getParam('mealId');
  const isCurrentMealFavorite = useSelector((state) => {
    return state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  })
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch()

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
  }, [toggleFavoriteHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: isCurrentMealFavorite })
  }, [isCurrentMealFavorite])

  //////this approach has some issuse: it first render the component 
  //////and then pass mealTitle to the component therefore title of meal
  //////appear after rendering another way is to pass mealTitle in 
  //////MealsList itself. see n7 05 03:10
  // useEffect(() => {
  //   props.navigation.setParams({
  //     mealTitle: selectedMeal.title
  //   })
  // }, [selectedMeal])

  const RecepieItem = (props) => {
    return (
      <View style={styles.recepieItem}>
        <DefaultText>{props.children}</DefaultText>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <RecepieItem key={ingredient} >{ingredient}</RecepieItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <RecepieItem key={step} >{step}</RecepieItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const toggleFavorite = navigationData.navigation.getParam('toggleFav')
  const isFavorite = navigationData.navigation.getParam('isFav')
  return {
    headerTitle: mealTitle,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
      <Item
        title="Favorite"
        iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
        onPress={toggleFavorite} />
    </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: "center",
    backgroundColor:'#ccebff',
    borderRadius:20,
    elevation:5,
    margin:20,
    padding:5
  },
  recepieItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
