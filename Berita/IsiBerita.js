import React from "react"

import {
    View, Text , Image , TouchableOpacity, ScrollView, Dimensions
}  from "react-native"

export default class IsiBerita extends React.Component {
    render () {
        return (
            <View
                style = {{
                    flex : 1
                }}
            >
                <View
                    style = {{
                        height : 80,
                        padding : 20,
                        justifyContent : "center",
                        alignItems : "center",
                        backgroundColor : "white",
                        elevation : 8
                    }}
                >
                    <Text
                        style = {{
                            fontSize : 20,
                            fontWeight : "bold"
                        }}
                    >
                        {this.props.navigation.getParam("item").judul}
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle = {{
                        paddingHorizontal : 20,
                        paddingBottom : 20
                    }}
                >
                    <Image
                        resizeMode = "contain"
                        source = {{uri : this.props.navigation.getParam("item").Pict}}
                        style = {{
                            height : (Dimensions.get("screen").width -20) / 16 * 9,
                            width : Dimensions.get("screen").width -40,
                            marginVertical : 10,
                            alignSelf : "center"
                        }}
                    /> 
                    <View
                        style = {{
                            height : 30,
                            marginVertical : 5,
                        }}
                    >
                        <Text
                            style = {{
                                fontSize : 15,
                                fontWeight : "bold",
                                color : "red"
                            }}
                        >
                            Tanggal : {this.props.navigation.getParam("item").tanggal}
                        </Text>
                    </View>
                    <Text
                        style = {{
                            marginTop : 5,
                            fontSize : 18,
                            fontWeight : "bold",
                            alignSelf : "center"
                        }}
                    >
                        {this.props.navigation.getParam("item").deskripsi}
                    </Text>
                </ScrollView>
            </View>
        )
    }
}