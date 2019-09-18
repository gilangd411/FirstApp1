import React from "react"
import {
    View, TouchableOpacity, Image, Text, ScrollView
}from "react-native"
import { OpenRealmSess } from "../Realm"
import { RealmRefs } from "../RealmRefs"

export default class Inbox extends React.Component {
    state = {
        data : []
    }

    componentDidMount () {
        this.focusListener = this.props.navigation.addListener("willFocus", () => this.reloaddata())
    }

    componentWillUnmount () {
        this.focusListener.remove()
    }

    async reloaddata () {
        let realmSess = await OpenRealmSess (RealmRefs().Kuota)

        this.setState ({data : realmSess.realm.objects(realmSess.schemaName).Kuota})
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
                        Inbox
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle = {{
                        padding : 20
                    }}
                >
                    {this.state.data.map((item, index) => {
                        return(
                            <View
                                style={{
                                    height: 80,
                                    marginVertical: 5,
                                    padding: 20,
                                    borderBottomColor: "lightgray",
                                    borderBottomWidth: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16
                                    }}
                                >
                                    Paket Internet {item} GB telah di Konfirmasi
                                </Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}