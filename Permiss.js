import React, { useEffect, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { createContext } from "react";
const DataContext = createContext();
const Permiss = ({ children }) => {
    const [fileMusic, setFilemusic] = useState([])
    
    // this function show popup to give the premission to user allow to access the media file
    const permissAlertis = () => {
        Alert.alert("Permission", "This app need to read your Audio files", [{
            text: "exit",
            // onPress:()=> BackHandler.exitApp(),
        }, {
            text: "i agree",
            onPress: () => getPermission(),
        }])
    }
    // this function fetch all mudio file from local storage
    const getAllAudioFils = async () => {
        let musicFils = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
        })
        musicFils = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            first: musicFils.totalCount,
        })
        setFilemusic(musicFils.assets);
    }
    // this line display the sorry popup to when user click on do't ask again 
    const donotAskAgain = () => {
        Alert.alert("Sorry", "Can't access file", [{
            text: "exit",
            onPress: () => BackHandler.exitApp(),
        }])
    }

    const getPermission = async () => {
        const permiss = await MediaLibrary.getPermissionsAsync();
        if (permiss.granted) {
            getAllAudioFils()
        }
        if (!permiss.granted && permiss.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'denied' && canAskAgain) {
                // user must allow permission
                permissAlertis()
            }
            if (status === 'granted') {
                //we want to get all audio
                getAllAudioFils();
            }
            if (status === 'denied' && !canAskAgain) {
                donotAskAgain()
            }
        }
    }
    useEffect(() => {
        getPermission();
    }, [])
    ///////
    return (
        <>
            <DataContext.Provider value={fileMusic}>
                {children}
            </DataContext.Provider>
        </>
    )
}
export default Permiss;
export {DataContext};