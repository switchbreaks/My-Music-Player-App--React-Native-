import { View, Text, StyleSheet, SafeAreaView, BackHandler, Image, TouchableOpacity, Alert } from "react-native";
import NextBtn_Prevous from 'react-native-vector-icons/Entypo';
import PlayBtm_PlayBtm from 'react-native-vector-icons/AntDesign';
import Feveret_Unfevret from 'react-native-vector-icons/AntDesign';
import InLoopSong_And_ExitFromLoop from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import SymboleOfMusic from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
//  this line of code help to make responshiv view of all app
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";

import { DataContext } from "../Permiss.js";
import { useContext } from "react";
import Loding from "../Loding.js";

const MainPlayer = (props) => {
    const receivedData = props.data;
    console.log("prop data", receivedData)

    const yourallDa = useContext(DataContext);
    const sizeOfBttomIcone = responsiveHeight(3.5); // size of eatch play pause next icone
    const [musicStatus, setMusicstatus] = useState(false);
    const [loopmusic, setLoopMusic] = useState(true);
    const [addfeb, setAddfeb] = useState(true);
    const [soundObject, setSoundObject] = useState(null);
    const [nextSong, setNextSong] = useState(0)

    const playPusebtmfunk = async () => {
        let mainsongULR = yourallDa[nextSong].uri;
        setMusicstatus(!musicStatus);
        if (soundObject) {
            if (musicStatus) {
                await soundObject.pauseAsync();
            } else {
                await soundObject.playAsync();
            }
        }
        else {
            try {
                const { sound: newSoundObject, status } = await Audio.Sound.createAsync(
                    {
                        uri: mainsongULR,
                    },
                    { shouldPlay: true },
                );
                // Your sound is playing!
                setSoundObject(newSoundObject);
            } catch {
                console.log("there is wrong")
            }
        }

    };

    // looping setting function

    const loopingFun = () => {
        setLoopMusic(!loopmusic);
    }
    // fevret song function
    const fevretsonfFun = () => {
        setAddfeb(!addfeb)
    }

    const previousSongs = async () => {
        if (soundObject) {
            await soundObject.stopAsync();
            setSoundObject(null);
            setMusicstatus(false);
        }
        setNextSong(nextSong - 1)
        if (nextSong === 0) {
            Alert.alert(
                "No Previous Songs",
                "You are already at the beginning of the playlist.",
                [
                    {
                        text: "Go to Last Song",
                        onPress: () => setNextSong(yourallDa.length - 1)
                    },
                    {
                        text: "Stay Here",
                        onPress: () => setNextSong(0)
                    }
                ]
            );
        }

    }
    const nextSongFun = async () => {
        if (soundObject) {
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
            setSoundObject(null);
            setMusicstatus(false);
        }
        setNextSong(nextSong + 1)
        if (nextSong < yourallDa.length - 1) {
            if (soundObject.stopAsync === 0) {
                alert("jjj")
            }
        }
        else {
            Alert.alert(
                "Playlist Completed!",
                "You've reached the end of the playlist.",
                [
                    {
                        text: "Stay Here",
                        onPress: () => setNextSong(yourallDa.length - 1)
                    }, {
                        text: "Go to Beginning",
                        onPress: () => setNextSong(0)
                    },
                ]
            );

        }

    }
    if (yourallDa[nextSong] === undefined) {
        return (<Loding />)
    }
    else {
        const minutes = Math.floor(yourallDa[nextSong].duration / 60);
        const remainingSeconds = yourallDa[nextSong].duration % 60;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds.toFixed(0) : remainingSeconds.toFixed(0);

        return (
            <>
                <SafeAreaView style={styles.mainSafeareaView}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#4c669f', '#3b5998', '#192f6a']} style={{ height: responsiveHeight(100) }}>
                        <View style={styles.songCenterView}>
                            <Text style={styles.songText}>{nextSong + 1}/{yourallDa.length}</Text>

                        </View>
                        <View style={styles.mainView}>
                            <View style={styles.musicBigLogo}>
                                {/* <Image source={require('../assets/icon.png')}  /> */}
                                <SymboleOfMusic name="music-note-eighth" size={sizeOfBttomIcone + 200} color={"#fff"} />
                            </View>
                            <Text style={styles.nameOfSong} numberOfLines={1}>{yourallDa[nextSong].filename}</Text>
                            <View style={{ display: "flex", height: responsiveHeight(30), justifyContent: "space-between" }}>
                                <View>
                                    <View style={styles.line} />
                                    <View style={styles.displayFlexProp}>
                                        <Text style={{ color: "#fff" }}>00:00</Text>
                                        <Text style={{ color: "#fff" }}>{formattedMinutes}:{formattedSeconds}</Text>
                                    </View>
                                </View>
                                <View>

                                    <View style={[styles.loopANdFevretSong, styles.displayFlexProp]}>

                                        <TouchableOpacity onPress={loopingFun}>
                                            <InLoopSong_And_ExitFromLoop name={loopmusic ? "repeat" : "repeat-off"} size={sizeOfBttomIcone}
                                                color={loopmusic ? "green" : "gray"} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={fevretsonfFun}>

                                            <Feveret_Unfevret name={
                                                addfeb ? "heart" : "hearto"} size={sizeOfBttomIcone}
                                                color={addfeb ? "#fa7e6b" : "#fff"} />
                                        </TouchableOpacity>

                                    </View>
                                    {/* this is View of the play next previus song button */}
                                    <View style={[styles.allBtnNextPre, styles.displayFlexProp]}>
                                        <TouchableOpacity onPress={previousSongs} style={{ paddingVertical: 10, paddingRight: 20 }}>
                                            <NextBtn_Prevous name="controller-jump-to-start" size={sizeOfBttomIcone + 5} color={"#fff"} />
                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={playPusebtmfunk} >
                                            <PlayBtm_PlayBtm name={
                                                musicStatus ? 'pausecircle' : 'play'
                                            } size={sizeOfBttomIcone + 26}
                                                color={"#fff"} />
                                        </TouchableOpacity>
                                        {/* Next btn  button  */}
                                        <TouchableOpacity onPress={nextSongFun} style={{ paddingVertical: 10, paddingLeft: 20 }}>
                                            <NextBtn_Prevous name="controller-next" size={sizeOfBttomIcone + 5} color={"#fff"} />
                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </View>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </>
        )
    }
}
export default MainPlayer;
const styles = StyleSheet.create({
    // this is common display flex code
    displayFlexProp: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    mainSafeareaView: {
    },
    songCenterView: {
        alignItems: 'center',
    },
    songText: {
        fontSize: responsiveFontSize(3),
        paddingTop: responsiveHeight(1),
        color: "#fff"
    },
    mainView: {
        padding: responsiveWidth(4),
    },
    musicBigLogo: {
        height: responsiveHeight(40),
        width: responsiveWidth(92),
        backgroundColor: '#6f98d9',
        borderRadius: responsiveWidth(50),
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 2,

    },
    nameOfSong: {
        fontSize: responsiveFontSize(2.5),
        // fontWeight: 600,
        marginBottom: responsiveHeight(5),
        marginTop: responsiveHeight(2),
        color: "#fff"
    },
    line: {
        height: responsiveHeight(1),
        borderRadius: 4,
        backgroundColor: 'black',
    },
    loopANdFevretSong: {

        marginVertical: responsiveHeight(2.5)
    },
    allBtnNextPre: {
        paddingTop: responsiveHeight(2),



    }

})