import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import { VoucherScreenProps } from '../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPage } from '../features/navigationSlice';
SplashScreen.preventAutoHideAsync();

const VoucherScreen: React.FC<VoucherScreenProps> = ({ navigation, route }) => {
    const [loaded, error] = useFonts({
        'SVN-Gotham': require('../assets/fonts/SVN-Gotham Regular.otf'),
    });

    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.navigation.currentPage);

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
                    style={{ flex: 1, paddingVertical: 40, alignItems: "center", }}>

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
                        <TouchableOpacity onPress={() => {
                            dispatch(setPage(1))
                            navigation.navigate("WelcomeScreen", { pageNumber: currentPage })
                        }} style={{ position: "absolute", left: 190 }}>
                            <Entypo name="home" color="white" size={24}></Entypo>
                        </TouchableOpacity>
                    </View>

                    {/* Icon */}
                    <View style={{ marginTop: 10, }}>
                        <Image resizeMode='contain' style={{ height: 40, width: 120 }} source={require('../assets/anlene-icon.png')}></Image>
                    </View>

                    <View style={{ marginTop: 20, paddingHorizontal: 18 }}>
                        <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 22, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>CHĂM SÓC CƠ-XƯƠNG-KHỚP</Text>}>
                            <LinearGradient
                                colors={['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(136, 80, 33, 1)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                                <Text style={{ textAlign: "center", fontSize: 22, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold" }}>CHĂM SÓC CƠ-XƯƠNG-KHỚP</Text>
                            </LinearGradient>

                        </MaskedView>
                        <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 18, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>NHẬN LỘC SỨC KHỎE TỪ ANLENE</Text>}>
                            <LinearGradient
                                colors={['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(136, 80, 33, 1)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                                <Text style={{ textAlign: "center", fontSize: 18, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold" }}>NHẬN LỘC SỨC KHỎE TỪ ANLENE</Text>
                            </LinearGradient>
                        </MaskedView>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ textAlign: "left", fontSize: 12, fontFamily: "SVN-Gotham", color: "white" }}>ANLENE LÌ XÌ NGAY 100.000đ KHI ĐẶT MUA HÔM NAY!</Text>
                            <Text style={{ textAlign: "left", fontSize: 12, fontFamily: "SVN-Gotham", color: "white" }}> Hạn sử dụng: 25/07/2021 - 31/07/2021</Text>
                        </View>

                    </View>
                    <View style={{ width: "100%", height: 400, overflow: "hidden", marginTop: 10 }}>

                        {/* Image */}
                        <Image style={{ width: "100%", height: "100%", resizeMode: "cover", }} source={require('../assets/voucher-bg.png')}></Image>
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

                    </View>

                    {/* Voucher Box */}
                    <View style={{ borderWidth: 1, borderColor: "white", borderRadius: 10, position: 'absolute', left: '15%', top: '70%', }}>
                        <View style={{ padding: 6, backgroundColor: "white", borderRadius: 8, borderBottomEndRadius: 0, borderBottomStartRadius: 0, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "rgb(115,164,66)", fontFamily: "SVN-Gotham", fontSize: 12 }}>MÃ GIẢM GIÁ</Text>
                            <Text style={{ color: "rgb(71,132,73)", fontFamily: "SVN-Gotham", fontSize: 16, fontWeight: "bold" }}>ANLENANMUMW88YQI</Text>
                        </View>
                        <View style={{ padding: 2, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                            <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 16, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>ÁP DỤNG TẠI</Text>}>
                                <LinearGradient
                                    colors={['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(136, 80, 33, 1)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}>
                                    <Text style={{ textAlign: "center", fontSize: 16, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold" }}>ÁP DỤNG TẠITẠI</Text>
                                </LinearGradient>
                            </MaskedView>
                            <Image resizeMode='contain' style={{ width: '40%', }} source={require('../assets/lazada-icon.png')}></Image>
                        </View>
                    </View>

                    {/* Button Section */}
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 50, gap: 10 }}>
                        <TouchableOpacity style={{ width: 180, height: 50, borderRadius: 40, backgroundColor: "rgba(183, 0, 2, 1)", justifyContent: "center", alignItems: "center", }}>
                            <Text style={{ color: "white", fontFamily: "SVN-Gotham", fontSize: 18 }}>MUA NGAY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            dispatch(setPage(currentPage + 1))
                            navigation.navigate("InfoScreen", { pageNumber: currentPage })
                        }} style={{ width: 180, height: 40, borderRadius: 20, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "rgb(115,164,66)" }}>
                            <Text style={{ color: "rgb(115,164,66)", fontFamily: "SVN-Gotham", fontSize: 16 }}>Tìm hiểu ngay</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Text Section */}
                    <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
                        <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "center", }}>* Voucher chỉ áp dụng cho đơn hàng mua các sản phẩm Anlene Gold 3X, Anlene Gold 5X tại gian hàng Fonterra Official Retail Store trên Lazada</Text>
                        <View style={{ marginTop: 6, paddingHorizontal: 40 }}>
                            <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "justify" }}>* Voucher chỉ áp dụng cho đơn hàng có giá trị từ 200.000đ</Text>
                        </View>
                    </View>

                </LinearGradient >
            </ScrollView>
        </SafeAreaView >
    )
}
export default VoucherScreen;