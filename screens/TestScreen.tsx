import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
SplashScreen.preventAutoHideAsync();

export default function TestScreen() {
    const [loaded, error] = useFonts({
        'SVN-Gotham': require('../assets/fonts/SVN-Gotham Regular.otf'),
    });
    const [isYesBtnClicked, setYesBtnClick] = useState(false)
    const [isNoBtnClicked, setNoBtnClick] = useState(false)
    const [borderColor, setBorderColor] = useState
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (

        <LinearGradient
            colors={['rgb(15,73,13)', 'rgb(28,96,13)', 'rgb(38,117,12)', 'rgb(28,96,13)', 'rgb(15,73,13)']}
            locations={[0.1, 0.2, 0.3, 0.8, 0.9]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1, paddingVertical: 40, alignItems: "center" }}
        >
            {/* Top Bar */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Text style={{ alignItems: "center", color: "white", fontSize: 14 }}>Trang 1/6</Text>
            </View>

            <View style={{ marginTop: 20, paddingHorizontal: 18 }}>
                <Text style={{ textAlign: "center", fontSize: 14, fontFamily: "SVN-Gotham", color: "white", fontWeight: "bold" }}>KIỂM TRA CƠ - XƯƠNG - KHỚP</Text>
                <View>

                </View>
                <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 18, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>KIỂM TRA CƠ</Text>}>
                    <LinearGradient
                        colors={['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(136, 80, 33, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={{ textAlign: "center", fontSize: 18, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold" }}>KIỂM TRA CƠ</Text>

                    </LinearGradient>

                </MaskedView>
                {/* Image Section*/}
                <View>
                    <Image style={{ alignSelf: "center", borderColor: "red", borderWidth: 2, borderRadius: 10 }} source={require('../assets/kiem-tra-co.png')}></Image>
                    <View style={{ position: "absolute", right: -10, top: -10 }}>
                        <AntDesign size={40} color="red" name="checkcircle"></AntDesign>
                    </View>
                </View>
                <Text style={{ textAlign: "center", fontSize: 15, color: "white", fontFamily: "SVN-Gotham", marginHorizontal: 40 }}>Thẳng lưng trước ghế, đứng lên ngồi xuống 5 lần từ 6-10 giây</Text>
            </View>

            {/* Button Section*/}
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                <TouchableOpacity onPress={() => {
                    setYesBtnClick(true)
                    setNoBtnClick(false)
                }} style={{ width: 110, height: 120, borderWidth: isYesBtnClicked == true ? 2 : 0, borderColor: isYesBtnClicked == true ? "yellow" : "", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                    <Image source={require('../assets/smile-icon.png')}></Image>
                    <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>Được</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setNoBtnClick(true)
                    setYesBtnClick(false)
                }} style={{ width: 110, height: 120, borderWidth: isNoBtnClicked == true ? 2 : 0, borderColor: isNoBtnClicked == true ? "yellow" : "", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('../assets/sad-icon.png')}></Image>
                    <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>Không được</Text>
                </TouchableOpacity>
            </View >

            {/* Submit Button Section*/}
            <View>
                <TouchableOpacity style={{ width: 140, height: 40, borderRadius: 20, backgroundColor: 'rgba(183, 0, 2, 1)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>Xác nhận</Text>
                </TouchableOpacity>
            </View >

            {/*Bottom Text Section*/}
            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "center", }}>*Lưu ý: Hãy dừng bài tập ngay nếu cảm thấy không thoải mái.</Text>
                <View style={{ paddingHorizontal: 50 }}>
                    <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "justify" }}>Đảm bảo vị trí tập an toàn để không té ngã.</Text>
                </View>
            </View>

        </LinearGradient >


    )
}
