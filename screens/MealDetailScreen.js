import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'//it is different form 'HeaderButton' which is used in HeaderButton.js

import { MEALS } from '../data/dummy-data';
import DefaultText from '../components/DefaultText'
import HeaderButton from '../components/HeaderButton'

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);

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
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
      <Item title="Favorite" iconName="ios-star-outline" onPress={() => {
        console.log('mark as favorite')
      }} />
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
    textAlign: "center"
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
