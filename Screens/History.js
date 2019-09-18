import React from "react"

import{
    View, Text, Image, TouchableOpacity, ScrollView
}   from "react-native"

export default class History extends React.Component{
    render() {
        return(
            <View
                style={{
                    flex:1
                }}
            >
                <View
                    style={{
                        height: 60,
                        elevation: 8,
                        backgroundColor: "white",
                        justifyContent: "center",
                        paddingHorizontal: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "bold"
                        }}
                    >
                        History Feedback
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle = {{
                        padding : 20,
                    }}
                >

                </ScrollView>
            </View>

        )
    }
}