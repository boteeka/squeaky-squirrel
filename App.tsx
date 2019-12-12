import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, WebView } from "react-native";
import { DefaultTheme, Provider as PaperProvider, Searchbar, IconButton, Colors, Card, Title, Divider, Surface } from "react-native-paper";
import { debounce } from "lodash";
// import YoutubePlayer from "react-native-yt-player";
// import YouTube from "react-native-youtube";
import mockdata from "./mockdata.json";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "tomato",
        accent: "yellow"
    }
};

// AIzaSyDkHuEQdm5BzWMovLYexBj1RyrtPmTnbWU

const parseSearchResults = result => {
    if (result && result.items && result.items.length) {
        const item = result.items[0];
        return {
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle
        };
    }

    return null;
};

const apiKey = "";

export default function App() {
    const [searchTerm, setSearchTerm] = useState<string>(null);
    const [searchResult, setSearchResult] = useState(null);

    const performSearch = debounce(async (term: string) => {
        // const result = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${term}&key=${apiKey}`, {
        //     headers: {
        //         Accept: "application/json"
        //     }
        // });

        const json = mockdata; // await result.json();

        console.log(JSON.stringify(json, null, 2));

        setSearchResult(parseSearchResults(json));
    }, 1000);

    useEffect(() => {
        if (searchTerm !== null) {
            console.log(searchTerm);
            performSearch(searchTerm);
        }
    }, [searchTerm]);

    return (
        <>
            <View style={styles.container}>
                <PaperProvider theme={theme}>
                    <Card>
                        <Card.Title title="Squeaky Squirrel" />
                        <Card.Content>
                            <Searchbar placeholder="Search" value={searchTerm} onChangeText={value => setSearchTerm(() => value)} />
                        </Card.Content>
                        <Card.Actions>
                            <IconButton icon="play" size={20} color={Colors.red500} onPress={() => console.log("pressed")} />
                            <IconButton icon="pause" size={20} color={Colors.red500} onPress={() => console.log("pressed")} />
                        </Card.Actions>
                    </Card>
                    <Card>
                        <Card.Content>
                            {/* {searchResult && (
                            <>
                                <Text>{searchResult.id}</Text>
                                <WebView
                                    style={{ marginTop: 20, width: 320, height: 230 }}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    source={{ uri: `https://www.youtube.com/embed/TaYp0fRWEt0` }}
                                />
                            </>
                        )} */}
                        </Card.Content>
                    </Card>
                    <Divider />
                    <Card>
                        <Card.Content>
                            <Title>adasd</Title>
                        </Card.Content>
                    </Card>
                </PaperProvider>
            </View>

            <WebView
                style={{ marginTop: 20, width: 320, height: 230 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: `https://stackoverflow.com/questions/49502692/embedding-youtube-videos-in-react-native-application` }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#000",
        justifyContent: "flex-start",
        padding: 15,
        width: "100%",
        height: "100%"
    }
});
