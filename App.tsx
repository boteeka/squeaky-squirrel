import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
    const [searchTerm, setSearchTerm] = useState<string>(null);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <View style={styles.searchInputContainer}>
                    <TextInput style={styles.searchInput} value={searchTerm} placeholder={"Search"} />
                </View>
                <View></View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 15,
        paddingTop: 50,
        width: "100%",
        height: "100%"
    },
    searchInputContainer: {
        width: "100%"
    },
    searchInput: {
        borderColor: "purple",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    }
});
