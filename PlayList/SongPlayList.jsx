import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View, Modal, FlatList, TouchableWithoutFeedback, Alert } from "react-native";
import SymboleOfMusic from 'react-native-vector-icons/Fontisto';
import ThreeDot_DeletBtn_ShareMusic from 'react-native-vector-icons/MaterialCommunityIcons';
// import CrossModal from 'react-native-vector-icons/Entypo';
import BackIconde from 'react-native-vector-icons/Ionicons';
/////////////////////////////////////////////////////
import { FlashList } from "@shopify/flash-list"

import { memo, useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
//  this line of code help to make responshiv view of all app
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
import { DataContext } from "../Permiss.js"
import { useContext } from "react";

const SongPlayList = () => {
    // const [shoModal, setShowModal] = useState(false)

    const yourallData = useContext(DataContext);
    const goBackNavigation = useNavigation();


    

    const now = new Date().getHours();
    let sya;
    if (now <= 4 && now <= 12) {
        sya = "Good Night"
    }
    else if (now <= 13 && now <= 16) {
        sya = "Good After Noon"
    }
    else if (now <= 16 && now <= 19) {
        sya = "Good Evening"
    }
    else if (now <= 19 && now < 12) {
        sya = "Good Morning"
    }


    return (
        <>
            <SafeAreaView >
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#4c669f', '#3b5998', '#192f6a']} style={{ height: responsiveHeight(100) }} >
                    <View style={[stylse.goBack_welcomeView, stylse.displayFlex]} >
                        <TouchableOpacity style={{ width: responsiveWidth(10), padding: 0 }} onPress={() => goBackNavigation.goBack()}>
                            <BackIconde name="md-arrow-back-outline" size={responsiveHeight(4)} color={"#fff"} />
                        </TouchableOpacity>
                        <View >
                            <Text style={stylse.input}>{sya}</Text>
                        </View>
                    </View>
                    <Text style={stylse.platListText}>Playlist</Text>
                    <FlashList
                        data={yourallData}
                        keyExtractor={(item) => item.id}
                        viewabilityConfig={{
                            waitForInteraction: false,
                            itemVisiblePercentThreshold: 100,
                            minimumViewTime: 10,
                        }}
                        estimatedItemSize={20}

                        renderItem={({ item, index }) => {
                            const { filename, duration, id, albumId, modificationTime, uri } = item;
                            const minutes = Math.floor(duration / 60);
                            const remainingSeconds = duration % 60;
                            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                            const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds.toFixed(0) : remainingSeconds.toFixed(0);
                            return (

                                <LinearGradient colors={['#6981b8', '#5a6f9c', '#8369b8']}>
                                    <View style={[stylse.selectSong, stylse.displayFlex]}>
                                        <TouchableOpacity style={stylse.symAndName} onPress={()=>alert(index)}>
                                            <SymboleOfMusic name="music-note" size={responsiveHeight(4.3)} color={"#fff"} style={stylse.musiclogo} />
                                            <View style={stylse.musicNameView}>
                                                <Text numberOfLines={1} style={stylse.nameOfSongText}> {filename}</Text>
                                                <Text style={{ color: "#afc4b5", fontSize: responsiveHeight(1.7), }}>{`${formattedMinutes}:${formattedSeconds} sec`}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {/* three Dot for modal */}
                                        <TouchableOpacity onPress={() => alert("jj")}>
                                            {/* <Modal animationType="slide"
                                                transparent={true}
                                                visible={shoModal}>
                                                <View style={stylse.mainModal}>
                                                    <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                                                    </TouchableWithoutFeedback>
                                                    <View style={stylse.modalView}>
                                                        
                                                        <TouchableOpacity style={[stylse.displayFlex, stylse.modalBothbtn]} onPress={() => { alert("Song Share"), setShowModal(false) }}>
                                                            <Text style={stylse.modalText}>Share</Text>
                                                            <ThreeDot_DeletBtn_ShareMusic name="share-variant" size={25} color={"green"} />
                                                        </TouchableOpacity>
                                                        
                                                        <TouchableOpacity style={[stylse.displayFlex, stylse.modalBothbtn]} onPress={() => { alert("Song Deleted"), setShowModal(false) }}>
                                                            <Text style={stylse.modalText}>Delete</Text>
                                                            <ThreeDot_DeletBtn_ShareMusic name="delete" size={25} color={"red"} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal> */}
                                            <ThreeDot_DeletBtn_ShareMusic name="dots-vertical" size={responsiveHeight(4.5)} color={"#fff"} style={stylse.threedotstyle} />
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>

                            )
                        }}
                    />
                </LinearGradient>
            </SafeAreaView>
        </>
    )
}

export default SongPlayList;

const stylse = StyleSheet.create({
    displayFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    goBack_welcomeView: {
        width: responsiveWidth(100),
        paddingHorizontal: responsiveWidth(1.5),
        paddingVertical: responsiveHeight(1)
    },
    input: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 500,
    },
    platListText: {
        color: "#fff",
        fontSize: responsiveFontSize(2.7),
        paddingTop: 35,
        paddingBottom: 10,
        fontWeight: 500
    },
    selectSong: {
        marginVertical: 7,
        width: responsiveWidth(100),
        height: responsiveHeight(7.5)
    },
    musiclogo: {
        padding: responsiveHeight(1.6),
        width: responsiveWidth(15),
    },
    musicNameView: {
        width: "75%",
        padding: 3,

    },
    // main modal csss
    mainModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    //  inside modal view css
    modalView: {
        height: "20%",
        width: "100%",
        backgroundColor: "#d4e4fa",
    },

    nameOfSongText: {
        fontWeight: 600,
        fontSize: responsiveHeight(1.9),
        color: "#fff",
        textAlign: "justify",
        width: responsiveWidth(75),
        textTransform: "capitalize",

    },
    threedotstyle: {
        padding: 8,
        fontWeight: 100,
        width: responsiveWidth(11),

    },
    symAndName: {
        display: "flex",
        flexDirection: "row",
    },
    // modal both btn
    modalBothbtn: {
        // justifyContent: "space-between",
        marginVertical: 3,
        padding: 15,
    },
    // modal text
    modalText: {
        fontWeight: 700,
        fontSize: 15
    },
})
