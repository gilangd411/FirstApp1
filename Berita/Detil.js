import React from "react"
import{
    View, Text, TouchableOpacity, Image, Dimensions, Alert
}   from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { OpenRealmSess } from "../Realm"
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
                        source = {require ("../internet.png")}
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
        Jumlah : 0
    }

    async componentDidMount() {
        let realmSess = await OpenRealmSess(RealmRefs().Kuota)
        let jumlah = this.props.navigation.getParam("internet")

        for (let i = 0 ; i < realmSess.realm.objects.length ; i++){
            jumlah = jumlah + realmSess.realm.objects[i].datakuota
        }
        Alert.alert ("info", jumlah.toString)
        this.setState({Jumlah : jumlah})
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
                            source= {require ("../left-arrow.png")}
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
                            height: 400,
                            margin: 10,
                            borderWidth: 1,
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
                    <TouchableOpacity
                        onPress = {() => this.Beli()}
                        activeOpacity= {0.5}
                        style = {{
                            marginTop : 20,
                            height : 50,
                            backgroundColor : "red",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 30,
                            alignSelf : "center",
                            width : Dimensions.get("screen").width -40
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
                </ScrollView>
            </View>
        )
    }

    async Beli () {
        let realmSess = await OpenRealmSess (RealmRefs().Kuota)
        // Alert.alert("info", (realmSess.realm == undefined).toString())
        realmSess.realm.write(() => {
            realmSess.realm.create(realmSess.schemaName, {
                datakuota : this.props.navigation.getParam("item").Jumlah_utama
            })
        })
        // Alert.alert("info", realmSess.realm.objects.length.toString())
        this.props.navigation.pop()
    }
}