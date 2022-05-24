import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import YoutubePlayer from "react-native-youtube-iframe";
// import FirebaseFL, { item } from "./FirebaseFL"

export default function App() {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        <View>
            <YoutubePlayer
                height={200}
                play={playing}
                videoId={
                    "pUoOzaU9rw4"
                    // CardID
                }
                onChangeState={onStateChange}
            />
            <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        </View>
    );
}

//videoId를 props를 활용해 할당해보기