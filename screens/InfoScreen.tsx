import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { InfoScreenProps, RootStackParamList } from '../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPage } from '../features/navigationSlice';

type Props = StackScreenProps<RootStackParamList, "InfoScreen">;
SplashScreen.preventAutoHideAsync();

const InfoScreen: React.FC<InfoScreenProps> = ({ navigation, route }) => {
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
                    colors={[
                        'rgb(15,73,13)',
                        'rgb(28,96,13)',
                        'rgb(38,117,12)',
                        'rgb(28,96,13)',
                        'rgb(15,73,13)',
                    ]}
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
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerTitle}>THÔNG TIN SẢN PHẨM</Text>
                            <Text style={styles.headerSubtitle}>SỮA ANLENE 3 KHỎE</Text>
                        </View>
                    </View>

                    {/* Main Image Section */}
                    <View style={styles.mainImageContainer}>
                        <Image
                            resizeMode="contain"
                            style={styles.mainImage}
                            source={require('../assets/info-screen-img.png')}
                        />
                    </View>

                    {/* Text Section */}
                    <View style={styles.textSection}>
                        <Text style={styles.bodyText}>
                            Uống 2 ly Anlene mỗi ngày để bổ sung dinh dưỡng, tăng cường đề kháng đồng thời duy trì thói quen tập thể dục mỗi ngày để giúp hệ Cơ-Xương-Khớp chắc khoẻ, thoải mái tận hưởng cuộc sống năng động, chẳng ngại “rào cản” tuổi tác.
                        </Text>
                    </View>

                    {/* Image Box Section */}
                    <View style={styles.imageBoxSection}>
                        <Image
                            resizeMode="contain"
                            style={styles.imageBox}
                            source={require('../assets/info-screen-box1.png')}
                        />
                        <Image
                            resizeMode="contain"
                            style={styles.imageBox}
                            source={require('../assets/info-screen-box2.png')}
                        />
                        <Image
                            resizeMode="contain"
                            style={styles.imageBox}
                            source={require('../assets/info-screen-box3.png')}
                        />
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
        paddingHorizontal: 20,
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
        marginTop: 10,
        paddingHorizontal: 18,
    },
    headerTitleContainer: {
        gap: 8,
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
        color: 'rgb(236,210,74)',
    },
    headerSubtitle: {
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'SVN-Gotham',
        fontWeight: 'bold',
        color: 'rgb(236,210,74)',
    },
    mainImageContainer: {
        marginTop: 10,
    },
    mainImage: {
        height: 250,
        width: 350,
        resizeMode: 'contain',
    },
    textSection: {
        marginTop: 20,
    },
    bodyText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'SVN-Gotham',
        color: 'white',
    },
    imageBoxSection: {
        marginTop: 10,
        gap: 20,
    },
    imageBox: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
});

export default InfoScreen;
