import React from "react"

import {
    View, ScrollView , Image, TouchableOpacity, Text, Dimensions
}from "react-native"

export default class Kuota extends React.Component {
    state = {
        data : []
    }

    componentDidMount () {
        fetch ("https://gilangd.000webhostapp.com/Aplikasi1/KuotaPack/KuotaPack.json?4")
        .then(response => response.json())
        .then(responseJson => {
            this.setState({data : responseJson.data})
        })
    }

    render () {
        return (
            <View
                style = {{
                    flex : 1
                }}
            >
                <View
                    style = {{
                        height : 60,
                        padding : 20,
                        alignItems : "center",
                        backgroundColor : "white",
                        flexDirection : "row",
                        elevation : 8
                    }}
                >
                    <TouchableOpacity
                        onPress = {() => this.props.navigation.pop()}
                    >
                        <Image
                            source = {require ("../left-arrow.png")}
                            style = {{
                                height : 30,
                                width : 30
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style = {{
                            flex : 1,
                            alignItems : "center"
                        }}
                    >
                        <Text
                            style = {{
                                fontSize : 20,
                                fontWeight : "bold"
                            }}
                        >
                            Daftar Kuota Internet
                        </Text>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        padding: 20
                    }}
                >
                    {this.state.data.map ((item, index) => {
                        return(
                            <View
                                style={{
                                    height: (Dimensions.get("screen").width -20) / 16 * 9,
                                    width: Dimensions.get("screen").width -40,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    marginBottom: 10,
                                    padding: 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Internet {item.Jumlah_utama}GB*
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                    }}
                                >
                                    Rp {item.harga} / {item.Activity}
                                </Text>

                                <TouchableOpacity
                                    onPress= {() => this.props.navigation.push("Detil", {item: item, internet : item.jumlah_utama})}
                                    activeOpacity= {0.5}
                                    style={{
                                        marginTop: 30,
                                        height: 55,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "maroon",
                                        borderRadius: 20
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize : 20,
                                            color: "white",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Beli
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}