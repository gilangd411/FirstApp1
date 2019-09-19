import React from "react"

import {
    View, TouchableOpacity, Image, Text,ScrollView, Dimensions
}from "react-native"
import { OpenRealmSess } from "../Realm"
import { RealmRefs } from "../RealmRefs"

export default class History extends React.Component {
    state = {
        data : []
    }

    componentDidMount () {
        this.focusListener = this.props.navigation.addListener("willFocus", () => this.reloadhistory())
    }

    async reloadhistory () {
        let realm = await OpenRealmSess(RealmRefs().Kritik)

        this.setState({data : realm.realm.objects(realm.schemaName)})
    }


    render () {
        return(
            <View
                style = {{
                    flex : 1
                }}
            >
                <View
                    style = {{
                        height : 60,
                        backgroundColor : "white",
                        paddingHorizontal : 20,
                        flexDirection : "row",
                        alignItems : "center",
                        elevation : 8
                    }}
                >
                    <TouchableOpacity
                        onPress = {() => this.props.navigation.pop()}
                    >  
                        <Image
                            source = {require ("../Gambar/left-arrow.png")}
                            style = {{
                                height : 30,
                                width : 30
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style = {{
                            flex : 1,
                            alignItems : "center",
                            justifyContent : "center"
                        }}
                    >
                        <Text
                            style = {{
                                fontSize : 25,
                                fontWeight : "bold"
                            }}
                        >
                            History Feedback
                        </Text>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle = {{
                        padding : 20,
                    }}
                >
                    {this.state.data.map((item, index) => {
                        return (
                            <View
                                style = {{
                                    height : (Dimensions.get("screen").width - 20) / 16 * 9,
                                    width : Dimensions.get("screen").width -40,
                                    borderWidth : 1,
                                    padding : 10
                                }}
                            >
                                <View
                                    style = {{
                                        height : 50,
                                        justifyContent : "center",
                                        borderBottomWidth : 1,
                                        marginBottom : 5
                                    }}
                                >
                                    <Text
                                        style = {{
                                            fontSize : 20,
                                            fontWeight : "bold"
                                        }}
                                    >
                                        Terima Kasih Atas Kritik dan Saran Anda!
                                    </Text>
                                </View>
                                <Text
                                    style = {{
                                        fontSize : 18,
                                        fontWeight : "bold"
                                    }}
                                >  
                                   Kritik : {item.saran}
                                </Text>
                            </View>
                        )
                    })}
                </ScrollView>
                <View
                    style = {{
                        height : 60,
                        justifyContent : "center",
                        paddingHorizontal : 20,
                        borderTopWidth : 1,
                        alignItems : "center"
                    }}
                >
                    <TouchableOpacity
                        onPress = {() => this.delete()}
                        style = {{
                            height : 40,
                            width : 150,
                            borderRadius : 20,
                            backgroundColor : "green",
                            alignItems :"center",
                            justifyContent : "center"
                        }}
                    >
                        <Text
                            style = {{
                                fontSize : 25,
                                fontWeight : "bold",
                                color : "white"
                            }}
                        >
                            Delete Data
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    async delete() {
        let realm = await OpenRealmSess(RealmRefs().Kritik)

        realm.realm.write(() => {
            realm.realm.deleteAll()
        })

        this.setState({data : realm.realm.objects(realm.schemaName)})
    }
}