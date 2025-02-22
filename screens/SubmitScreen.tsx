import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { SubmitScreenProps } from '../navigation/types';
import Checkbox from 'expo-checkbox';
import Modal from 'react-native-modal';
import { addUser } from '../firebase/firebaseService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPage } from '../features/navigationSlice';

SplashScreen.preventAutoHideAsync();

const SubmitScreen: React.FC<SubmitScreenProps> = ({ navigation, route }) => {
    const [loaded, error] = useFonts({
        'SVN-Gotham': require('../assets/fonts/SVN-Gotham Regular.otf'),
    });
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.navigation.currentPage);
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [nameInputWarning, setNameInputWarning] = useState("");
    const [phoneInputWarning, setPhoneInputWarning] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    type Theme = {
        name: string;
        backgroundColor: [string, string, ...string[]];
        headerText: string;
        headerTextColor: [string, string, ...string[]];
        bodyText: string;
        color: string;
    };

    const themes: Theme[] = [
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
    ];

    const currentTheme = themes.find(t => t.name === route.params.theme);

    const validateNameInput = (text: string) => {
        setFullName(text);
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
        } else if (text.length !== 10) {
            setPhoneInputWarning("Số điện thoại phải có 10 số");
        } else {
            setPhoneInputWarning("");
        }
    };

    const validateEmailInput = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailRegex.test(text) ? setEmail(text) : setEmail("");
    };

    const handleSubmit = async () => {
        try {
            const docId = await addUser({ fullName, phone, email });
            setMessage(`User added with ID: ${docId}`);
        } catch (error) {
            setMessage("Error adding user.");
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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}
            >
                <LinearGradient
                    colors={
                        currentTheme?.backgroundColor ??
                        ['rgb(15,73,13)', 'rgb(28,96,13)', 'rgb(38,117,12)', 'rgb(28,96,13)', 'rgb(15,73,13)']
                    }
                    locations={[0.1, 0.2, 0.3, 0.8, 0.9]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.container}
                >
                    {/* Top Bar */}
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setPage(currentPage - 1));
                                navigation.goBack();
                            }}
                            style={styles.backButton}
                        >
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.topBarText}>
                            {"<"} Trang {currentPage}/6 {">"}
                        </Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.homeButton}>
                            <Entypo name="home" color="white" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 40, width: 120 }}
                            source={require('../assets/anlene-icon.png')}
                        />
                    </View>

                    {/* Text Section */}
                    <View style={styles.textSection}>
                        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>THÔNG BÁO!</Text>
                                <Text style={styles.modalMessage}>
                                    Bạn có muốn huỷ bỏ kết quả kiểm tra sức khoẻ trước đó không?
                                </Text>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.modalCancelButton}
                                    >
                                        <Text style={{ color: "rgb(183,0,2)", fontFamily: "SVN-Gotham" }}>HỦY</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false);
                                            dispatch(setPage(1));
                                            navigation.navigate("WelcomeScreen", { pageNumber: currentPage });
                                        }}
                                        style={styles.modalAgreeButton}
                                    >
                                        <Text style={{ color: "white", fontFamily: "SVN-Gotham" }}>ĐỒNG Ý</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <MaskedView
                            maskElement={
                                <Text style={styles.maskText}>
                                    HOÀN THÀNH BÀI KIỂM TRA
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={
                                    currentTheme?.headerTextColor ??
                                    ['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(186, 135, 44, 1)']
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text style={{ ...styles.maskText, opacity: 0, marginBottom: 10 }}>
                                    HOÀN THÀNH BÀI KIỂM TRA
                                </Text>
                            </LinearGradient>
                        </MaskedView>

                        <MaskedView
                            maskElement={
                                <Text style={styles.maskTextLarge}>
                                    {currentTheme?.headerText}
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={
                                    currentTheme?.headerTextColor ??
                                    ['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(186, 135, 44, 1)']
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text style={{ ...styles.maskTextLarge, opacity: 0, marginBottom: 10 }}>
                                    XIN CHÚC MỪNG
                                </Text>
                            </LinearGradient>
                        </MaskedView>

                        <Text style={styles.bodyText}>
                            {currentTheme?.bodyText}
                        </Text>
                        <Text style={styles.descriptionText}>
                            Điền thông tin bên dưới để xem đầy đủ kết quả và nhận ngay Voucher ưu đãi lên đến 100.000đ từ Anlene.
                        </Text>
                    </View>

                    {/* Text Input Section */}
                    <View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputLabel}>
                                Họ tên:
                                <Text style={{ color: currentTheme?.color }}>*</Text>
                            </Text>
                            <TextInput
                                onChangeText={validateNameInput}
                                placeholder="Nhập họ và tên"
                                placeholderTextColor="rgb(201,201,201)"
                                style={[
                                    styles.textInput,
                                    { borderColor: nameInputWarning ? currentTheme?.color : "white" }
                                ]}
                            />
                            {nameInputWarning ? (
                                <Text style={[styles.warningText, { color: currentTheme?.color }]}>
                                    {nameInputWarning}
                                </Text>
                            ) : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputLabel}>
                                Số điện thoại:
                                <Text style={{ color: currentTheme?.color }}>*</Text>
                            </Text>
                            <TextInput
                                keyboardType="numeric"
                                onChangeText={validatePhoneInput}
                                placeholder="Nhập số điện thoại"
                                placeholderTextColor="rgb(201,201,201)"
                                style={[
                                    styles.textInput,
                                    { borderColor: phoneInputWarning ? currentTheme?.color : "white" }
                                ]}
                            />
                            {phoneInputWarning ? (
                                <Text style={[styles.warningText, { color: currentTheme?.color }]}>
                                    {phoneInputWarning}
                                </Text>
                            ) : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputLabel}>Email:</Text>
                            <TextInput
                                placeholder="Nhập email"
                                onChangeText={validateEmailInput}
                                placeholderTextColor="rgb(201,201,201)"
                                style={styles.textInputEmail}
                            />
                        </View>
                        <View style={styles.checkboxRow}>
                            <Checkbox value={checked} onValueChange={() => setChecked(!checked)} />
                            <Text style={styles.termsText}>
                                Tôi đồng ý để Anlene Vietnam liên hệ trong bất kỳ chương trình quảng cáo sản phẩm hay khuyến mãi nào
                            </Text>
                        </View>
                    </View>

                    <View style={styles.disclaimer}>
                        <Text style={styles.disclaimerText}>
                            Bằng cách điền bảng thông tin này, tôi đồng ý với việc thông tin của mình để xử lý dựa trên chính sách bảo mật của Anlene
                        </Text>
                    </View>

                    {/* Submit Button Section */}
                    <View style={styles.submitButtonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setPage(currentPage + 1));
                                navigation.navigate("PromoScreen", { pageNumber: currentPage, theme: "green" });
                                // handleSubmit() can be invoked here if needed.
                            }}
                            disabled={!fullName || !phone || !checked}
                            style={[
                                styles.submitButton,
                                { backgroundColor: fullName && phone && checked ? 'rgba(183, 0, 2, 1)' : "gray" }
                            ]}
                        >
                            <Text style={styles.submitButtonText}>HOÀN THÀNH</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingVertical: 40,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        right: 190,
    },
    homeButton: {
        position: 'absolute',
        left: 190,
    },
    topBarText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
    },
    iconContainer: {
        marginTop: 10,
    },
    textSection: {
        marginTop: 10,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        color: 'green',
        fontFamily: 'SVN-Gotham',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalMessage: {
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
        marginTop: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 30,
    },
    modalCancelButton: {
        width: 120,
        height: 40,
        borderRadius: 20,
        borderColor: 'rgb(183,0,2)',
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalAgreeButton: {
        width: 120,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgb(183,0,2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    maskText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    maskTextLarge: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bodyText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        fontFamily: 'SVN-Gotham',
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontFamily: 'SVN-Gotham',
        marginTop: 10,
    },
    inputLabel: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
        marginLeft: 2,
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 320,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    textInputEmail: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 320,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    warningText: {
        fontFamily: 'SVN-Gotham',
        fontSize: 12,
    },
    checkboxRow: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    termsText: {
        color: 'white',
        fontFamily: 'SVN-Gotham',
        fontSize: 12,
        textAlign: 'justify',
        flexShrink: 1,
        width: '90%',
    },
    disclaimer: {
        marginTop: 10,
    },
    disclaimerText: {
        fontFamily: 'SVN-Gotham',
        color: 'rgb(212,228,206)',
        fontSize: 10,
        fontStyle: 'italic',
    },
    submitButtonContainer: {
        marginTop: 20,
    },
    submitButton: {
        width: 140,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontFamily: 'SVN-Gotham',
    },
});

export default SubmitScreen;
