import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
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
    const [showHiddenText, setHiddenText] = useState(false);

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
        imageSource: number;
    };

    const themes: Theme[] = [
        {
            name: "green",
            backgroundColor: [
                "rgb(15,73,13)",
                "rgb(28,96,13)",
                "rgb(38,117,12)",
                "rgb(28,96,13)",
                "rgb(15,73,13)",
            ],
            secondaryColor: [
                "rgb(253, 182, 60)",
                "rgba(232, 226, 118, 1)",
                "rgba(225, 215, 112, 1)",
                "rgb(253, 182, 60)",
            ],
            headerText: "XIN CHÚC MỪNG!",
            headerTextColor: [
                "rgba(186, 135, 44, 1)",
                "rgba(232, 226, 118, 1)",
                "rgba(225, 215, 112, 1)",
                "rgba(186, 135, 44, 1)",
            ],
            bodyText:
                "Bạn có một hệ Cơ-Xương-Khớp linh hoạt và có vẻ sức đề kháng của bạn cũng tốt. Cố gắng duy trì thể trạng tốt này nhé. Vì sau tuổi 40, sức khoẻ Cơ-Xương-Khớp có thể bị suy giảm.",
            miniText:
                "Tác động này có thể tạo ra những cơn đau nhức mỏi ảnh hưởng đến vận động hằng ngày.",
            bottomText:
                "Cùng Anlene giúp bạn chăm sóc sức khoẻ Cơ-Xương-Khớp ngay hôm nay với Ưu đãi hấp dẫn đang chờ bạn!",
            buttonText: "MUA NGAY",
            color: "yellow",
            imageSource: require("../assets/promo-screen-img-green.png"),
        },
        {
            name: "yellow",
            backgroundColor: [
                "rgb(253, 182, 60)",
                "rgba(232, 226, 118, 1)",
                "rgba(225, 215, 112, 1)",
                "rgb(253, 182, 60)",
            ],
            secondaryColor: [
                "rgb(15,73,13)",
                "rgb(28,96,13)",
                "rgb(38,117,12)",
                "rgb(28,96,13)",
                "rgb(15,73,13)",
            ],
            headerText: "LƯU Ý MỘT CHÚT!",
            headerTextColor: [
                "rgb(15,73,13)",
                "rgb(28,96,13)",
                "rgb(38,117,12)",
                "rgb(28,96,13)",
                "rgb(15,73,13)",
            ],
            bodyText:
                "Có vẻ bạn đang có sức đề kháng tốt nhưng cần chú ý đến hệ vận động hơn nhé vì sau tuổi 40 sức khoẻ Cơ-Xương-Khớp có thể bị suy giảm: ",
            miniText:
                "Rào cản vận động này có thể mang đến những cơn đau nhức mỏi không mong muốn.",
            bottomText:
                "Ngay từ bây giờ, cùng Anlene giúp bạn chăm sóc sức khoẻ Cơ-Xương-Khớp ngay hôm nay với Ưu đãi hấp dẫn đang chờ bạn!",
            buttonText: "MUA NGAY",
            color: "green",
            imageSource: require("../assets/promo-screen-img-yellow.png"),
        },
        {
            name: "gray",
            backgroundColor: [
                "rgb(150,150,150)",
                "rgb(150,150,150)",
                "rgb(150,150,150)",
                "rgb(150,150,150)",
                "rgb(150,150,150)",
            ],
            secondaryColor: [
                "rgb(253, 182, 60)",
                "rgba(232, 226, 118, 1)",
                "rgba(225, 215, 112, 1)",
                "rgb(253, 182, 60)",
            ],
            headerText: "HÃY CẨN THẬN!",
            headerTextColor: [
                "rgb(223,30,19)",
                "rgb(223,30,19)",
                "rgb(223,30,19)",
                "rgb(223,30,19)",
                "rgb(223,30,19)",
            ],
            bodyText:
                "Tuy rằng có vẻ bạn đang có đề kháng tốt nhưng cần quan tâm đến hệ vận động nhiều hơn nhé, bởi sau tuổi 40, sức khoẻ Cơ- Xương - Khớp suy giảm: ",
            miniText:
                "Bạn có thể sẽ phải đối mặt với những cơn đau nhức mỏi thường xuyên, gây khó khăn trong vận động và sinh hoạt hằng ngày.",
            bottomText:
                "Đừng chậm trễ, cùng Anlene giúp bạn chăm sóc sức khoẻ Cơ-Xương-Khớp ngay hôm nay với Ưu đãi hấp dẫn đang chờ bạn!",
            color: "yellow",
            buttonText: "NHẬN NGAY",
            imageSource: require("../assets/promo-screen-img-green.png"),
        },
    ];

    const currentTheme = themes.find(t => t.name === route.params.theme);

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
                        currentTheme?.backgroundColor ?? [
                            "rgb(15, 73, 13)",
                            "rgb(28, 96, 13)",
                            "rgb(38, 117, 12)",
                            "rgb(28, 96, 13)",
                            "rgb(15, 73, 13)",
                        ]
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
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("WelcomeScreen", { pageNumber: 1 });
                            }}
                            style={styles.homeButton}
                        >
                            <Entypo name="home" color="white" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 40, width: 120 }}
                            source={require("../assets/anlene-icon.png")}
                        />
                    </View>

                    {/* Main Section */}
                    <View style={styles.mainSection}>
                        {/* Header Text */}
                        <MaskedView
                            maskElement={
                                <Text style={styles.maskedHeaderText}>
                                    {currentTheme?.headerText}
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={
                                    currentTheme?.headerTextColor ?? [
                                        "rgba(186, 135, 44, 1)",
                                        "rgba(232, 226, 118, 1)",
                                        "rgba(225, 215, 112, 1)",
                                        "rgba(186, 135, 44, 1)",
                                    ]
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text
                                    style={{
                                        ...styles.maskedHeaderText,
                                        opacity: 0,
                                        fontWeight: "bold",
                                    }}
                                >
                                    XIN CHÚC MỪNG
                                </Text>
                            </LinearGradient>
                        </MaskedView>

                        {/* Body Text */}
                        <Text style={styles.bodyText}>
                            {currentTheme?.bodyText}
                        </Text>
                        <Image
                            resizeMode="contain"
                            style={styles.groupImage}
                            source={require("../assets/group-img-green.png")}
                        />

                        {/* Mini Text */}
                        <Text style={styles.miniText}>{currentTheme?.miniText}</Text>

                        {/* Main Image */}
                        <Image
                            resizeMode="contain"
                            style={styles.mainImage}
                            source={currentTheme?.imageSource}
                        />
                        <View style={styles.captionContainer}>
                            <Text style={styles.captionText}>
                                *Mỗi 10 năm. Nguồn: Daly et al., 2013. BMC Geriatrics 13:71
                            </Text>
                            <Text style={styles.captionText}>
                                **Mỗi 5-7 năm sau khi mãn kinh. Nguồn: National Osteoporosis Foundation (2009). Hormones and Healthy Bones
                            </Text>
                        </View>

                        <MaskedView
                            maskElement={
                                <Text style={styles.maskedSectionTitle}>
                                    LỰA CHỌN GIÚP CƠ-XƯƠNG-KHỚP CHẮC KHOẺ
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={
                                    currentTheme?.secondaryColor ?? [
                                        "rgba(186, 135, 44, 1)",
                                        "rgba(232, 226, 118, 1)",
                                        "rgba(225, 215, 112, 1)",
                                        "rgba(186, 135, 44, 1)",
                                    ]
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text
                                    style={{
                                        ...styles.maskedSectionTitle,
                                        opacity: 0,
                                        fontWeight: "bold",
                                    }}
                                >
                                    LỰA CHỌN GIÚP CƠ-XƯƠNG-KHỚP CHẮC KHOẺ
                                </Text>
                            </LinearGradient>
                        </MaskedView>

                        {/* Bottom Text */}
                        <Text style={styles.bottomText}>{currentTheme?.bottomText}</Text>
                        {!showHiddenText && (
                            <TouchableOpacity onPress={() => setHiddenText(true)}>
                                <MaskedView
                                    maskElement={
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: 12,
                                                fontFamily: "SVN-Gotham",
                                                marginTop: 6,
                                                textDecorationLine: "underline",
                                            }}
                                        >
                                            Xem thêm
                                        </Text>
                                    }
                                >
                                    <LinearGradient
                                        colors={
                                            currentTheme?.secondaryColor ?? [
                                                "rgba(186, 135, 44, 1)",
                                                "rgba(232, 226, 118, 1)",
                                                "rgba(225, 215, 112, 1)",
                                                "rgba(186, 135, 44, 1)",
                                            ]
                                        }
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: 12,
                                                fontFamily: "SVN-Gotham",
                                                opacity: 0,
                                                fontWeight: "bold",
                                                marginBottom: 10,
                                                textDecorationLine: "underline",
                                            }}
                                        >
                                            Xem thêm
                                        </Text>
                                    </LinearGradient>
                                </MaskedView>
                            </TouchableOpacity>
                        )}
                        {showHiddenText && (
                            <Text style={styles.hiddenText}>
                                *Anlene 3 Khoẻ với công thức MovePro chứa các dưỡng chất Đạm, Canxi, Collagen cùng các Vitamin, Khoáng chất giúp Cơ-Xương-Khớp chắc khỏe và tăng sức đề kháng, cho bạn thoải mái vận động, tận hưởng cuộc sống.
                            </Text>
                        )}
                    </View>

                    {/* Button Section */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setPage(currentPage + 1));
                                navigation.navigate("VoucherScreen", { pageNumber: currentPage });
                            }}
                            style={styles.promoButton}
                        >
                            <Text style={styles.promoButtonText}>
                                {currentTheme?.buttonText}
                            </Text>
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
    topBarText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
    },
    homeButton: {
        position: 'absolute',
        left: 190,
    },
    iconContainer: {
        marginTop: 10,
    },
    mainSection: {
        marginTop: 10,
    },
    maskedHeaderText: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
    },
    bodyText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        fontFamily: 'SVN-Gotham',
        marginTop: 10,
    },
    groupImage: {
        alignSelf: 'center',
        height: 140,
        width: 340,
    },
    miniText: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        fontFamily: 'SVN-Gotham',
    },
    mainImage: {
        alignSelf: 'center',
        height: 300,
        width: 320,
    },
    captionContainer: {
        paddingHorizontal: 50,
    },
    captionText: {
        textAlign: 'center',
        fontSize: 6,
        color: 'white',
        fontFamily: 'SVN-Gotham',
        fontStyle: 'italic',
    },
    maskedSectionTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
    },
    bottomText: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        fontFamily: 'SVN-Gotham',
    },
    hiddenText: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 10,
    },
    promoButton: {
        width: 140,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(183, 0, 2, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'yellow',
    },
    promoButtonText: {
        color: 'white',
        fontFamily: 'SVN-Gotham',
        fontSize: 16,
    },
});

export default PromoScreen;
