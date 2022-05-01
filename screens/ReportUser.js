import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList, Platform } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-neat-date-picker';
import { SvgUri } from "react-native-svg";
import { async } from "@firebase/util";
import DropDownPicker from 'react-native-dropdown-picker'
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase-cfg";
import { query, collection, getDocs, where,updateDoc, doc,addDoc } from "firebase/firestore";


export default function ReportUser({ navigation, route }) {



// Definition and initialisation of the all data, storing all variables using React hooks
	const [description, setDescription] = useState("");
	const [lastName, setLastName] = useState("");
	const [report, setReport] = useState("");
	const [categories, setCategories] = useState("");
	const [interests, setInterests] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const user1 = auth.currentUser.uid;

	const {uid} = route.params;

	{/*Definition of the genders*/ }
	const genders = [
		{ label: 'Nudes', value: 'Nudes' },
		{ label: 'Language', value: 'Language' },
		{ label: 'Fake Information', value: 'Fake Information' },
		{ label: 'Other', value: 'Other' },];


		//Navigation
		const loginScreen = () => {
			navigation.navigate('Home');
		}

		// Function to add document to report colelction, so later on we can see in admin app
		const sendReport = async () => {
			try {
				await addDoc(collection(db, "reports"), {
					from: user1,
					to: uid,
					reason: report,
					description: description,
				});
				loginScreen()
				alert("User has been reported")
			}
			catch (err){
				console.error(err)
			}
		}



	// Fetching UK's university through API

	const [isLoading, setLoading] = useState(true);
	const [university, setUniversity] = useState();


	// Method to parse JSON file with all the university
	// TO BE USED in the future

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState();


//field for providing description
// Categories picker
//Sends reports and navigates back to main screen
	return (

				<View style={styles.container}>




					<View style={styles.inputView}>
						<TextInput
							style={styles.TextInput}
							placeholder="Please provide a description of a problem"
							placeholderTextColor="#003f5c"
							onChangeText={firstName => setDescription(firstName)}
						/>
					</View>


					<View style={styles.inputView}>
						<RNPickerSelect
							style={pickerStyle}
							useNativeAndroidPickerStyle={true}
							placeholder={{ label: "Choose category", value: null }}
							onValueChange={(itemValue, itemIndex) => setReport(itemValue)}
							items={genders}
						/>
					</View>




					<TouchableOpacity style={styles.continue_button} onPress ={sendReport}>
						<Text>Continue</Text>
					</TouchableOpacity>


				</View>

	);
}

// Constants
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ecf0f1",
		alignItems: "center",
		justifyContent: "center",
	},

	styleAvatar: {
		width: '70%',
		height: '32%',
		marginBottom: '5%',
	},

	inputView: {
		backgroundColor: "#FFFFFF",
		borderRadius: 5,
		borderColor: "#A9A9A9",
		width: "70%",
		height: "6%",
		marginBottom: "1%",
		textAlign: "center",
	},

	TextInput: {
		height: "70%",
		flex: 1,
		padding: "5%",
		alignItems: "center"
	},

	continue_button: {
		marginTop: "5%",
		width: "40%",
		borderRadius: 25,
		height: "6%",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: '30%',
		backgroundColor: "#8E94F2",
	},

	styleDOB: {
		marginTop: '5%',
		marginLeft: '2%'
	}

});
const pickerStyle = StyleSheet.create({
	inputIOS: {
		padding: "5%",
		marginTop: '1%',
		borderRadius: 5,

	},
	inputAndroid: {
		padding: "5%",
		marginTop: '1%',
		borderRadius: 5,
		color: 'black',
	}
});
