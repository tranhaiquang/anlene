import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { SubmitScreenProps } from '../navigation/types';
import Checkbox from 'expo-checkbox';
import Modal from 'react-native-modal';

SplashScreen.preventAutoHideAsync();

const SubmitScreen: React.FC<SubmitScreenProps> = ({ navigation, route }) => {
    const [loaded, error] = useFonts({
        'SVN-Gotham': require('../assets/fonts/SVN-Gotham Regular.otf'),
    });

    const [checked, setChecked] = useState(false);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [nameInputWarning, setNameInputWarning] = useState("")
    const [phoneInputWarning, setPhoneInputWarning] = useState("")
    const [isModalVisible, setModalVisible] = useState(false)
    const themes = [
        {
            name: "green",
            backgroundColor: ['rgb(15,73,13)', 'rgb(28,96,13)', 'rgb(38,117,12)', 'rgb(28,96,13)', 'rgb(15,73,13)'],
            headerText: 'XIN CHÚC MỪNG!',
            headerTextColor: ['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(186, 135, 44, 1)'],
            bodyText: 'Bạn có hệ Cơ-Xương-Khớp linh hoạt và có vẻ sức đề kháng của bạn cũng tốt',
            color: "yellow"
        },
        {
            name: 'yellow',
            backgroundColor: ['rgb(253, 182, 60)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgb(253, 182, 60)'],
            headerText: 'LƯU Ý MỘT CHÚT!',
            headerTextColor: ['rgb(15,73,13)', 'rgb(28,96,13)', 'rgb(38,117,12)', 'rgb(28,96,13)', 'rgb(15,73,13)'],
            bodyText: 'Có vẻ bạn đang có hệ vận động tốt nhưng cần chú ý đến sức đề kháng hơn nhé...',
            color: "green"
        },
        {
            name: 'gray',
            backgroundColor: ['rgb(150,150,150)', 'rgb(150,150,150)', 'rgb(150,150,150)', 'rgb(150,150,150)', 'rgb(150,150,150)'],
            headerText: 'LƯU Ý MỘT CHÚT!',
            headerTextColor: ['rgb(223,30,19)', 'rgb(223,30,19)', 'rgb(223,30,19)', 'rgb(223,30,19)', 'rgb(223,30,19)'],
            bodyText: 'Tuy rằng có vẻ bạn đang có đề kháng tốt nhưng cần quan tâm đến hệ vận động nhiều hơn nhé, bởi sau tuổi 40,...',
            color: "yellow"
        }
    ]
    const currentTheme = themes.find(t => t.name === route.params.theme)

    const validateNameInput = (text: string) => {
        setName(text);
        if (text.trim() === "") {
            setNameInputWarning("Vui lòng nhập họ và tên");
        } else {
            setNameInputWarning("");
        }
    };

    const validatePhoneInput = (text: string) => {
        setPhone(text);
        if (text.trim() === "") {
            setPhoneInputWarning("Vui lòng nhập số điện thoại");
        } else {
            setPhoneInputWarning("");
        }
    };

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
                    colors={currentTheme?.backgroundColor}
                    locations={[0.1, 0.2, 0.3, 0.8, 0.9]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{ flex: 1, paddingVertical: 40, alignItems: "center", paddingHorizontal: 30 }}>

                    {/* Top Bar */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: "absolute", right: 190 }}>
                            <AntDesign name="left" size={24} color="white"></AntDesign>
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 14, fontFamily: "SVN-Gotham", textAlign: "center" }}>
                            {"<"} Trang {route.params.pageNumber}/6 {">"}
                        </Text>
                        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ position: "absolute", left: 190 }}>
                            <Entypo name="home" color="white" size={24}></Entypo>
                        </TouchableOpacity>

                    </View>

                    {/* Icon */}
                    <View style={{ marginTop: 10, }}>
                        <Image resizeMode='contain' style={{ height: 40, width: 120 }} source={require('../assets/anlene-icon.png')}></Image>
                    </View>

                    {/* Text Section*/}
                    <View style={{ marginTop: 10, }}>
                        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                                <Text style={{ color: "green", fontFamily: "SVN-Gotham", fontSize: 20, fontWeight: "bold" }}>THÔNG BÁO!</Text>
                                <Text style={{ fontFamily: "SVN-Gotham", textAlign: "center", marginTop: 10 }}>Bạn có muốn huỷ bỏ kết quả kiểm tra sức khoẻ trước đó không?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10, gap: 30 }}>
                                    <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ width: 120, height: 40, borderRadius: 20, borderColor: "rgb(183,0,2)", borderWidth: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "rgb(183,0,2)", fontFamily: "SVN-Gotham" }}>HỦY</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(false)
                                        navigation.navigate("WelcomeScreen", { pageNumber: 1 })
                                    }} style={{ width: 120, height: 40, borderRadius: 20, backgroundColor: "rgb(183,0,2)", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>ĐỒNG Ý</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 16, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>HOÀN THÀNH BÀI KIỂM TRA</Text>}>
                            <LinearGradient
                                colors={currentTheme?.headerTextColor}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                                <Text style={{ textAlign: "center", fontSize: 16, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold", marginBottom: 10 }}>HOÀN THÀNH BÀI KIỂM TRA</Text>
                            </LinearGradient>
                        </MaskedView>

                        <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 30, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>{currentTheme?.headerText}</Text>}>
                            <LinearGradient
                                colors={currentTheme?.headerTextColor}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                                <Text style={{ textAlign: "center", fontSize: 30, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold", marginBottom: 10 }}>XIN CHÚC MỪNG</Text>
                            </LinearGradient>

                        </MaskedView>
                        <Text style={{ textAlign: "center", fontSize: 15, color: "white", fontFamily: "SVN-Gotham", marginTop: 10 }}>{currentTheme?.bodyText}</Text>
                        <Text style={{ textAlign: "center", fontSize: 18, color: "white", fontFamily: "SVN-Gotham", marginTop: 10 }}>Điền thông tin bên dưới để xem đầy đủ kết quả và nhận ngay Voucher ưu đãi lên đến 100.000đ từ Anlene.</Text>

                    </View>

                    {/*Text Input Section*/}
                    <View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "white", fontSize: 13, fontFamily: "SVN-Gotham", fontWeight: "bold", marginLeft: 2 }}>Họ tên:<Text style={{ color: currentTheme?.color }}>*</Text></Text>
                            <TextInput onChangeText={validateNameInput} placeholder='Nhập họ và tên' placeholderTextColor={'rgb(201,201,201)'} style={{ borderWidth: 2, borderRadius: 10, borderColor: nameInputWarning ? currentTheme?.color : "white", backgroundColor: "white", width: 320, paddingHorizontal: 10, marginTop: 10 }}></TextInput>
                            {nameInputWarning ? <Text style={{ color: currentTheme?.color, fontFamily: "SVN-Gotham", fontSize: 12 }}>{nameInputWarning}</Text> : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "white", fontSize: 13, fontFamily: "SVN-Gotham", fontWeight: "bold", marginLeft: 2 }}>Số điện thoại:<Text style={{ color: currentTheme?.color }}>*</Text></Text>
                            <TextInput keyboardType="numeric" onChangeText={validatePhoneInput} placeholder='Nhập số điện thoại' placeholderTextColor={'rgb(201,201,201)'} style={{ borderWidth: 2, borderRadius: 10, borderColor: phoneInputWarning ? currentTheme?.color : "white", backgroundColor: "white", width: 320, paddingHorizontal: 10, marginTop: 10 }}></TextInput>
                            {phoneInputWarning ? <Text style={{ color: currentTheme?.color, fontFamily: "SVN-Gotham", fontSize: 12 }}>{phoneInputWarning}</Text> : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "white", fontSize: 13, fontFamily: "SVN-Gotham", fontWeight: "bold", marginLeft: 2 }}>Email:</Text>
                            <TextInput placeholder='Nhập email' placeholderTextColor={'rgb(201,201,201)'} style={{ borderWidth: 1, borderRadius: 10, borderColor: "white", backgroundColor: "white", width: 320, paddingHorizontal: 10, marginTop: 10 }}></TextInput>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                            <Checkbox value={checked} onValueChange={() => setChecked(!checked)} />
                            <Text style={{ color: "white", fontFamily: "SVN-Gotham", fontSize: 12, textAlign: "justify", flexShrink: 1, width: "90%", }}>Tôi đồng ý để Anlene Vietnam liên hệ trong bất kỳ chương trình quảng cáo sản phẩm hay khuyến mãi nào</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: "SVN-Gotham", color: "rgb(212,228,206)", fontSize: 10, fontStyle: "italic" }}>Bằng cách điền bảng thông tin này, tôi đồng ý với việc thông tin của mình để xử lý dựa trên chính sách bảo mật của Anlene</Text>
                    </View>

                    {/* Submit Button Section*/}
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate("PromoScreen", { pageNumber: 4, theme: "green" }) }} disabled={!name || !phone || !checked} style={{ width: 140, height: 40, borderRadius: 20, backgroundColor: name && phone && checked ? 'rgba(183, 0, 2, 1)' : "gray", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>HOÀN THÀNH</Text>
                        </TouchableOpacity>
                    </View >


                </LinearGradient >
            </ScrollView>

        </SafeAreaView >
    )
}
export default SubmitScreen