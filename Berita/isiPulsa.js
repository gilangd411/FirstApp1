import React from "react"
import {
    View, TouchableOpacity, Image, Text, Dimensions,ScrollView
}from "react-native"
import { OpenRealmSess } from "../Realm"
import { RealmRefs } from "../RealmRefs"

export default class isiPulsa extends React.Component {
    state = {
        data : [],
        id : "",
        menuTampil: true,
        nominal : 0,
        harga : "",
        arah : false,
        tempat : [],
        place : "Tempat Pembayaran",
        arrow : false,
        harga : ""
    }
    render() {
        return (
            <View
                style = {{
                    flex : 1
                }}
            >
                <View
                    style = {{
                        height : 60,
                        flexDirection : "row",
                        alignItems : "center",
                        paddingHorizontal : 15,
                        elevation : 8,
                        backgroundColor : "white"
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
                                fontSize : 30,
                                fontWeight : "bold"
                            }}
                        >
                            Isi Ulang Pulsa
                        </Text>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle ={{
                        padding : 20,
                    }}
                >
                    <Text
                        style = {{
                            fontSize : 25,
                            fontWeight : "bold"
                        }}
                    >
                        * Pilih Nominal
                    </Text>
                    <TouchableOpacity
                        onPress = {() => this.Mencet()}
                        style = {{
                            height : 50,
                            borderWidth : 1,
                            justifyContent : "space-between",
                            paddingHorizontal : 20,
                            flexDirection : "row",
                            alignItems : "center"
                        }}
                    >
                        <Text
                            style = {{
                                fontSize : 18,
                                fontWeight : "bold"
                            }}
                        >
                            {this.state.nominal}
                        </Text>
                        <Image
                            source = {this.state.arah == true ? require ("../down.png") : require ("../up.png")}
                            style = {{
                                height : 30,
                                width : 30
                            }}
                        />
                    </TouchableOpacity>
                    {this.state.data.map ((item, index) => {
                        return(
                            <TouchableOpacity
                                onPress = {() => this.nominalKepilih(item)}
                                style = {{
                                    height : 50,
                                    borderWidth : 1,
                                    paddingHorizontal : 20
                                }}
                            >
                                <Text
                                    style = {{
                                        fontSize : 18,
                                        fontWeight : "bold"
                                    }}
                                >
                                    {item.pulsa}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}

                    <Text
                        style = {{
                            marginTop : 50,
                            fontSize : 25,
                            fontWeight : "bold"
                        }}
                    >
                        * Pilih Tempat Pembayaran
                    </Text>
                    <TouchableOpacity
                       onPress = {() => this.milihTempat()}
                       style = {{
                           height : 50,
                           borderWidth : 1,
                           justifyContent : "space-between",
                           paddingHorizontal : 20,
                           flexDirection : "row",
                           alignItems : "center",
                           marginTop : 10
                       }}
                    >
                        <Text
                            style = {{
                                fontSize : 20,
                                fontWeight : "bold",
                            }}
                        >
                            {this.state.place}
                        </Text>
                        <Image
                            source = {this.state.arrow == true ? require ("../down.png") : require ("../up.png")}
                            style = {{
                                height : 30,
                                width : 30
                            }}
                        />
                    </TouchableOpacity>
                    {this.state.tempat.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress = {() => this.TerpilihTempat(item)}
                                style = {{
                                    height : 50,
                                    paddingHorizontal : 20,
                                    justifyContent : "center",
                                    borderWidth : 1
                                }}
                            >
                                <Text
                                    style = {{
                                        fontSize : 25,
                                        fontWeight : "bold"
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View
                    style = {{
                        height : 80,
                        justifyContent : "space-between",
                        flexDirection : "row",
                        paddingHorizontal : 20,
                        alignItems : "center",
                        backgroundColor : "gainsboro"
                    }}
                >
                    <View
                        style = {{
                            height : 80,
                        }}
                    >
                        <View
                            style = {{
                                margin : 5
                            }}
                        >
                            <Text
                                style = {{
                                    fontSize : 20,
                                    fontWeight : "bold"
                                }}
                            >
                                Harga : Rp {this.state.harga}
                            </Text>
                        </View>
                        <View
                            style = {{
                                margin : 5
                            }}
                        >
                            <Text
                                style = {{
                                    fontSize : 20,
                                    fontWeight : "bold"
                                }}
                            >
                                Tempat : {this.state.place}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress = {() => this.Order()}
                        activeOpacity = {0.5}
                        disabled = {this.state.place == "Tempat Pembayaran" ? true : false}
                        style = {{
                            height : 50,
                            width : 100,
                            borderRadius : 20,
                            backgroundColor : this.state.place == "Tempat Pembayaran" ? "gray" : "mediumaquamarine",
                            justifyContent : "center",
                            alignItems : "center"
                        }}
                    > 
                        <Text
                            style = {{
                                fontSize : 25,
                                fontWeight : "bold",
                                color : "white"
                            }}
                        >
                            Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    Mencet () {
        this.setState({arah : true})
    
        fetch("https://gilangd.000webhostapp.com/Aplikasi1/KuotaPack/pulsa.json?1")
        .then(response => response.json())
        .then(responseJson => {
            this.setState({data : responseJson.data})
        })
    }


    nominalKepilih(item) {
        this.setState({id : item.id, nominal : item.pulsa, data : [], arah : false, harga : item.harga})
    }    
    
    milihTempat() {
        this.setState({
            tempat : [
                "Indomaret",
                "Alfamart"
            ],
            arrow : true
        })
    }

    TerpilihTempat(item) {
        this.setState({
            place : item,
            tempat : [],
            arrow : false
        })
    }

    async Order () {
        let realmSess = await OpenRealmSess(RealmRefs().Pulsa)

        realmSess.realm.write(() => {
            realmSess.realm.create(realmSess.schemaName, {
                jumlahpulsa : this.state.nominal
            })
        })

        this.props.navigation.pop()
    }
}