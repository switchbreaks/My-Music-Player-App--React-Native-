import React, { useState } from "react";
import Loding from "../Loding";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Pressable, TouchableOpacity, Share, Modal, Image } from "react-native";
const screenHeight = Dimensions.get('screen').height - 170;
import ReadMoreIcn from "react-native-vector-icons/Octicons";
import EmailLogo from "react-native-vector-icons/Entypo";
import HelpIcon from "react-native-vector-icons/Entypo";
import Shre from "react-native-vector-icons/Entypo";
import DOB from "react-native-vector-icons/Fontisto";
import BookMark from "react-native-vector-icons/Ionicons";
import Notifaction from "react-native-vector-icons/MaterialIcons";
import Pen from "react-native-vector-icons/MaterialIcons";
import Aboute from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { responsiveHeight } from "react-native-responsive-dimensions";
// importing font family
import { useFonts, OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { Roboto_500Medium, Roboto_400Regular, } from "@expo-google-fonts/roboto";


//  Main Function Program
const User = () => {
    // Aboute Apps Hooks
    const [modalVisible, setModalVisible] = useState(false);
    let [fontsLoaded] = useFonts({
        OpenSans_600SemiBold,
        Roboto_500Medium,
        Roboto_400Regular,
    });
    // Shere button code 
    const shreApp = async () => {
        try {
            const result = await Share.share({
                message:
                    'exp://192.168.1.3:19000',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    if (!fontsLoaded) {
        return (<><Loding /></>);
    } else {
        return (
            <SafeAreaView>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#4c669f', '#3b5998', '#192f6a']} style={{ height: responsiveHeight(100) }}>
                    {/*  User related content */}
                    <View style={profile.topView}>
                        <TouchableOpacity><ReadMoreIcn name="person" style={profile.profileLogo} /></TouchableOpacity>
                        <Text style={{ fontSize: 19, fontWeight: '500', color: "#fff" }}>Adarsh Mishra</Text>
                        <Text style={{ color: '#eee', fontFamily: 'OpenSans_600SemiBold' }}>adahmishra.6391</Text>
                    </View>
                    <View>
                        <View style={profile.userData}>
                            <TouchableOpacity style={profile.logoandMatter}>
                                <EmailLogo name="email" style={profile.setLogoStyle} />
                                <Text style={profile.textData}>amishra.6391@gmail.com</Text>
                            </TouchableOpacity>

                            <View style={[profile.logoandMatter, { justifyContent: 'space-between' }]}>
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }} onPress={() => alert("Bio")}>
                                    <DOB name="date" style={profile.setLogoStyle} />
                                    <Text style={profile.textData}>Bio</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert("Pen")}>
                                    <Pen name="edit" style={[profile.setLogoStyle, { color: 'green' }]} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={profile.logoandMatter}>
                                <BookMark name="bookmarks" style={profile.setLogoStyle} />
                                <Text style={profile.textData}>Like Song</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={profile.logoandMatter}>
                                <Notifaction name="notifications" style={profile.setLogoStyle} />
                                <Text style={profile.textData}>Notifaction</Text>
                            </TouchableOpacity>
                        </View>
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: '500', color: '#fff' }}>Other</Text>
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/*  App related content */}
                        <View style={profile.userData}>
                            {/* Help And suport code */}
                            <TouchableOpacity style={profile.logoandMatter}>
                                <HelpIcon name="help" style={profile.setLogoStyle} />
                                <Text style={profile.textData}>Support & Help</Text>
                            </TouchableOpacity>
                            {/* Aboute the App code  */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                // blurRadius={10}
                                visible={modalVisible}>
                                <View style={profile.centeredView}>
                                    <View style={profile.modalView}>
                                        {/* <Image source={require('')} style={{height:25,width:90,resizeMode: "contain",borderRadius:3,marginBottom:15}} /> */}
                                        <Text style={profile.modalText}>I developed this project to showcase my proficiency in React Native and secure a role as a Mobile App Developer. It's a music app, demonstrating my ability to create engaging and user-friendly interfaces. Through this project, I aim to highlight my expertise in React Native, emphasizing my potential as a valuable asset to any mobile app development team.The music app I've crafted exemplifies my dedication to delivering high-quality and innovative solutions in the mobile app space. By creating this project, I hope to demonstrate my passion for mobile app development and my commitment to advancing my skills in React Native. I am excited to present this music app as a testament to my capabilities and enthusiasm for crafting exceptional user experiences.</Text>
                                        <Pressable
                                            style={[profile.button, profile.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={profile.textStyle}>Ok</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity style={profile.logoandMatter} onPress={() => setModalVisible(true)}>
                                <Aboute name="clipboard-outline" style={profile.setLogoStyle} />
                                <Text style={profile.textData}>About App</Text>
                            </TouchableOpacity>
                            {/* Shere app code  */}
                            <TouchableOpacity style={profile.logoandMatter} onPress={shreApp}>
                                <Shre name="share" style={profile.setLogoStyle} />
                                <Text style={profile.textData}>Share App</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    };
}
const profile = StyleSheet.create({
    profileLogo: {
        color: "#fff",
        borderRadius: 6,
        fontSize: 90,
        padding: 40,
        // backgroundColor:'red'
    },

    topView: {
        height: screenHeight / 2,
        justifyContent: 'center',
        alignItems: 'center',

        fontFamily: 'Roboto_500Medium',
    },
    userData: {
        // backgroundColor:'#fff',
        color: "#fff",
        marginHorizontal: 15,

    },

    logoandMatter: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        paddingVertical: 5,
    },

    // setLogo Style of userdata and app related content
    setLogoStyle: {
        paddingHorizontal: 20,
        fontSize: 22,
        color: '#fff'
    },
    // textData css is written here
    textData: {
        fontSize: 17,
        color: "#fff",
        fontWeight: '500',
        fontFamily: 'Roboto_500Medium',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    modalView: {
       
        paddingVertical: 25,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 4,
        textAlign:"justify",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        color: "#000",
        fontFamily: "Roboto_400Regular"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default User;
