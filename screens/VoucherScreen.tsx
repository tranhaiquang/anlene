import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import { VoucherScreenProps } from '../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
                <LinearGradient
                    colors={['rgb(15,73,13)', 'rgb(28,96,13)', 'rgb(38,117,12)', 'rgb(28,96,13)', 'rgb(15,73,13)']}
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
                                dispatch(setPage(1));
                                navigation.navigate("WelcomeScreen", { pageNumber: currentPage });
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
                            source={require('../assets/anlene-icon.png')}
                        />
                    </View>

                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <MaskedView
                            maskElement={
                                <Text style={styles.maskedHeaderText}>
                                    CHĂM SÓC CƠ-XƯƠNG-KHỚP
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={[
                                    'rgba(186, 135, 44, 1)',
                                    'rgba(232, 226, 118, 1)',
                                    'rgba(225, 215, 112, 1)',
                                    'rgba(136, 80, 33, 1)',
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text
                                    style={{
                                        ...styles.maskedHeaderText,
                                        opacity: 0,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    CHĂM SÓC CƠ-XƯƠNG-KHỚP
                                </Text>
                            </LinearGradient>
                        </MaskedView>

                        <MaskedView
                            maskElement={
                                <Text style={styles.maskedSubHeaderText}>
                                    NHẬN LỘC SỨC KHỎE TỪ ANLENE
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={[
                                    'rgba(186, 135, 44, 1)',
                                    'rgba(232, 226, 118, 1)',
                                    'rgba(225, 215, 112, 1)',
                                    'rgba(136, 80, 33, 1)',
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text
                                    style={{
                                        ...styles.maskedSubHeaderText,
                                        opacity: 0,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    NHẬN LỘC SỨC KHỎE TỪ ANLENE
                                </Text>
                            </LinearGradient>
                        </MaskedView>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}>
                                ANLENE LÌ XÌ NGAY 100.000đ KHI ĐẶT MUA HÔM NAY!
                            </Text>
                            <Text style={styles.infoText}>
                                Hạn sử dụng: 25/07/2021 - 31/07/2021
                            </Text>
                        </View>
                    </View>

                    {/* Voucher Image Section */}
                    <View style={styles.voucherImageContainer}>
                        <Image style={styles.voucherImage} source={require('../assets/voucher-bg.png')} />
                        <LinearGradient
                            colors={['rgb(34, 117, 34)', 'transparent']}
                            style={styles.gradientTop}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgb(28,96,13)']}
                            style={styles.gradientBottom}
                        />
                    </View>

                    {/* Voucher Box */}
                    <View style={styles.voucherBox}>
                        <View style={styles.voucherBoxHeader}>
                            <Text style={styles.voucherHeaderText}>MÃ GIẢM GIÁ</Text>
                            <Text style={styles.voucherCodeText}>ANLENANMUMW88YQI</Text>
                        </View>
                        <View style={styles.voucherBoxFooter}>
                            <MaskedView
                                maskElement={
                                    <Text style={styles.maskedVoucherFooterText}>
                                        ÁP DỤNG TẠI
                                    </Text>
                                }
                            >
                                <LinearGradient
                                    colors={[
                                        'rgba(186, 135, 44, 1)',
                                        'rgba(232, 226, 118, 1)',
                                        'rgba(225, 215, 112, 1)',
                                        'rgba(136, 80, 33, 1)',
                                    ]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text
                                        style={{
                                            ...styles.maskedVoucherFooterText,
                                            opacity: 0,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        ÁP DỤNG TẠI
                                    </Text>
                                </LinearGradient>
                            </MaskedView>
                            <Image
                                resizeMode="contain"
                                style={{ width: '40%' }}
                                source={require('../assets/lazada-icon.png')}
                            />
                        </View>
                    </View>

                    {/* Button Section */}
                    <View style={styles.buttonSection}>
                        <TouchableOpacity style={styles.promoButton}>
                            <Text style={styles.promoButtonText}>MUA NGAY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setPage(currentPage + 1));
                                navigation.navigate("InfoScreen", { pageNumber: currentPage });
                            }}
                            style={styles.infoButton}
                        >
                            <Text style={styles.infoButtonText}>Tìm hiểu ngay</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Text Section */}
                    <View style={styles.bottomTextSection}>
                        <Text style={styles.bottomText}>
                            * Voucher chỉ áp dụng cho đơn hàng mua các sản phẩm Anlene Gold 3X, Anlene Gold 5X tại gian hàng Fonterra Official Retail Store trên Lazada
                        </Text>
                        <View style={{ marginTop: 6, paddingHorizontal: 40 }}>
                            <Text style={styles.bottomText}>
                                * Voucher chỉ áp dụng cho đơn hàng có giá trị từ 200.000đ
                            </Text>
                        </View>
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
    headerSection: {
        marginTop: 20,
        paddingHorizontal: 18,
    },
    maskedHeaderText: {
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
    },
    maskedSubHeaderText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
    },
    infoTextContainer: {
        marginTop: 10,
    },
    infoText: {
        textAlign: 'left',
        fontSize: 12,
        fontFamily: 'SVN-Gotham',
        color: 'white',
    },
    voucherImageContainer: {
        width: '100%',
        height: 400,
        overflow: 'hidden',
        marginTop: 10,
    },
    voucherImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradientTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '10%',
    },
    gradientBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '12%',
    },
    voucherBox: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        left: '15%',
        top: '70%',
    },
    voucherBoxHeader: {
        padding: 6,
        backgroundColor: 'white',
        borderRadius: 8,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voucherHeaderText: {
        color: 'rgb(115,164,66)',
        fontFamily: 'SVN-Gotham',
        fontSize: 12,
    },
    voucherCodeText: {
        color: 'rgb(71,132,73)',
        fontFamily: 'SVN-Gotham',
        fontSize: 16,
        fontWeight: 'bold',
    },
    voucherBoxFooter: {
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    maskedVoucherFooterText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
    },
    buttonSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        gap: 10,
    },
    promoButton: {
        width: 180,
        height: 50,
        borderRadius: 40,
        backgroundColor: 'rgba(183, 0, 2, 1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoButtonText: {
        color: 'white',
        fontFamily: 'SVN-Gotham',
        fontSize: 18,
    },
    infoButton: {
        width: 180,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgb(115,164,66)',
    },
    infoButtonText: {
        color: 'rgb(115,164,66)',
        fontFamily: 'SVN-Gotham',
        fontSize: 16,
    },
    bottomTextSection: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    bottomText: {
        fontFamily: 'SVN-Gotham',
        fontSize: 10,
        color: 'white',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default VoucherScreen;
