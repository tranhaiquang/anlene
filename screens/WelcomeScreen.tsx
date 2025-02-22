import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import { WelcomeScreenProps } from '../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPage } from '../features/navigationSlice';

SplashScreen.preventAutoHideAsync();

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.navigation.currentPage);
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
        <LinearGradient colors={['rgb(15,73,13)', 'rgb(28,96,13)', 'rgb(38,117,12)', 'rgb(28,96,13)', 'rgb(15,73,13)']} locations={[0.1, 0.2, 0.3, 0.8, 0.9]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.pageText}>{"<"} Trang {currentPage}/6 {">"}</Text>
                <Image style={styles.icon} source={require('../assets/anlene-icon.png')} />
            </View>

            <View style={styles.contentContainer}>
                <MaskedView maskElement={<Text style={styles.title}>TẾT BẬN RỘN CƠ-XƯƠNG-KHỚP CÓ KHOẺ ĐỂ CHU TOÀN?</Text>}>
                    <LinearGradient colors={['rgba(186, 135, 44, 1)', 'rgba(232, 226, 118, 1)', 'rgba(225, 215, 112, 1)', 'rgba(136, 80, 33, 1)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <Text style={[styles.title, styles.hiddenText]}>TẾT BẬN RỘN CƠ-XƯƠNG-KHỚP CÓ KHOẺ ĐỂ CHU TOÀN?</Text>
                    </LinearGradient>
                </MaskedView>
                <Text style={styles.subtitle}>Trăm công nghìn việc dịp cận Tết mà cơ thể nhức mỏi, làm sao chu toàn?</Text>
                <Text style={styles.subtitle}>Ngay lúc này, hãy <Text style={styles.highlightText}>Kiểm tra Sức khoẻ Cơ-Xương-Khớp </Text>cùng Anlene để Tết này cả nhà vui khoẻ đón Tết, trọn vẹn niềm vui.</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image style={styles.backgroundImage} source={require('../assets/welcome-bg.png')} />
                <LinearGradient colors={['rgb(34, 117, 34)', 'transparent']} style={styles.topGradient} />
                <LinearGradient colors={['transparent', 'rgb(28,96,13)']} style={styles.bottomGradient} />
                <TouchableOpacity onPress={() => {
                    dispatch(setPage(currentPage + 1));
                    navigation.navigate("TestScreen", { pageNumber: currentPage });
                }} style={styles.button}>
                    <Text style={styles.buttonText}>KIỂM TRA NGAY</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Image resizeMode='contain' style={styles.groupIcon} source={require('../assets/group-icon.png')} />
                <Text style={styles.footerText}>Bài kiểm tra Cơ, Xương, Khớp này được phát triển bởi đội ngũ Anlene</Text>
                <View style={styles.footerNoteContainer}>
                    <Text style={styles.footerNote}>Lưu ý: Bài kiểm tra không dành cho đối tượng đang bị chấn thương hoặc có bệnh lý về cơ, xương, khớp hoặc tiểu đường</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 40 },
    topBar: { flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative" },
    pageText: { color: "white", fontSize: 14, fontFamily: "SVN-Gotham" },
    icon: { width: 80, resizeMode: "contain", position: "absolute", right: 20 },
    contentContainer: { marginTop: 20, paddingHorizontal: 18 },
    title: { textAlign: "center", fontSize: 25, fontFamily: "SVN-Gotham", fontWeight: "bold" },
    hiddenText: { opacity: 0 },
    subtitle: { textAlign: "center", fontSize: 12, fontFamily: "SVN-Gotham", color: "white" },
    highlightText: { color: "yellow" },
    imageContainer: { width: "100%", height: 400, overflow: "hidden", marginTop: 10 },
    backgroundImage: { width: "100%", height: "100%", resizeMode: "cover" },
    topGradient: { position: "absolute", top: 0, left: 0, right: 0, height: '10%' },
    bottomGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '12%' },
    button: { width: 220, height: 45, borderRadius: 40, backgroundColor: "rgba(183, 0, 2, 1)", borderWidth: 1, borderColor: "yellow", justifyContent: "center", alignItems: "center", position: "absolute", left: "24%", top: "85%" },
    buttonText: { color: "white", fontFamily: "SVN-Gotham", fontSize: 18 },
    footer: { marginTop: 10, paddingHorizontal: 10 },
    groupIcon: { height: 80, width: 300, alignSelf: "center" },
    footerText: { fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "center" },
    footerNoteContainer: { marginTop: 10, paddingHorizontal: 50 },
    footerNote: { fontFamily: "SVN-Gotham", fontSize: 10, color: "white", fontStyle: "italic", textAlign: "justify" }
});

export default WelcomeScreen;
