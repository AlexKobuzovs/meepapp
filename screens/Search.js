import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RecommendationList from '../components/RecommendationList';
import { data } from '../components/users'
import { filterBySearchTerm, filterByFieldOfStudy, filterByGender, filterByDistance } from './Filter';

export default class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      distance: -1,
      fieldOfStudy: [],
      gender: []
    }
  }

  updateSearchTerm = (currentContent) => {
    this.setState({
      searchTerm: currentContent
    })
  }

  updateGender = (currentGender) => {
    this.setState({
      gender: currentGender
    })
  }

  updateFieldOfStudy = (currentFieldOfStudy) => {
    this.setState({
      fieldOfStudy: currentFieldOfStudy
    })
  }

  updateDistance = (currentDistance) => {
    this.setState({
      distance: currentDistance
    })
  }

  render() {

    let filteredUsers = filterBySearchTerm(this.state.searchTerm, data)
    filteredUsers = filterByFieldOfStudy(this.state.fieldOfStudy, filteredUsers)
    filteredUsers = filterByGender(this.state.gender, filteredUsers)
    filteredUsers = filterByDistance(this.state.distance, filteredUsers)

    return <View style={styles.container}>
      <SearchBar updateSearchTerm={this.updateSearchTerm} />
      <FilterBar updateGender={this.updateGender} updateFieldOfStudy={this.updateFieldOfStudy} updateDistance={this.updateDistance} />
      <RecommendationList users={filteredUsers} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});

