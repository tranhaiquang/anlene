import { StackScreenProps } from "@react-navigation/stack";

// Define the screen params
export type RootStackParamList = {
    WelcomeScreen: { pageNumber: number };
    TestScreen: { pageNumber: number };
    SubmitScreen: { pageNumber: number; theme: string };
    PromoScreen: { pageNumber: number, theme: string }
};

// Define props for each screen
export type WelcomeScreenProps = StackScreenProps<RootStackParamList, "WelcomeScreen">;
export type TestScreenProps = StackScreenProps<RootStackParamList, "TestScreen">;
export type SubmitScreenProps = StackScreenProps<RootStackParamList, "SubmitScreen">;
export type PromoScreenProps = StackScreenProps<RootStackParamList, "PromoScreen">;
