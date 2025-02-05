import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen({navigation}) {
    const [loaded, error] = useFonts({
        'SVN-Gotham': require('../assets/fonts/SVN-Gotham Regular.otf'),
    });

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
            style={{ flex: 1, paddingVertical: 40, }}
        >
            {/* Top Bar */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Text style={{ alignItems: "center", color: "white", fontSize: 14 }}>Trang 1/6</Text>
                <Image style={{ resizeMode: "contain", position: "absolute", right: 20 }} source={require('../assets/anlene-icon.png')}></Image>
            </View>

            <View style={{ marginTop: 20, paddingHorizontal: 18 }}>
                <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 25, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>TẾT BẬN RỘN CƠ-XƯƠNG-KHỚP CÓ KHOẺ ĐỂ CHU TOÀN?</Text>}>
                    <LinearGradient
                        colors={['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(136, 80, 33, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={{ textAlign: "center", fontSize: 25, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold" }}>TẾT BẬN RỘN CƠ-XƯƠNG-KHỚP CÓ KHOẺ ĐỂ CHU TOÀN?</Text>

                    </LinearGradient>

                </MaskedView>
                <Text style={{ textAlign: "center", fontSize: 12, fontFamily: "SVN-Gotham", color: "white" }}>Trăm công nghìn việc dịp cận Tết mà cơ thể nhức mỏi, làm sao chu toàn?</Text>
                <Text style={{ textAlign: "center", fontSize: 12, fontFamily: "SVN-Gotham", color: "white" }}>Ngay lúc này, hãy <Text style={{ color: "yellow" }}>Kiểm tra Sức khoẻ Cơ-Xương-Khớp </Text>cùng Anlene để Tết này cả nhà vui khoẻ đón Tết, trọn vẹn niềm vui.</Text>
            </View>
            <View style={{ width: "100%", height: 400, overflow: "hidden", marginTop: 10 }}>

                <Image style={{ width: "100%", height: "100%", resizeMode: "cover", }} source={require('../assets/welcome-bg.png')}></Image>
                <LinearGradient
                    colors={['rgb(34, 117, 34)', 'transparent']}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '10%',
                    }}
                />
                <LinearGradient
                    colors={['transparent', 'rgb(28,96,13)',]}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '12%',
                    }}
                />
                <TouchableOpacity onPress={() =>{navigation.navigate("Test")}}>
                    <Image style={{ position: 'absolute', left: "20%", bottom: 0 }} source={require('../assets/kiem-tra-ngay-btn.png')}></Image>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <Image style={{ alignSelf: "center" }} source={require('../assets/group-icon.png')}></Image>
                <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "center", }}>Bài kiểm tra Cơ, Xương, Khớp này được phát triển bởi đội ngũ Anlene</Text>
                <View style={{ marginTop: 10, paddingHorizontal: 50 }}>
                    <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "justify" }}>Lưu ý: Bài kiểm tra không dành cho đối tượng đang bị chấn thương hoặc có bệnh lý về cơ, xương, khớp hoặc tiểu đường</Text>
                </View>
            </View>

        </LinearGradient >


    )
}
