import React from "react"

import {
    View, Image, Text, TouchableOpacity, ScrollView, Dimensions
}  from "react-native"

export default class Dalam extends React.Component {
    state={
        data: []
    }

        componentDidMount() {
            fetch("https://gilangd.000webhostapp.com/Aplikasi1/IndoNews/dailyNews.json?1")
                .then( response => response.json())
                .then(responseJson => {
                    this.setState({data : responseJson.data})
                })
        }



    render () {
        return (
            <View
                style = {{
                    flex : 1,
                    alignItems : "center"
                }}
            >   
                <ScrollView>
                {this.state.data.map ((item, index) => {
                    return(
                        <TouchableOpacity
                            onPress = {() => this.props.navigation.push("IsiBerita", {item : item})}
                            style={{
                                flex : 1,
                                flexDirection: "row",
                                flexWrap : "wrap",
                                margin : 10,
                                backgroundColor : "lightgray",
                                padding : 10,
                                borderRadius : 20,
                                justifyContent : "center",
                                borderWidth : 1
                            }}
                        >
                            <Image
                                source= {{uri: item.Pict}}
                                style={{
                                    height: 150,
                                    width: 300,
                                    borderRadius : 10
                                }}
                            />
                            <View
                                style = {{
                                    backgroundColor : "gainsboro",
                                    marginTop : 15,
                                    borderRadius : 10,
                                    padding : 5
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight : "bold",
                                    }}
                                >
                                    {item.judul}
                                </Text>
                            </View>
                        </TouchableOpacity>
                            )
                        })}
                </ScrollView>          
            </View>

        )
    }
}