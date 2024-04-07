import React, { useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import SymboleOfMusic from "react-native-vector-icons/Fontisto";
import ThreeDot_DeletBtn_ShareMusic from "react-native-vector-icons/MaterialCommunityIcons";
import BackIconde from "react-native-vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { DataContext } from "../Permiss.js";

const SongPlayList = () => {
    const yourallData = useContext(DataContext);
    const goBackNavigation = useNavigation();

    const now = new Date().getHours();
    let greeting;
    if (now >= 0 && now <= 4) {
        greeting = "Good Night";
    } else if (now >= 5 && now <= 12) {
        greeting = "Good Morning";
    } else if (now >= 13 && now <= 16) {
        greeting = "Good Afternoon";
    } else if (now >= 17 && now <= 19) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                // Button Linear Gradient
                colors={["#4c669f", "#3b5998", "#192f6a"]} style={{ flex: 1, }}>
                <View style={[styles.goBack_welcomeView, styles.displayFlex]}>
                    <TouchableOpacity
                        style={{ width: wp(10), }}
                        onPress={() => goBackNavigation.goBack()}>
                        <BackIconde
                            name="chevron-back-outline"
                            size={hp(4)}
                            color={"#fff"}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.input}>{greeting}</Text>
                    </View>
                </View>
                <Text style={styles.platListText}>Playlist</Text>
                <FlashList
                    data={yourallData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    viewabilityConfig={{
                        waitForInteraction: false,
                        itemVisiblePercentThreshold: 100,
                        minimumViewTime: 10,
                    }}
                    estimatedItemSize={20}
                    renderItem={({ item, index }) => {
                        const { filename, duration } = item;
                        const minutes = Math.floor(duration / 60);
                        const remainingSeconds = duration % 60;
                        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes >= 0 ? minutes : "00";
                        const formattedSeconds = remainingSeconds < 10 && remainingSeconds >= 0 ? "0" + remainingSeconds.toFixed(0) : remainingSeconds >= 0 ? remainingSeconds.toFixed(0) : "00";

                        return (
                            <View style={styles.selectSong}>
                                <TouchableOpacity style={styles.symAndName} onPress={() => alert(index)}>
                                    <SymboleOfMusic name="music-note" size={hp(4.3)} color={"#fff"} style={styles.musiclogo} />
                                    <View style={styles.musicNameView}>
                                        <Text numberOfLines={1} style={styles.nameOfSongText}>{filename}</Text>
                                        <Text style={styles.durationText}>{`${formattedMinutes}:${formattedSeconds} sec`}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert("jj")}>
                                    <ThreeDot_DeletBtn_ShareMusic name="dots-vertical" size={hp(4.5)} color={"#fff"} style={styles.threedotstyle} />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </LinearGradient>
        </SafeAreaView>
    );
};

export default SongPlayList;

const styles = StyleSheet.create({
    displayFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    goBack_welcomeView: {
        width: wp(100),
        paddingHorizontal: wp(1.5),
        paddingVertical: hp(1),
    },
    input: {
        color: "#fff",
        fontSize: hp(2.5),
    },
    platListText: {
        color: "#fff",
        fontSize: hp(2.7),
        paddingLeft: wp(3)
    },
    selectSong: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#fff", 
        borderBottomWidth: hp(0.06), 
    },
    musiclogo: {
        padding: hp(1.6),
    },
    musicNameView: {
        width: "75%",
        padding: hp(0.6),
    },
    nameOfSongText: {
        fontSize: hp(2),
        color: "#fff",
        textTransform: "capitalize",
    },
    durationText: {
        color: "#afc4b5",
        fontSize: hp(1.7),
    },
    threedotstyle: {
        padding: hp(1),
    },
    symAndName: {
        flexDirection: "row",
        alignItems: "center",
      
    },
});
