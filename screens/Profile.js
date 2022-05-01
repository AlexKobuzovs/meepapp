import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Avatar } from 'react-native-elements';


// Profile screen of the user with the main information
export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
      <Avatar
          rounded
          title={nameToInitials(userToDisplay.name)}
          size="xlarge"
          source={{
              uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        /> 
        <Text style={styles.heading}>
          {userToDisplay.name}, {userToDisplay.age}{userToDisplay.gender}
        </Text>
        <Text style={styles.paragraph}>
          "{userToDisplay.description}"
        </Text>
      </View>
      <View style={styles.columns}>
        <View style={styles.interestContainer}> 
          <Text style={styles.heading}>
            Categories
          </Text>
          <Text style={styles.paragraph}>
            {userToDisplay.categories}
          </Text>
        </View>
        <View style={styles.interestContainer}> 
          <Text style={styles.heading}>
            Interests
          </Text>
          <Text style={styles.paragraph}>
            {userToDisplay.interests}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Definiton of the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    /* paddingTop: Constants.statusBarHeight, error with this being 0 right now*/
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  columns: {
    flex: 3,
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  interestContainer: {

  },
  heading: {
    margin: 24,
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

const userToDisplay = {
  name: 'Jane Svenson',
  age: '21',
  gender: "F",
  university: 'University of Aberdeen',
  categories: ['Music'],
  interests: ['Zoology', 'Guitar', 'Rock Music', 'Jam Sessions'],
  id: 1,
  description: "Description here"
}

function nameToInitials(name) {
const words = name.split(' ')
return `${words[0][0]}${words[1][0]}`
}