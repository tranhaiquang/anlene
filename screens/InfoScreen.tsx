import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import { InfoScreenProps, RootStackParamList } from '../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
type Props = StackScreenProps<RootStackParamList, "InfoScreen">;
SplashScreen.preventAutoHideAsync();

const InfoScreen: React.FC<InfoScreenProps> = ({ navigation, route }) => {
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
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                <LinearGradient
                    colors={['rgb(15,73,13)', 'rgb(28,96,13)', 'rgb(38,117,12)', 'rgb(28,96,13)', 'rgb(15,73,13)']}
                    locations={[0.1, 0.2, 0.3, 0.8, 0.9]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 20, alignItems: "center", }}>

                    {/* Top Bar */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }} style={{ position: "absolute", right: 190 }}>
                            <AntDesign name="left" size={24} color="white"></AntDesign>
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 14, fontFamily: "SVN-Gotham", textAlign: "center" }}>
                            {"<"} Trang {route.params.pageNumber}/6 {">"}
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("WelcomeScreen", { pageNumber: 1 }) }} style={{ position: "absolute", left: 190 }}>
                            <Entypo name="home" color="white" size={24}></Entypo>
                        </TouchableOpacity>
                    </View>

                    {/* Icon */}
                    <View style={{ marginTop: 10, }}>
                        <Image resizeMode='contain' style={{ height: 40, width: 120 }} source={require('../assets/anlene-icon.png')}></Image>
                    </View>

                    {/* Header Text */}
                    <View style={{ marginTop: 10, paddingHorizontal: 18 }}>
                        <View style={{ gap: 8 }}>
                            <Text style={{ textAlign: "center", fontSize: 24, fontFamily: "SVN-Gotham", fontWeight: "bold", color: "rgb(236,210,74)" }}>THÔNG TIN SẢN PHẨM</Text>
                            <Text style={{ textAlign: "center", fontSize: 22, fontFamily: "SVN-Gotham", fontWeight: "bold", color: "rgb(236,210,74)" }}>SỮA ANLENE 3 KHỎE</Text>
                        </View>
                    </View>

                    {/* Main Image Section */}
                    <View style={{ marginTop: 10 }} >
                        <Image resizeMode='contain' style={{ height: 250, width: 350 }} source={require('../assets/info-screen-img.png')}></Image>
                    </View>

                    {/* Text Section */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: "center", fontSize: 14, fontFamily: "SVN-Gotham", color: "white", }}>Uống 2 ly Anlene mỗi ngày để bổ sung dinh dưỡng, tăng cường đề kháng đồng thời duy trì thói quen tập thể dục mỗi ngày để giúp hệ Cơ-Xương-Khớp chắc khoẻ, thoải mái tận hưởng cuộc sống năng động, chẳng ngại “rào cản” tuổi tác.</Text>
                    </View>

                    {/* Image Box Section */}
                    <View style={{ marginTop: 10, gap: 20 }} >
                        <Image resizeMode='contain' style={{ width: 300, height: 200 }} source={require('../assets/info-screen-box1.png')}></Image>
                        <Image resizeMode='contain' style={{ width: 300, height: 200 }} source={require('../assets/info-screen-box2.png')}></Image>
                        <Image resizeMode='contain' style={{ width: 300, height: 200 }} source={require('../assets/info-screen-box3.png')}></Image>
                    </View>





                </LinearGradient >
            </ScrollView>
        </SafeAreaView >
    )
}
export default InfoScreen;