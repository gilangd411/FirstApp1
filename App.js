import {
    createAppContainer, createMaterialTopTabNavigator, createStackNavigator
}from "react-navigation"
import React from "react"
import {
    Image, View, ScrollView
}from "react-native"
import Home from "./Screens/Home"
// import Artikel from "./Screens/Artikel"
import feedback from "./Screens/Feedback"
import Inbox from "./Screens/Inbox"
import Luar from "./Screens/Luar"
import Dalam from "./Screens/Dalam"
import IsiBerita from "./Berita/IsiBerita"
import Kuota from "./Berita/Kuota"
import Detil from "./Berita/Detil"
import isiPulsa from "./Berita/isiPulsa"
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
                            source ={focused ? require ("./redHome.png") : require ("./NatHome.png")}
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
                            source ={focused ? require ("./RedBlog.png") : require ("./blog.png")}
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
                            source ={focused ? require ("./Redfeedback.png") : require ("./feedback.png")}
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
                            source ={focused ? require ("./Redemail.png") : require ("./email.png")}
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
       Detil
    },
    {
        defaultNavigationOptions : {
            header : null
        }
    }
))