import React from "react"
import Carousel, {Pagination} from "react-native-snap-carousel"
import {
    View, TouchableOpacity, Image, Text, ScrollView, Dimensions, Alert
}from "react-native"
import { OpenRealmSess } from "../Realm"
import { RealmRefs } from "../RealmRefs"

class Slotscrol extends React.Component {
    render () {
        return (
            <TouchableOpacity
                onPress = {() => this.props.mencet()}
                style = {{
                    alignSelf:"center",
                    width: Dimensions.get("screen").width - 40,
                    height: (Dimensions.get("screen").width - 40) / 16 * 9,
                    borderWidth : 1,
                    justifyContent : "center",
                    borderRadius : 30,
                    alignItems : "center",
                    overflow : "hidden"
                }}
            >
                <Image
                    resizeMode = "contain"
                    source = {{uri : this.props.gambar}}
                    style = {{
                        width: "100%",
                        height: (Dimensions.get("screen").width - 40) / 16 * 9,
                        backgroundColor : "gainsboro"
                    }}
                />
            </TouchableOpacity>
        )
    }
}

export default class Home extends React.Component {
    state = {
        data : [],
        id : "",
        urutan : 0,
        kuota : 0
    }

    

    componentDidMount () {
        this.focusListener = this.props.navigation.addListener("willFocus", () => this.reloadKuota())

        fetch ("https://gilangd.000webhostapp.com/Aplikasi1/promo/promo.json?2")
        .then (response => response.json())
        .then(responseJson => {
            this.setState({data : responseJson.data})
        })
        
        
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }
    async reloadKuota() {
        let realmSess = await OpenRealmSess (RealmRefs().Kuota)
        let jumlah = 0
        
        for (let i = 0 ; i < realmSess.realm.objects(realmSess.schemaName).length ; i++){
            jumlah = jumlah + realmSess.realm.objects(realmSess.schemaName)[i].datakuota
        }
        this.setState({kuota : jumlah})
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
                        backgroundColor : "white",
                        elevation : 8,
                        justifyContent: "center",
                        paddingHorizontal: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "bold"
                        }}
                    >
                        Home
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle = {{
                        paddingVertical : 10,
                    }}
                >
                    <View>
                        <Text
                            style = {{
                                fontSize : 24,
                                marginLeft: 10,
                                fontWeight : "bold",
                                marginBottom : 15,
                            }}
                        >
                            Promo Spesial
                        </Text>
                        <Carousel
                            data= {this.state.data}
                            sliderWidth = {Dimensions.get("screen").width}
                            itemWidth = {Dimensions.get("screen").width}
                            // pagingEnabled= {true}
                            renderItem={({item,index}) => {
                                return(
                                    <Slotscrol
                                        gambar = {item.Pict}
                                        mencet = {() => this.props.navigation.push("IsiBerita", {item : item})}
                                    />
                                )
                            }}
                            onSnapToItem = {index => this.setState({urutan : index})}
                        />
                        <Pagination
                            dotsLength = {this.state.data.length}
                            containerStyle = {{
                                backgroundColor : "white"
                            }}
                            dotStyle = {{
                                width : 10,
                                height : 10,
                                borderRadius : 5,
                                marginHorizontal : 8,
                                backgroundColor : "red",
                            }}
                            inactiveDotStyle = {{
                                width : 10,
                                height : 10,
                                borderRadius : 5,
                                marginHorizontal : 8,
                                backgroundColor : "yellow",
                            }}
                            inactiveDotOpacity = {0.4}
                            inactiveDotScale = {0.6}
                            activeDotIndex = {this.state.urutan}
                        />
                    </View>
                    <View
                        style = {{
                            width: Dimensions.get("screen").width - 40,
                            height: (Dimensions.get("screen").width - 40) / 16 * 9,
                            padding : 15,
                            alignSelf: "center",
                            marginTop : 40,
                            backgroundColor: "ghostwhite",
                            borderRadius : 20
                        }}
                    >
                        <View
                            style = {{
                                flexDirection : "row",
                                justifyContent : "space-between",
                                marginBottom : 10,
                                alignItems : "center",
                                borderWidth : 0.2,
                                height : 40,
                                paddingHorizontal : 10,
                                borderRadius : 10
                            }}
                        >
                            <Text
                                style = {{
                                    fontSize : 18
                                }}
                            >
                                Jumlah Kuota
                            </Text>
                            <Text
                                style = {{
                                    fontSize : 15,
                                    marginRight : 5,
                                    fontWeight : "bold"
                                }}
                            >
                                Internet {this.state.kuota} GB
                            </Text>
                        </View>
                        <View
                            style = {{
                                height : 50,
                                flexDirection : "row",
                                justifyContent : "space-between",
                                paddingHorizontal : 10,
                                backgroundColor : "gainsboro",
                                borderRadius : 10,
                                alignItems : "center",
                                borderWidth : 1
                            }}
                        >
                            <Text
                                style = {{
                                    fontSize : 18,
                                    fontWeight : "bold"
                                }}
                            >
                                Sisa Kuota
                            </Text>
                            <Text
                                style = {{
                                    fontSize : 18,
                                    fontWeight : "bold"
                                }}
                            >
                                {this.state.kuota} GB
                            </Text>
                        </View>
                        <View
                            style = {{
                                height : 50,
                                flexDirection : "row",
                                justifyContent : "space-between",
                                paddingHorizontal : 10,
                                backgroundColor : "gainsboro",
                                borderRadius : 10,
                                alignItems : "center",
                                borderWidth : 1,
                                marginTop : 15
                            }}
                        >
                            <Text
                                style = {{
                                    fontSize : 18,
                                    fontWeight : "bold"
                                }}
                            >
                                Sisa Pulsa
                            </Text>
                            <Text
                                style = {{
                                    fontSize : 15,
                                    fontWeight : "bold"
                                }}
                            >
                                Rp 300.000
                            </Text>
                        </View>
                    </View>
                    <View
                        style = {{
                            width: Dimensions.get("screen").width - 40,
                            height: (Dimensions.get("screen").width - 40) / 16 * 9,
                            padding : 15,
                            alignSelf: "center",
                            marginTop : 40,
                            backgroundColor: "ghostwhite",
                            borderRadius : 20,
                            flexDirection : "row"
                        }}
                    >
                        <TouchableOpacity
                            onPress = {() => this.props.navigation.push("Kuota")}
                            style = {{
                                borderWidth : 0.5,
                                height : 150,
                                width : 135,
                                marginRight : 8,
                                borderRadius : 20,
                                justifyContent: "center",
                                alignItems : "center",
                                padding : 10
                            }}
                        >
                            <Image
                                source = {require ("../buy.png")}
                                style = {{
                                    height : 70,
                                    width : 70
                                }}
                            />
                            <Text
                                style = {{
                                    marginTop: 15,
                                    fontSize : 18,
                                    fontWeight : "bold",

                                }}
                            >
                                Kuota Package
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => this.props.navigation.push("isiPulsa")}
                            activeOpacity= {0.5}
                            style = {{
                                height : 150,
                                width : 135,
                                marginLeft : 8,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth : 0.5,
                                borderRadius : 20
                            }}
                        >
                            <Image
                                source = {require ("../mobile.png")}
                                style={{
                                    height: 70,
                                    width: 70
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 15,
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}
                            >
                                Isi Pulsa
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}