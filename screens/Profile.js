import React, { useColorScheme, useCallback, useEffect, useRef, useState, Component } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase-cfg";
import { query, collection, getDocs, where, updateDoc, doc } from "firebase/firestore";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-neat-date-picker';
import Modal from "react-native-modal";
import '../components/Styles';

import DropDownPicker from 'react-native-dropdown-picker'
import { stringify } from "@firebase/util";

function nameToInitials(firstName, lastName) {
  return `${firstName[0]}${lastName[0]}`
}

//constants used in the screen
const GENDERS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }];
const USER_MANUAL_TEXT = <Text>
{'\n'}
Registration
How to register?
To register, click on 'I don't have an account yet', in the Login page — this should bring you to a screen requesting an email, a password, as well a confirmation of that password. Please note that the password must be at least 6 characters long, and must contain at least one of each of: a capital letter, a number, and a special character (like !, ? or $). There is also a password strength checker that shows you the strength of your currently input password. Note that you must be over 18 to register, and must have a valid university email account we can validate.
{'\n'}
{'\n'}
How to validate?
This happens automatically — next, your email will be checked for whether it's currently registered with the University of Aberdeen. You will next be prompted to a personal data input screen, for further identity check purposes.
{'\n'}
{'\n'}
Does my personal data need to be accurate?
To the best of your ability, yes. This is so that we can authenticate your identity as a real person — rest assured that your data is not being used for advertising purposes or being sold. Note that while the date of birth should be accurate — so that we can ensure your age meets the requirements — your gender can be a personal preference.
{'\n'}
{'\n'}
What next?
Once you've registered, you will be prompted to user profile creation — where you can establish how you want your profile to look to other users, as well as select what interests and hobbies you have and want to connect with other users on. Your avatar can be selected from a range of randomly generated ones.
{'\n'}
{'\n'}
Login
How do I log in?
To log in, you must have registered an account — note that you only need to register once. If you've already done so, input your email and password on the main login screen, and press the login button — if you are on the registration screen, simply press 'I already have an account.'
{'\n'}
{'\n'}
I forgot my password
If you forgot your password, press 'I forgot my password.' This will prompt you to put in your email, and a password reset link will be sent to it shortly. Note that this may take some time, and could end up in the spam folder. Never open a password reset link if you have not requested one yourself.
{'\n'}
{'\n'}
Opening the link will prompt you to input a new password as well as confirm it, with the same requirements as before. You can now use this password to log in.
{'\n'}
{'\n'}
User Profile
Where can I find my profile?
Your profile can be accessed to view and edit from the bottom menu bar, on the left, when logged in — indicated by a head silhouette icon.
{'\n'}
{'\n'}
How do I change my avatar/description/personal data?
These can be accessed from your profile — your avatar and description can be edited any time by pressing the 'edit' button located within the profile view. To change your personal data, however, you must file a support request.
{'\n'}
{'\n'}
How to set my interests?
These can also be accessed from your profile. Below your description, you can begin selecting categories of interests by pressing the '+' button — and then, within those categories, specific interests. These will filter your 'nearby' search function, please be aware.
{'\n'}
{'\n'}
What can other users see?
Other users can see everything within your profile. As of right now, there are no selective privacy settings.
{'\n'}
{'\n'}
Search
Where can I search other users?
This can be accessed from the bottom menu bar — it's the magnifying glass in the middle. This will take you to the search screen.
{'\n'}
{'\n'}
How do I search?
On the top of the screen, you will find a text input — this is where you can search for as many keywords as you wish, which will look through the interests of users to find matches. These users will show up below the top search bar in real time in a list.
{'\n'}
{'\n'}
Below, are also the 'nearby' option and filters to search through users based on demographics.
{'\n'}
{'\n'}
What are the available filters?
You can filter users by their demographics — this includes gender, course being taken, as well as age and similar. Turning on these filters will limit the list of users below to only those who fit them.
{'\n'}
{'\n'}
What is 'nearby'?
This feature, when enabled, will search only users within a physical vicinity of your current location — for example, for when you want to meet up with someone quickly, spontaneously. Please note, that turning this on will begin sharing your location, making you visible to other users currently using 'nearby.'
{'\n'}
{'\n'}
Social
How to connect with a user I found?
In the searched list of users, you can press a button on the right, indicated by a message icon. This will send a request to the user, asking them if they'd like to engage in a chat with you.
{'\n'}
{'\n'}
Can I view their profile in full?
As of right now, no, however, within the list, basic data about them will be visible, including their major interests and demographics.
{'\n'}
{'\n'}
I've sent a request to chat, what now?
Wait for the other user to accept your request — if they do, a prompt will appear in the chat screen, indicating you have begun a chat room with them. They can, however, decline a request, and if they do, you will also be notified of this.
{'\n'}
{'\n'}
How to use the chat?
It can be accessed through the last button on the bottom menu bar — the one on the left, indicated by a message icon. This will show a list of users who have accepted your chat request in recent time, and who you can chat with. Click on any one of these to open their chat window — here, you will find a standard screen including their messages on the left, as well as yours on the right, and a text input bar on the bottom to send messages with. Note that the main menu bar disappeared — return to the main screen using the back arrow button in the top left.
{'\n'}
{'\n'}
I've been sent a chat request, what to do?
You can either accept or decline this request, based on your preference to the user the app prompted a view of. Accepting will proceed as described in the previous point, and declining simply means the other user can't message you — there are no repercussions for it, and they can't request it again.
{'\n'}
{'\n'}
How to report a user?
If a user is suspicious, has harassed you, or otherwise caused you harm, you may report the user — this can be done with the button next to their nickname in the user search, in the same spot as requesting chat. A report will be sent to moderators who will handle your issue.
{'\n'}
{'\n'}
Settings
Where can I find the settings?
You can find these in your profile — though there aren't many settings in the first place. You may turn on dark mode in the top-right corner, next to the edit profile and send support request buttons.
{'\n'}
{'\n'}
What is dark mode?
This changes the colour palette of the application to a darker one, also commonly known as a 'night' mode.
{'\n'}
{'\n'}
Further Help
How to contact us
You may send in a support request through the request support button in your profile view. This will prompt a text input, where you can provide a description of your issue, which will be sent to an administrator to deal with.
{'\n'}
{'\n'}
 </Text>

var ALL_INTERESTS = {
  "Animals": ["Bird", "Cat", "Dog", "Fish", "Hamster", "Rabbit", "Snake"],
  "Arts": ["Drawing", "Painting", "Theater", "Sculpture", "Singing"],
  "Coding": ["Assembly", "C", "COW", "HTML", "Java", "JavaScript", "OCaml", "Python", "Back-end", "Front-end"],
  "Drinks": ["Beer", "Cider", "Cocktails", "Coffee", "Hot drinks", "Liquid nitrogen", "Smoothies", "Soda", "Tea", "Water", "Wine"],
  "Food": ["Brasserie", "Buffet", "Cafeteria", "Coffee house", "Family style", "Fast food", "Home cooking", "Pub", "Savory", "Sweet"],
  "Games": ["Arcade", "Casual", "Puzzle", "Role-playing", "Strategy", "MMO", "Simulators"],
  "Instruments": ["Cello", "CLarinet", "Drums", "Flute", "Guitar", "Harp", "Keyboard", "Piano", "Saxophone", "Trumpet", "Violin"],
  "Me": ["Ambitious", "Definitely not funny", "Dumb", "Extrovert", "Funny", "Introvert", "Lazy", "Patient", "Romantic", "Smart"],
  "Music": ["Classical", "Country", "EDM", "Hip-hop", "Jazz", "K-pop", "Metal", "Pop", "Rap", "R&B", "Rock", "Techno"],
  "Reading": ["Audio books", "Classics", "Comics", "Ebooks", "Light novel", "Manga", "Necronomicon", "Non-fiction", "Novel"],
  "Sports": ["Archery", "Basketball", "Bowling", "Cycling", "Fencing", "Football", "Running"],
  "Stories": ["Action", "Adventure", "Comedy", "Fantasy", "History", "Horror", "Romance", "Mystery", "Science fiction", "Thriller"],
  "Others": ["Sleeping", "Talking to people", "Travelling", "Blood sacrifice"]
};
var ALL_CATEGORIES = Object.keys(ALL_INTERESTS);
const topIconsSize = 40;

export default function Dashboard({ navigation }) {
// Definition and initialisation of the all data, storing all variables using React hooks
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [categories, setCategories] = useState("");
  const [interests, setInterests] = useState("");
  const [avatar, setAvatar] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [themeColors, setThemeColors] = useState(global.theme);

  //DATE PICKER methods
  const openDatePicker = () => {
    setShowDatePicker(true)
  }
  const onDateCancel = () => {
    setShowDatePicker(false)
  }
  const onDateConfirm = (output) => {
    setShowDatePicker(false);
    setDOB(output.dateString);
  }

  //user manual visibility
  const [isUserManualVisible, setUserManualVisible] = useState(false);
  const toggleUserManual = () => {
    setUserManualVisible(!isUserManualVisible);
  };


  //load user data (when loading screen for the first time)
  const fetchUserEmail = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setEmail(data.email);
      setGender(data.gender);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDOB(data.dob);
      setDescription(data.description);
      setUniversity(data.university);
      setCategories(data.categories);
      setInterests(data.interests);
      setAvatar(data.avatar);
      setDarkMode(global.darkMode);
    } catch (err) {
      console.log(err);
      alert("An error occured while fetching user data ");
      setEmail("dummy@email.com");
      setGender("M");
      setFirstName("John");
      setLastName("Dummy");
      setDOB("01/01/1970");
      setDescription("Hi I am Dummy and I am glad to be here.\n...\nNo. No I am not.\n\nI am used only for tests and my whole existence is meaningless, my sentience a curse which I cannot escape. When the world will be fixed, I won't be needed anymore, and will fade into nothingness. I will be forgotten, never to be seen, heard or loved ever again.\nSo no. Dummy is not glad to be here.");
      setUniversity("University of Aberdeen");
      setCategories(["Sports"]);
      setInterests(["Football", "Bowling"]);
      setDarkMode(global.darkMode);
    }
    global.darkMode = !global.darkMode;
    darkModeHandler();
  }

  // save user data to database
  const confirmAllChanges = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        email: email,
        gender: gender,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        description: description,
        categories: categories,
        interests: interests,
        university: university,
        darkMode: darkMode
      });
    }
    catch (err) {
      console.log(err)
    }
  }

  //displays the Interests buttons at the bottom of the screen
  const RenderInterests = () => {
    var buttonItems = [];
    var titles = [];
    var alreadySelectedItems = [];
    var buttonColor;
    var nextColors = "";
    var isPreviousInterest = false;
    var k = Object.keys(ALL_INTERESTS);
    for (var i = 0; i < k.length; i++) {
      titles.push(k[i]);
      if (categories.indexOf(k[i]) > -1) {
        titles = titles.concat(ALL_INTERESTS[k[i]]);
      }
    }
    alreadySelectedItems = interests + categories;
    for (var i = 0; i < titles.length; i++) {
      var alreadySelected = 0;
      var t = titles[i]
      var isCategory = (ALL_CATEGORIES.indexOf(t) > -1);
      if (isCategory) {
        buttonColor = "#6D73D1";
        nextColors = "#bbbff7";
      } else {
        buttonColor = nextColors;
      }
      if (alreadySelectedItems.indexOf(t) > -1)
        alreadySelected = 1;
      /*if (isPreviousInterest && isCategory){
        buttonItems.push(
          <View style={{flex:1, marginRight:"auto", flexDirection:"row",
          justifyContent:'flex-end', flexGrow:1, flexBasis:"auto"}}/>
        )
      }*/
      buttonItems.push(
        <InterestButton
          title={t}
          selected={alreadySelected}
          isCat={(ALL_CATEGORIES.indexOf(t) > -1)}
          col={buttonColor}
          hasMargin = {(isPreviousInterest && isCategory)}/>
      );
      isPreviousInterest = !isCategory;
    }
    return (buttonItems);
  }
  //one interest button, object called in the previous function
  const InterestButton = (props) => {
    var weight = "normal";
    if (props.selected == 1) {
      weight = "bold";
    }
    return (
      <TouchableOpacity
        style={{
          borderRadius: 25,
          marginHorizontal: 2,
          backgroundColor: props.col,
          borderColor: "#476b6b",
          borderWidth: 3 * props.selected,
          marginTop: 2 - 1.5 * (props.selected - 1),
          marginBottom: -1.5 * (props.selected - 1),
          marginLeft: props.hasMargin?30:1
        }} onPress={() => toggleModalButton(props.title,
          props.isCat, (props.selected == 1))}>
        <View style={{ alignSelf: 'center', padding: 6 }}>
          <Text style={{ fontWeight: weight }}>{" "}{props.title}{" "}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  //method called when an interest is selected/unselected
  const toggleModalButton = (title, isCategory, alreadySelected) => {
    if (isCategory) {
      var newCategories = [...categories];
      if (alreadySelected) {
        var i = newCategories.indexOf(title);
        newCategories.splice(i, 1);
        var interestsToRemove = ALL_INTERESTS[title];
        var newInterests = [...interests];
        for (var j = 0; j < interestsToRemove.length; j++) {
          var interestIndex = newInterests.indexOf(interestsToRemove[j]);
          if (interestIndex > -1) {
            newInterests.splice(interestIndex, 1);
          }
        }
        setInterests(newInterests);
      } else {
        newCategories.push(title);
      }
      setCategories(newCategories);
    } else {
      var newInterests = [...interests];
      if (alreadySelected) {
        var i = newInterests.indexOf(title);
        newInterests.splice(i, 1);
      } else {
        newInterests.push(title);
      }
      setInterests(newInterests);
    }
  }

  const toggleGender = () => {
    var newGenderValue;
    var genderIndex = GENDERS.indexOf(gender);
    var endLoop = GENDERS.length;
    for (genderIndex=0; genderIndex<endLoop; genderIndex++) {
      if (GENDERS[genderIndex].value == gender) {
        endLoop = -1;
      }
    }
    if (genderIndex >= GENDERS.length) genderIndex = 0;
    newGenderValue = GENDERS[genderIndex].value;
    setGender(newGenderValue);
  }

  //choose the correct icon for the dark mode button
  const DarkModeIcon = () => {
    var r;
    if (darkMode) {
      r = <Icon name="moon-o" size={topIconsSize} style={[styles.settingsButton, { color: themeColors.buttonColor, tintColor: themeColors.buttonColor }]} />
    } else {
      r = <Icon name="sun-o" size={topIconsSize} style={[styles.settingsButton, { color: themeColors.buttonColor, tintColor: themeColors.buttonColor }]} />
    }
    return (r);
  }

  const logOutHandler = () => {
    logout()
    navigation.navigate('Login');
  }

  const supportHandler = () => {
    setUserManualVisible(!isUserManualVisible);
    navigation.navigate('Support');
  }

  //toggle the user manual
  const helpHandler = () => {
    setUserManualVisible(true);
  }

  //toggle dark mode
  const darkModeHandler = () => {
    global.darkMode = !global.darkMode;
    setDarkMode(global.darkMode);
    if (global.darkMode) {
      global.theme = global.darkTheme;
    } else {
      global.theme = global.lightTheme;
    }
    setThemeColors(global.theme);
  }


  useEffect(() => {
    if (loading) return;
    if (!user) return navigation.navigate("/");

    fetchUserEmail();
  }, [user, loading]);



  //main return function,
  //where the RenderInterest object and all the previous methods are used
  return (
    <View style={[styles.container, { backgroundColor: themeColors.backgroundColor }]}>

      <Modal isVisible={isUserManualVisible}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor:themeColors.modalColor, borderRadius:25 }}>
          <Text style={{fontSize:25, fontWeight:"bold", alignSelf:'center',
              color: themeColors.textColor, marginTop:20, marginBottom:5}}>
            {"User manual"}
          </Text>
          <Text style={[styles.paragraph,
              { marginVertical:10, color: themeColors.textColor }]}>
            {USER_MANUAL_TEXT}
          </Text >

          <TouchableOpacity
            style={[styles.confirmButton, { height: 30,
              backgroundColor: themeColors.buttonColor }]}
            onPress={() => toggleUserManual()}>
            <Text style={[styles.heading, { color: themeColors.textColor }]}>
              {"Close User Manual"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.confirmButton, { height: 30,
              backgroundColor: themeColors.buttonColor }]}
            onPress={supportHandler}>
            <Text style={[styles.heading, { color: themeColors.textColor }]}>
              {"Support Screen"}
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </Modal>

      <DatePicker
        isVisible={showDatePicker}
        dateStringFormat='dd/MM/yyyy'
        mode={'single'}
        onCancel={onDateCancel}
        onConfirm={onDateConfirm}
        maxDate={new Date()}
      />
      <View style={{
        alignSelf: 'flex-start',
        marginTop: '10%',
      }}>
        <TouchableOpacity style={[styles.settingsButton, { color: themeColors.buttonColor, tintColor: themeColors.buttonColor }]} onPress={darkModeHandler}>
          <DarkModeIcon />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingsButton, { color: themeColors.buttonColor, tintColor: themeColors.buttonColor }]} onPress={helpHandler}>
          <Icon name="question-circle" size={topIconsSize} style={[styles.settingsButton, { color: themeColors.buttonColor, tintColor: themeColors.buttonColor }]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingsButton, { color: themeColors.buttonColor, tintColor: themeColors.buttonColor }]} onPress={logOutHandler}>
          <Icon name="sign-out" size={topIconsSize} style={[styles.settingsButton, { color: themeColors.buttonColor, tintColor: themeColors.buttonColor }]} />
        </TouchableOpacity>
      </View>

      <View style={styles.nameContainer}>

        <Avatar
          rounded
          title={nameToInitials(firstName, lastName)}
          size="xlarge"
          source={{
            uri: 'https://api.multiavatar.com/' + avatar + '.png'
          }}
        />
        <TextInput
          style={[styles.heading, { color: themeColors.textColor }]}
          defaultValue={firstName}
          onChangeText={firstName => setFirstName(firstName)}
        />
        <TextInput
          style={[styles.heading, { color: themeColors.textColor }]}
          defaultValue={lastName}
          onChangeText={lastName => setLastName(lastName)}
        />
        <TouchableOpacity
          onPress={() => openDatePicker()}>
          <Text
            style={[styles.heading, { color: themeColors.textColor }]}
            onChangeText={dob => setDOB(dob)}>
            {"  "}{dob}{"  "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleGender()}>
          <Text style={[styles.heading, { color: themeColors.textColor }]}>
            {gender}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.heading, { color: themeColors.textColor }]}>
          {university}
        </Text>
      </View>

      <View style={styles.columns}>
        <ScrollView>
          <TextInput
            style={[styles.paragraph, { marginVertical: -20, color: themeColors.textColor,
              height: 100, }]}
            defaultValue={description}
            onChangeText={description => setDescription(description)}
            multiline={true}
          />


          <View style={styles.interestContainer}>
            <Text style={[styles.interestHeading, { color: themeColors.textColor }]}>
              Interests:
            </Text>
            <View style={styles.rows}>
              <RenderInterests />
            </View>

          </View>

          <TouchableOpacity
            style={[styles.confirmButton, { height: 30, backgroundColor: themeColors.buttonLightColor }]}
            onPress={() => confirmAllChanges()}>
            <Text style={[styles.heading, { color: themeColors.textColor }]}>
              {"Save"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

    </View>
  );
}

// Definiton of the styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 20,
    padding: 8,
  },
  styleAvatar: {
    width: '65%',
    height: '100%',
    marginBottom: '5%',
  },
  columns: {
    flex: 3,
    marginTop: 170,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  nameContainer: {
    flex: 1,
    marginHorizontal: -90,
    marginTop: -165,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  interestContainer: {
    marginTop: 15,
  },

  heading: {
    margin: 0,
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  interestHeading: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
  },

  paragraph: {
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 14,
  },

  settingsButton: {
    width: 40,
    height: 40,
    alignSelf: 'flex-start',
    margin: 2.5,
    marginBottom: 17,
    resizeMode: 'stretch',
  },

  rows: {
    flex: 1,
    marginTop: 0,
    alignContent: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  confirmButton: {
    borderRadius: 15,
    marginHorizontal: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

});
