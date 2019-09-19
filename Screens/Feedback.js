import React from "react"
import {
    View, TouchableOpacity, Image, Text, ScrollView, TextInput,Alert
}from "react-native"
import { OpenRealmSess } from "../Realm"
import { RealmRefs } from "../RealmRefs"

export default class Feedback extends React.Component {
    state = {
        kritik : "",
        place : "kritik & saran"
    }


    render() {
        return (
            <View
                style = {{
                    flex : 1
                }}
            >
                <View
                    style={{
                        height: 60,
                        elevation: 8,
                        justifyContent: "center",
                        padding: 10,
                        backgroundColor: "white"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: "bold"
                        }}
                    >
                        FeedBack
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 60,
                        alignItems: "center"
                    }}
                >
                    <TextInput
                        onChangeText = {value => this.setState({kritik : value})}
                        placeholder= {this.state.place}
                        style={{
                            height: 40,
                            borderRadius: 20,
                            padding: 10,
                            width: "90%",
                            borderWidth: 1
                        }}
                        value = {this.state.kritik}
                    >
                    </TextInput>
                </View>
                <View
                    style={{
                        marginTop: 40,
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        onPress = {() => this.SimpanKritik()}
                        activeOpacity= {0.5}
                            style={{
                                height: 40,
                                width: 100,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "limegreen"
                            }}
                    >
                            <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 22,
                                color: "white"
                            }}
                            >
                                Tambah
                            </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        padding : 20
                    }}
                >
                    <TouchableOpacity
                        onPress= {() => this.props.navigation.push("History")}
                        style={{
                            height: 40,
                            width: 150,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            borderWidth: 1
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold"
                            }}
                        >
                            History
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    async SimpanKritik() {
        let realmSess = await OpenRealmSess(RealmRefs().Kritik)

        realmSess.realm.write(() => {
            realmSess.realm.create(realmSess.schemaName, {
                saran : this.state.kritik
            })
        })

        this.setState({kritik : ""})
        this.props.navigation.push("History")
    }
}