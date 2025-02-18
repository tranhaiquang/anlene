import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { TestScreenProps } from '../navigation/types';
import Modal from 'react-native-modal';

SplashScreen.preventAutoHideAsync();

const TestScreen: React.FC<TestScreenProps> = ({ navigation, route }) => {
    const [loaded, error] = useFonts({
        'SVN-Gotham': require('../assets/fonts/SVN-Gotham Regular.otf'),
    });
    const [isYesBtnClicked, setYesBtnClick] = useState(false)
    const [isNoBtnClicked, setNoBtnClick] = useState(false)
    const [borderColor, setBorderColor] = useState("")
    const [isModalVisible, setModalVisible] = useState(false);
    const exercises = [
        {
            title: "KIỂM TRA CƠ",
            description: "Thẳng lưng trước ghế, đứng lên ngồi xuống 5 lần từ 6-10 giây",
            image: require("../assets/muscle-check-img.png"),
            options: ["Được", "Không được"]
        },
        {
            title: "KIỂM TRA XƯƠNG",
            description: "Duỗi 2 tay về phía trước, từ từ cúi xuống để chạm vào mũi bàn chân",
            image: require("../assets/bone-check-img.png"),
            options: ["Được", "Không được"]
        },
        {
            title: "KIỂM TRA KHỚP",
            description: "Đứng rộng chân, lưng thẳng đứng, tay đưa ra sau và đan vào nhau",
            image: require("../assets/joint-check-img.png"),
            options: ["Được", "Không được"]
        },
        {
            title: "KIỂM TRA SỨC ĐỀ KHÁNG",
            description: "6 tháng gần đây, bạn có gặp các triệu chứng: ho, sổ mũi, cảm sốt?",
            image: require("../assets/resistance-check-img.png"),
            options: ["Hiếm khi", "Nhiều lần"]
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

    const handleNavigateToSubmitScreen = () => {
        setModalVisible(false)
        const count = progress.filter(item => item.context === "no").length; // count number of exercises the user can't do
        const theme = count > 1 ? "gray" : count === 1 ? "yellow" : "green";
        navigation.navigate("SubmitScreen", { pageNumber: 3, theme: theme });
    }
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
                <TouchableOpacity onPress={() => {
                    if (currentStep == 0)
                        navigation.navigate("WelcomeScreen", { pageNumber: 1 })
                    else
                        handleBack()
                }} style={{ position: "absolute", right: 190 }}>
                    <AntDesign name="left" size={24} color="white"></AntDesign>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("WelcomeScreen", { pageNumber: 1 }) }} style={{ position: "absolute", left: 190 }}>
                    <Entypo name="home" color="white" size={24}></Entypo>
                </TouchableOpacity>
                <Text style={{ color: "white", fontSize: 14, fontFamily: "SVN-Gotham", textAlign: "center" }}>
                    {"<"} Trang {route.params.pageNumber}/6 {">"}
                </Text>
            </View>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ textAlign: "center", fontSize: 14, fontFamily: "SVN-Gotham", color: "white", fontWeight: "bold" }}>KIỂM TRA CƠ - XƯƠNG - KHỚP</Text>
            </View>

            {/* Progress Bar */}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.3)", padding: 12, borderRadius: 12, marginBottom: 10 }}>
                {progress.map((status, index) => (
                    <View key={index} style={{ flexDirection: "column", alignItems: "center", marginHorizontal: 16 }}>
                        <View style={{ borderWidth: 1, borderColor: "white", borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                            {
                                status.context == "no" ? (
                                    <AntDesign size={20} color="red" name="closecircle"></AntDesign>
                                ) : status.context == "yes" ? (
                                    <AntDesign size={20} color="green" name="checkcircle"></AntDesign>
                                ) : status.context == "waiting" ? (
                                    <View style={{ backgroundColor: "white", width: 20, height: 20, borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ backgroundColor: 'rgb(236,210,74)', width: 14, height: 14, borderRadius: 40 }}></View>
                                    </View>
                                ) : (
                                    <View style={{ width: 20, height: 20, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ textAlign: "center", fontSize: 12, fontFamily: "SVN-Gotham", color: "white", fontWeight: "light" }}>{status.context}</Text>
                                    </View>
                                )
                            }
                        </View>
                        <Text style={{ textAlign: "center", fontSize: 12, fontFamily: "SVN-Gotham", color: "white", fontWeight: "light" }}>
                            {status.title}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 10, paddingHorizontal: 18 }}>
                <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                        <Text style={{ color: "green", fontFamily: "SVN-Gotham", fontSize: 20, fontWeight: "bold" }}>CẢM ƠN</Text>
                        <Text style={{ fontFamily: "SVN-Gotham", textAlign: "center", marginTop: 10 }}>Bạn đã tham gia bài kiểm tra sức khoẻ. Hãy tiếp tục để có thể nhận kết quả kiểm tra sức khoẻ của bạn.</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10, gap: 30 }}>
                            <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ width: 120, height: 40, borderRadius: 20, borderColor: "rgb(183,0,2)", borderWidth: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "rgb(183,0,2)", fontFamily: "SVN-Gotham" }}>HỦY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNavigateToSubmitScreen} style={{ width: 120, height: 40, borderRadius: 20, backgroundColor: "rgb(183,0,2)", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <MaskedView maskElement={<Text style={{ textAlign: "center", fontSize: 18, fontFamily: "SVN-Gotham", fontWeight: "bold" }}>{exercises[currentStep].title}</Text>}>
                    <LinearGradient
                        colors={['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(136, 80, 33, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                        <Text style={{ textAlign: "center", fontSize: 18, fontFamily: "SVN-Gotham", opacity: 0, fontWeight: "bold", marginBottom: 10 }}>KIỂM TRA CƠ</Text>

                    </LinearGradient>

                </MaskedView>

                {/* Image Section*/}
                <View>
                    <Image resizeMode='contain' style={{ height: 300, width: 310, alignSelf: "center", borderColor: borderColor, borderWidth: borderColor == "" ? 0 : 2, borderRadius: 10 }} source={exercises[currentStep].image}></Image>
                    <View style={{ position: "absolute", right: -10, top: -10 }}>
                        {
                            borderColor != "" && (
                                <AntDesign size={40} color={borderColor} name={borderColor == "green" ? "checkcircle" : "closecircle"}></AntDesign>
                            )
                        }
                    </View>
                </View>
                <Text style={{ textAlign: "center", fontSize: 15, color: "white", fontFamily: "SVN-Gotham", marginHorizontal: 30, marginTop: 10 }}>{exercises[currentStep].description}</Text>
            </View >

            {/* Button Section*/}
            < View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, }
            }>
                <TouchableOpacity onPress={() => {
                    setYesBtnClick(true)
                    setNoBtnClick(false)
                    setBorderColor("green")
                    handleSelection("yes")
                }} style={{ width: 110, height: 120, borderWidth: isYesBtnClicked == true ? 2 : 0, borderColor: isYesBtnClicked == true ? "yellow" : "", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                    <Image resizeMode='contain' style={{ height: 40, width: 40 }} source={require('../assets/smile-icon.png')}></Image>
                    <Text style={{ color: "white", fontFamily: "SVN-Gotham", marginTop: 5 }}>{exercises[currentStep].options[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setNoBtnClick(true)
                    setYesBtnClick(false)
                    setBorderColor("red")
                    handleSelection("no")
                }} style={{ width: 110, height: 120, borderWidth: isNoBtnClicked == true ? 2 : 0, borderColor: isNoBtnClicked == true ? "yellow" : "", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", alignItems: "center" }}>
                    <Image resizeMode='contain' style={{ height: 40, width: 40 }} source={require('../assets/sad-icon.png')}></Image>
                    <Text style={{ color: "white", fontFamily: "SVN-Gotham", marginTop: 5 }}>{exercises[currentStep].options[1]}</Text>
                </TouchableOpacity>
            </View >

            {/* Submit Button Section*/}
            < View style={{ marginTop: 30 }}>
                <TouchableOpacity disabled={currentStep < 3 ? true : false} onPress={() => { setModalVisible(true) }} style={{ width: 140, height: 40, borderRadius: 20, backgroundColor: currentStep === exercises.length - 1 && (isNoBtnClicked || isYesBtnClicked) ? 'rgba(183, 0, 2, 1)' : "gray", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>Xác nhận</Text>
                </TouchableOpacity>
            </View >

            {/*Bottom Text Section*/}
            < View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "center", }}>*Lưu ý: Hãy dừng bài tập ngay nếu cảm thấy không thoải mái.</Text>
                <View style={{ paddingHorizontal: 50 }}>
                    <Text style={{ fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "justify" }}>Đảm bảo vị trí tập an toàn để không té ngã.</Text>
                </View>
            </View >

        </LinearGradient >


    )
}

export default TestScreen