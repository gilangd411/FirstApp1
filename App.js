import {
    createAppContainer, createMaterialTopTabNavigator, createStackNavigator
}from "react-navigation"
import React from "react"
import {
    Image, View, ScrollView
}from "react-native"
import Home from "./Screens/Home"
import feedback from "./Screens/Feedback"
import Inbox from "./Screens/Inbox"
import Luar from "./Screens/Luar"
import Dalam from "./Screens/Dalam"
import IsiBerita from "./Detail/IsiBerita"
import Kuota from "./Detail/Kuota"
import Detil from "./Detail/Detil"
import isiPulsa from "./Detail/isiPulsa"
import History from "./Screens/History"

const TabAtas = createMaterialTopTabNavigator (
    {
        Dalam,
        Luar
    }
)

const TabBawah = createMaterialTopTabNavigator (
    {
        Home: {
            screen : Home, 
            navigationOptions : {
                tabBarIcon : ({focused,  horizontal, tintColor}) => {
                    return(
                        <Image
                            source ={focused ? require ("./Gambar/redHome.png") : require ("./Gambar/NatHome.png")}
                            style = {{
                                height : 20, 
                                width : 20,
                            }}
                        />
                    )
                }
            }
        }, 
        Artikel : {
            screen : TabAtas, 
            navigationOptions : {
                tabBarIcon : ({focused,  horizontal, tintColor}) => {
                    return(
                        <Image
                            source ={focused ? require ("./Gambar/RedBlog.png") : require ("./Gambar/blog.png")}
                            style = {{
                                height : 20, 
                                width : 20,
                            }}
                        />
                    )
                }
            }
        },
        feedback: {
            screen : feedback, 
            navigationOptions : {
                tabBarIcon : ({focused,  horizontal, tintColor}) => {
                    return(
                        <Image
                            source ={focused ? require ("./Gambar/Redfeedback.png") : require ("./Gambar/feedback.png")}
                            style = {{
                                height : 20, 
                                width : 20,
                            }}
                        />
                    )
                }
            }
        },
        Inbox: {
            screen : Inbox, 
            navigationOptions : {
                tabBarIcon : ({focused,  horizontal, tintColor}) => {
                    return(
                        <Image
                            source ={focused ? require ("./Gambar/Redemail.png") : require ("./Gambar/email.png")}
                            style = {{
                                height : 20, 
                                width : 20,
                            }}
                        />
                    )
                }
            }
        }
    },
    {
        tabBarPosition : "bottom",
        tabBarOptions : {
            style : {
                backgroundColor : "gainsboro"
            },
            
            activeTintColor: "red",
            inactiveTintColor : "black",
            showIcon : true,
            labelStyle : {
                fontSize : 8,
                fontWeight : "bold"
            }
        },
        swipeEnabled : false
    }
)  

export default createAppContainer (createStackNavigator(
    {
       TabBawah,
       IsiBerita,
       Kuota,
       History,
       isiPulsa,
       Detil,
    },
    {
        defaultNavigationOptions : {
            header : null
        }
    }
))