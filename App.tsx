import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, WebView } from "react-native";
import {
    Caption,
    Card,
    Colors,
    DefaultTheme,
    IconButton,
    Provider as PaperProvider,
    Searchbar,
    Subheading,
    Title
} from "react-native-paper";
import mockdata from "./mockdata.json";

const API_KEY = "";
const MOCK_DATA = true;

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "tomato",
        accent: "yellow"
    }
};

const parseSearchResults = result => {
    if (result && result.items && result.items.length) {
        const item = result.items[0];
        return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle
        };
    }

    return null;
};

export default function App() {
    const [searchTerm, setSearchTerm] = useState<string>(null);
    const [searchResult, setSearchResult] = useState(null);
    const [typingStopped, setTypingStopped] = useState<boolean>(true);
    const timer = useRef(null);

    const performSearch = async (term: string) => {
        let json;

        if (MOCK_DATA) {
            json = mockdata;
        } else {
            const result = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${term}&key=${API_KEY}`, {
                headers: {
                    Accept: "application/json"
                }
            });
            json = await result.json();
        }

        setSearchResult(parseSearchResults(json));
    };

    useEffect(() => {
        if (searchTerm !== null && typingStopped === true) {
            performSearch(searchTerm);
        }
    }, [searchTerm, typingStopped]);

    return (
        <View style={styles.container}>
            <PaperProvider theme={theme}>
                <Card>
                    <Card.Title title="Squeaky Squirrel" />
                    <Card.Content>
                        <Searchbar
                            placeholder="Search"
                            value={searchTerm}
                            onKeyPress={() => {
                                clearTimeout(timer.current);
                                setTypingStopped(false);
                                timer.current = setTimeout(() => {
                                    setTypingStopped(true);
                                }, 1000);
                            }}
                            onChangeText={value => {
                                setSearchTerm(() => value);
                            }}
                        />
                    </Card.Content>
                    <Card.Actions>
                        <IconButton icon="play" size={20} color={Colors.red500} onPress={() => console.log("play pressed")} />
                        <IconButton icon="pause" size={20} color={Colors.red500} onPress={() => console.log("pause pressed")} />
                    </Card.Actions>
                </Card>
                {searchResult && (
                    <Card>
                        <Card.Content>
                            <WebView
                                style={{ marginTop: 20, width: 320, height: 230 }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: `https://www.youtube.com/embed/${searchResult.id}` }}
                            />
                        </Card.Content>
                    </Card>
                )}
                {searchResult && (
                    <Card>
                        <Card.Content>
                            <>
                                <Title>{searchResult.title}</Title>
                                <Caption>{searchResult.description}</Caption>
                                <Subheading>{searchResult.channelTitle}</Subheading>
                            </>
                        </Card.Content>
                    </Card>
                )}
            </PaperProvider>
        </View>
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
