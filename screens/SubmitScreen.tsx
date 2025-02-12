import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { StackScreenProps } from "@react-navigation/stack";
import { SubmitScreenProps } from '../navigation/types';
import Checkbox from 'expo-checkbox';

SplashScreen.preventAutoHideAsync();

const SubmitScreen: React.FC<SubmitScreenProps> = ({ navigation, route }) => {
    const [loaded, error] = useFonts({
        'SVN-Gotham': require('../assets/fonts/SVN-Gotham Regular.otf'),
    });
    const [isYesBtnClicked, setYesBtnClick] = useState(false)
    const [isNoBtnClicked, setNoBtnClick] = useState(false)
    const [borderColor, setBorderColor] = useState("")
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [nameInputWarning, setNameInputWarning] = useState("")
    const [phoneInputWarning, setPhoneInputWarning] = useState("")

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
    const exercises = [
        {
            title: "KIỂM TRA CƠ",
            description: "Thẳng lưng trước ghế, đứng lên ngồi xuống 5 lần từ 6-10 giây",
            image: require("../assets/muscle-check-img.png"),
        },
        {
            title: "KIỂM TRA XƯƠNG",
            description: "Duỗi 2 tay về phía trước, từ từ cúi xuống để chạm vào mũi bàn chân",
            image: require("../assets/bone-check-img.png"),
        },
        {
            title: "KIỂM TRA KHỚP",
            description: "Đứng rộng chân, lưng thẳng đứng, tay đưa ra sau và đan vào nhau",
            image: require("../assets/joint-check-img.png"),
        },
        {
            title: "KIỂM TRA SỨC ĐỀ KHÁNG",
            description: "6 tháng gần đây, bạn có gặp các triệu chứng: ho, sổ mũi, cảm sốt?",
            image: require("../assets/resistance-check-img.png"),
        },
    ]
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState([
        {
            context: "waiting",
            title: "Cơ"
        },
        {
            context: "2",
            title: "Xương"
        },
        {
            context: "3",
            title: "Khớp"
        },
        {
            context: "4",
            title: "Đề kháng"
        }]);
    const isSubmitButtonDisabled = currentStep === exercises.length - 1 && (isNoBtnClicked || isYesBtnClicked);

    const handleSelection = (choice: "yes" | "no") => {
        setTimeout(() => {
            let newProgress = [...progress];
            newProgress[currentStep] = {
                context: choice,
                title: newProgress[currentStep].title
            };

            if (currentStep < exercises.length - 1) {
                newProgress[currentStep + 1] = {
                    context: "waiting",
                    title: newProgress[currentStep + 1].title
                };
                setCurrentStep(currentStep + 1);
                setBorderColor("");
                setYesBtnClick(false);
                setNoBtnClick(false);
            }

            setProgress(newProgress);

        }, 500);
    };
    const handleBack = () => {
        let newProgress = [...progress];
        newProgress[currentStep] = {
            context: (currentStep + 1).toString(),
            title: newProgress[currentStep].title
        };
        if (currentStep < exercises.length - 1) {
            newProgress[currentStep - 1] = {
                context: "waiting",
                title: newProgress[currentStep + 1].title
            };
            setBorderColor("");
            setYesBtnClick(false);
            setNoBtnClick(false);
        }
        setCurrentStep(currentStep - 1);
        setProgress(newProgress);
    }

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
                        <TouchableOpacity onPress={() => {
                            if (currentStep == 0)
                                navigation.navigate("TestScreen", { pageNumber: 2 })
                            else
                                handleBack()
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

                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Image source={require('../assets/anlene-icon.png')}></Image>
                    </View>

                    {/* Text Section*/}
                    <View style={{ marginTop: 10, }}>

                        <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 13, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>HOÀN THÀNH BÀI KIỂM TRA</Text>}>
                            <LinearGradient
                                colors={currentTheme?.headerTextColor}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                                <Text style={{ textAlign: "center", fontSize: 13, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold", marginBottom: 10 }}>HOÀN THÀNH BÀI KIỂM TRA</Text>
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
                        <TouchableOpacity disabled={!name || !phone || !checked} style={{ width: 140, height: 40, borderRadius: 20, backgroundColor: name && phone && checked ? 'rgba(183, 0, 2, 1)' : "gray", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>HOÀN THÀNH</Text>
                        </TouchableOpacity>
                    </View >


                </LinearGradient >
            </ScrollView>

        </SafeAreaView >
    )
}
export default SubmitScreen