import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { PromoScreenProps } from '../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPage } from '../features/navigationSlice';
SplashScreen.preventAutoHideAsync();

const PromoScreen: React.FC<PromoScreenProps> = ({ navigation, route }) => {
    const [loaded, error] = useFonts({
        "SVN-Gotham": require("../assets/fonts/SVN-Gotham Regular.otf"),
    });
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.navigation.currentPage);
    const [showHiddenText, setHiddenText] = useState(false)
    type Theme = {
        name: string;
        backgroundColor: [string, string, ...string[]];
        secondaryColor: [string, string, ...string[]];
        miniText: string;
        bottomText: string;
        buttonText: string;
        headerText: string;
        headerTextColor: [string, string, ...string[]];
        bodyText: string;
        color: string;
        imageSource: number
    };
    const themes: Theme[] = [
        {
            name: "green",
            backgroundColor: ["rgb(15,73,13)", "rgb(28,96,13)", "rgb(38,117,12)", "rgb(28,96,13)", "rgb(15,73,13)"],
            secondaryColor: ["rgb(253, 182, 60)", "rgba(232, 226, 118, 1)", "rgba(225, 215, 112, 1)", "rgb(253, 182, 60)"],
            headerText: "XIN CHÚC MỪNG!",
            headerTextColor: ["rgba(186, 135, 44, 1)", "rgba(232, 226, 118, 1)", "rgba(225, 215, 112, 1)", "rgba(186, 135, 44, 1)"],
            bodyText: "Bạn có một hệ Cơ-Xương-Khớp linh hoạt và có vẻ sức đề kháng của bạn cũng tốt. Cố gắng duy trì thể trạng tốt này nhé. Vì sau tuổi 40, sức khoẻ Cơ-Xương-Khớp có thể bị suy giảm.",
            miniText: "Tác động này có thể tạo ra những cơn đau nhức mỏi ảnh hưởng đến vận động hằng ngày.",
            bottomText: "Cùng Anlene giúp bạn chăm sóc sức khoẻ Cơ-Xương-Khớp ngay hôm nay với Ưu đãi hấp dẫn đang chờ bạn!",
            buttonText: "MUA NGAY",
            color: "yellow",
            imageSource: require("../assets/promo-screen-img-green.png")
        },
        {
            name: "yellow",
            backgroundColor: ["rgb(253, 182, 60)", "rgba(232, 226, 118, 1)", "rgba(225, 215, 112, 1)", "rgb(253, 182, 60)"],
            secondaryColor: ["rgb(15,73,13)", "rgb(28,96,13)", "rgb(38,117,12)", "rgb(28,96,13)", "rgb(15,73,13)"],
            headerText: "LƯU Ý MỘT CHÚT!",
            headerTextColor: ["rgb(15,73,13)", "rgb(28,96,13)", "rgb(38,117,12)", "rgb(28,96,13)", "rgb(15,73,13)"],
            bodyText: "Có vẻ bạn đang có sức đề kháng tốt nhưng cần chú ý đến hệ vận động hơn nhé vì sau tuổi 40 sức khoẻ Cơ-Xương-Khớp có thể bị suy giảm: ",
            miniText: "Rào cản vận động này có thể mang đến những cơn đau nhức mỏi không mong muốn.",
            bottomText: "Ngay từ bây giờ, cùng Anlene giúp bạn chăm sóc sức khoẻ Cơ-Xương-Khớp ngay hôm nay với Ưu đãi hấp dẫn đang chờ bạn!",
            buttonText: "MUA NGAY",
            color: "green",
            imageSource: require("../assets/promo-screen-img-yellow.png")

        },
        {
            name: "gray",
            backgroundColor: ["rgb(150,150,150)", "rgb(150,150,150)", "rgb(150,150,150)", "rgb(150,150,150)", "rgb(150,150,150)"],
            secondaryColor: ["rgb(253, 182, 60)", "rgba(232, 226, 118, 1)", "rgba(225, 215, 112, 1)", "rgb(253, 182, 60)"],
            headerText: "HÃY CẨN THẬN!",
            headerTextColor: ["rgb(223,30,19)", "rgb(223,30,19)", "rgb(223,30,19)", "rgb(223,30,19)", "rgb(223,30,19)"],
            bodyText: "Tuy rằng có vẻ bạn đang có đề kháng tốt nhưng cần quan tâm đến hệ vận động nhiều hơn nhé, bởi sau tuổi 40, sức khoẻ Cơ- Xương - Khớp suy giảm: ",
            miniText: "Bạn có thể sẽ phải đối mặt với những cơn đau nhức mỏi thường xuyên, gây khó khăn trong vận động và sinh hoạt hằng ngày.",
            bottomText: "Đừng chậm trễ, cùng Anlene giúp bạn chăm sóc sức khoẻ Cơ-Xương-Khớp ngay hôm nay với Ưu đãi hấp dẫn đang chờ bạn!",
            color: "yellow",
            buttonText: "NHẬN NGAY",
            imageSource: require("../assets/promo-screen-img-green.png")

        }
    ]
    const currentTheme = themes.find(t => t.name === route.params.theme)


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
                    colors={currentTheme?.backgroundColor ?? ["rgb(15, 73, 13)", "rgb(28, 96, 13)", "rgb(38, 117, 12)", "rgb(28, 96, 13)", "rgb(15, 73, 13)"]}
                    locations={[0.1, 0.2, 0.3, 0.8, 0.9]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{ flex: 1, paddingVertical: 40, alignItems: "center", paddingHorizontal: 30 }}>

                    {/* Top Bar */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <TouchableOpacity onPress={() => {
                            dispatch(setPage(currentPage - 1))
                            navigation.goBack()
                        }} style={{ position: "absolute", right: 190 }}>
                            <AntDesign name="left" size={24} color="white"></AntDesign>
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 14, fontFamily: "SVN-Gotham", textAlign: "center" }}>
                            {"<"} Trang {currentPage}/6 {">"}
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("WelcomeScreen", { pageNumber: 1 }) }} style={{ position: "absolute", left: 190 }}>
                            <Entypo name="home" color="white" size={24}></Entypo>
                        </TouchableOpacity>
                    </View>

                    {/* Icon */}
                    <View style={{ marginTop: 10, }}>
                        <Image resizeMode='contain' style={{ height: 40, width: 120 }} source={require('../assets/anlene-icon.png')}></Image>
                    </View>

                    {/* Main Section*/}
                    <View style={{ marginTop: 10, }}>

                        {/* Header Text */}
                        <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 30, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>{currentTheme?.headerText}</Text>}>
                            <LinearGradient
                                colors={currentTheme?.headerTextColor ?? ["rgba(186, 135, 44, 1)", "rgba(232, 226, 118, 1)", "rgba(225, 215, 112, 1)", "rgba(186, 135, 44, 1)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                                <Text style={{ textAlign: "center", fontSize: 30, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold", }}>XIN CHÚC MỪNG</Text>
                            </LinearGradient>
                        </MaskedView>

                        {/* Body Text */}
                        <Text style={{ textAlign: "center", fontSize: 14, color: "white", fontFamily: "SVN-Gotham", marginTop: 10 }}>{currentTheme?.bodyText}</Text>
                        <Image resizeMode="contain" style={{ alignSelf: "center", height: 140, width: 340 }} source={require("../assets/group-img-green.png")}></Image>

                        {/* Mini Text*/}
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white", fontFamily: "SVN-Gotham", }}>{currentTheme?.miniText}</Text>

                        {/* Main Image*/}
                        <Image resizeMode="contain" style={{ height: 300, width: 320, alignSelf: "center", }} source={currentTheme?.imageSource}></Image>
                        <View style={{ paddingHorizontal: 50 }}>
                            <Text style={{ textAlign: "center", fontSize: 6, color: "white", fontFamily: "SVN-Gotham", fontStyle: "italic" }}>*Mỗi 10 năm. Nguồn: Daly et al., 2013. BMC Geriatrics 13:71</Text>
                            <Text style={{ textAlign: "center", fontSize: 6, color: "white", fontFamily: "SVN-Gotham", fontStyle: "italic" }}>**Mỗi 5-7 năm sau khi mãn kinh. Nguồn: National Osteoporosis Foundation (2009). Hormones and Healthy Bones</Text>
                        </View>

                        <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 14, fontFamily: "SVN-Gotham", fontWeight: "bold", marginTop: 6 }}>LỰA CHỌN GIÚP CƠ-XƯƠNG-KHỚP CHẮC KHOẺ</Text>}>
                            <LinearGradient
                                colors={currentTheme?.secondaryColor ?? ["rgba(186, 135, 44, 1)", "rgba(232, 226, 118, 1)", "rgba(225, 215, 112, 1)", "rgba(186, 135, 44, 1)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                                <Text style={{ textAlign: "center", fontSize: 14, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold", marginBottom: 10 }}>LỰA CHỌN GIÚP CƠ-XƯƠNG-KHỚP CHẮC KHOẺ</Text>
                            </LinearGradient>
                        </MaskedView>

                        {/* Bottom Text */}
                        <Text style={{ textAlign: "center", fontSize: 12, color: "white", fontFamily: "SVN-Gotham", }}>{currentTheme?.bottomText}</Text>
                        {
                            !showHiddenText && (
                                <TouchableOpacity onPress={() => setHiddenText(!showHiddenText)}>
                                    <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 12, fontFamily: "SVN-Gotham", marginTop: 6, textDecorationLine: "underline" }}>Xem thêm</Text>}>
                                        <LinearGradient
                                            colors={currentTheme?.secondaryColor ?? ["rgba(186, 135, 44, 1)", "rgba(232, 226, 118, 1)", "rgba(225, 215, 112, 1)", "rgba(186, 135, 44, 1)"]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}>
                                            <Text style={{ textAlign: "center", fontSize: 12, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold", marginBottom: 10, textDecorationLine: "underline" }}>Xem thêm</Text>
                                        </LinearGradient>
                                    </MaskedView>
                                </TouchableOpacity>
                            )
                        }

                        {
                            showHiddenText && (<Text style={{ color: "white", fontSize: 10, fontFamily: "SVN-Gotham", textAlign: "center", fontStyle: "italic", marginTop: 10 }}>*Anlene 3 Khoẻ với công thức MovePro chứa các dưỡng chất Đạm, Canxi, Collagen cùng các Vitamin, Khoáng chất giúp Cơ-Xương-Khớp chắc khỏe và tăng sức đề kháng, cho bạn thoải mái vận động, tận hưởng cuộc sống.</Text>)
                        }
                    </View>

                    {/* Button Section*/}
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => {
                            dispatch(setPage(currentPage + 1))
                            navigation.navigate("VoucherScreen", { pageNumber: currentPage })
                        }} style={{ width: 140, height: 40, borderRadius: 20, backgroundColor: "rgba(183, 0, 2, 1)", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "yellow" }}>
                            <Text style={{ color: "white", fontFamily: "SVN-Gotham", fontSize: 16 }}>{currentTheme?.buttonText}</Text>
                        </TouchableOpacity>
                    </View >


                </LinearGradient >
            </ScrollView>

        </SafeAreaView >
    )
}
export default PromoScreen