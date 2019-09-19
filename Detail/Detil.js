import React from "react"
import{
    View, Text, TouchableOpacity, Image, Dimensions, Alert
}   from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { OpenRealmSess, GetRealmObjs } from "../Realm"
import { RealmRefs } from "../RealmRefs"

class Slot extends React.Component{
    render() {
        return(
            <View
                style={{
                    height: 40,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical : 5
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source = {require ("../Gambar/internet.png")}
                        style={{
                            height: 20,
                            marginRight: 10,
                            width: 20
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "bold"
                        }}
                    >
                        {this.props.nama}
                    </Text>
                </View>
                <Text
                    style = {{
                        fontSize : 13,
                    }}
                >
                    {this.props.detail}
                </Text>
            </View>
        )
    }
}


export default class Detil extends React.Component{
    state = {
        Jumlah : 0,
        pulsaSekarang : 0,
        hargaKuota : 0,
        hasil : 0,
    }

    async componentDidMount() {
        let realmSess = await OpenRealmSess(RealmRefs().Kuota)
        let jumlah = this.props.navigation.getParam("internet")

        for (let i = 0 ; i < realmSess.realm.objects.length ; i++){
            jumlah = jumlah + realmSess.realm.objects[i].datakuota
        }
        

        let realm = await OpenRealmSess(RealmRefs().Pulsa)
        let pulsa = 0
        for (let index in realm.realm.objects(realm.schemaName)){
            pulsa = pulsa + realm.realm.objects(realm.schemaName)[index].jumlahpulsa
        }

        let realmharga = await OpenRealmSess(RealmRefs().harga)
        let total = 0

        for (let index in GetRealmObjs(realmharga)){
            total = total + GetRealmObjs(realmharga)[index].hargaKuota
        }

        this.setState({pulsaSekarang : pulsa - total, Jumlah : jumlah, hargaKuota : this.props.navigation.getParam("item").harga})
    }

    render() {
        return(
            <View
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        height: 60,
                        elevation: 8,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        flexDirection: "row",
                        backgroundColor: "white"
                    }}
                >
                    <TouchableOpacity
                        onPress= {() => this.props.navigation.pop()}
                    >
                        <Image
                            source= {require ("../Gambar/left-arrow.png")}
                            style={{
                                height: 35,
                                width: 35
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginLeft: 30
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold"
                            }}
                        >
                            Konfirmasi Pembelian
                        </Text>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle = {{
                        padding : 10 
                    }}
                >
                    <View
                        style={{
                            height: 80,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold"
                            }}
                        >
                            Internet {this.props.navigation.getParam("item").Jumlah_utama}GB*
                        </Text>
                        <Text
                            style={{
                                fontSize: 16
                            }}
                        >
                            Rp {this.props.navigation.getParam("item").harga}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 300,
                            margin: 10,
                            borderRightWidth : 1,
                            borderLeftWidth : 1,
                            padding: 20,
                        }}
                    >
                        <Slot
                            nama = "Internet"
                            detail = {this.props.navigation.getParam("item").internet}
                        />
                        <Slot
                            nama = "Bonus Chat"
                            detail = {this.props.navigation.getParam("item").bonus}
                        />
                        <Slot
                            nama = "Internet Malam"
                            detail = {this.props.navigation.getParam("item").midnight}
                        />
                        <Slot
                            nama = "Telepon"
                            detail = {this.props.navigation.getParam("item").telepon}
                        />
                        <Slot
                            nama = "Masa Berlaku"
                            detail = {this.props.navigation.getParam("item").Activity}
                        />
                    </View>
                </ScrollView>
                <View
                    style = {{
                        height : 60,
                        flexDirection : "row",
                        alignItems : "center",
                        justifyContent : "space-between",
                        paddingHorizontal : 10
                    }}
                >
                    <View
                        style = {{
                            height : 60,
                            width : "50%"
                        }}
                    >
                        <Text
                            style = {{
                                fontSize : 18,
                                fontWeight : "bold"
                            }}
                        >
                            Pulsa : {this.state.pulsaSekarang}
                        </Text>
                        <Text
                            style = {{
                                fontSize : 18,
                                fontWeight : "bold",
                                marginTop : 5
                            }}
                        >
                            Harga : {this.state.hargaKuota}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress = {() => this.Beli()}
                        activeOpacity= {0.5}
                        style = {{
                            height : 50,
                            backgroundColor : "red",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 30,
                            alignSelf : "center",
                            width : Dimensions.get("screen").width -200
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white"
                            }}
                        >
                            Konfirmasi
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    async Beli () {
        if (this.state.hargaKuota > this.state.pulsaSekarang){
            Alert.alert("info", "pulsa Kurang")
        }else {
            let realmSess = await OpenRealmSess (RealmRefs().Kuota)
            
            realmSess.realm.write(() => {
                realmSess.realm.create(realmSess.schemaName, {
                    datakuota : this.props.navigation.getParam("item").Jumlah_utama,
                    waktu : (new Date()).getTime()
                })
            })
            let realm = await OpenRealmSess(RealmRefs().harga)

            realm.realm.write (() => {
                realm.realm.create(realm.schemaName, {
                    hargaKuota : this.state.hargaKuota
                })
            })
            // Alert.alert("info", (new Date()).getTime().toString())
            this.props.navigation.navigate("Inbox")
        }
    }
}