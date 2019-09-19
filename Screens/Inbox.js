import React from "react"
import {
    View, TouchableOpacity, Image, Text, ScrollView,
}from "react-native"
import { OpenRealmSess, GetRealmObjs } from "../Realm"
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
        let data = []
        for (let index in GetRealmObjs(realmSess)){
            data.push({
                info : "Paket Internet "+ GetRealmObjs(realmSess)[index].datakuota.toString() + " GB telah di Konfirmasi",
                waktu : GetRealmObjs(realmSess)[index].waktu
            })
        }
        
        let realmPulsa = await OpenRealmSess(RealmRefs().Pulsa)

        for (let index in GetRealmObjs(realmPulsa)){
            data.push ({
                info : "Selamat Pembelian Pulsa Dengan Nominal Rp " + GetRealmObjs(realmPulsa)[index].jumlahpulsa.toString() +  " Berhasil" + " Dengan Tempat Pembayaran " + GetRealmObjs(realmPulsa)[index].tempat,
                waktu : GetRealmObjs(realmPulsa)[index].waktu
            })
        }
        data.sort((a,b) => (a.waktu < b.waktu) ? 1 : ((b.waktu < a.waktu)) ? -1 : 0)
        this.setState ({data : data})
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
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16
                                    }}
                                >
                                    {item.info}
                                </Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}