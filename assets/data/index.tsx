import { AudioSource } from "expo-audio";
import { ColorValue } from "react-native";

type HadithBook =
  | "Bukhari"
  | "Muslim"
  | "Abu Dawud"
  | "At Tirmidi"
  | "Al Nasai"
  | "Ibn Majah";
type HadithGrade = "Sahi" | "Hasan" | "Daif";

export const HadithGradeColor: Record<HadithGrade, ColorValue> = {
  Sahi: "hsl(105, 70%, 50%)",
  Hasan: "hsl(50, 70%, 50%)",
  Daif: "hsl(0, 70%, 50%)",
};

export interface Quote {
  ar: string[];
  en: string[];
  ref: string | number;
  book: HadithBook | HadithBook[];
  grade: HadithGrade;

  link: string;
  tags?: string[];

  audio?: AudioSource;
}

export const QUOTES: Quote[] = [
  {
    ar: [
      "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
      "وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      "فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ",
      "فَهِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ",
      "وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا",
      "أَوْ امْرَأَةٍ يَنْكِحُهَا",
      "فَهِجْرَتُهُ إلَى مَا هَاجَرَ إلَيْهِ",
    ],
    en: [
      "Actions are judged by intentions.",
      "Every person will have what they intended.",
      "Whoever migrated to Allah and His Messenger,",
      "then his migration was to Allah and His Messenger.",
      "And whoever migrated for worldly gain,",
      "or for a woman he wished to marry,",
      "then his migration was for that which he migrated toward.",
    ],
    ref: "40-1",
    book: ["Muslim", "Bukhari"],
    grade: "Sahi",
    link: "https://sunnah.com/nawawi40",
    tags: ["40 Hadith"],
  },

  {
    ar: [
      "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ",
      "شَهَادَةِ أَنْ لَا إلَهَ إلَّا اللَّهُ",
      "وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
      "وَإِقَامِ الصَّلَاةِ",
      "وَإِيتَاءِ الزَّكَاةِ",
      "وَحَجِّ الْبَيْتِ",
      "وَصَوْمِ رَمَضَانَ",
    ],
    en: [
      "Islam is built upon five.",
      "Testifying that none has the right to be worshipped except Allah,",
      "and that Muhammad is the Messenger of Allah.",
      "Establishing the prayer.",
      "Giving the zakah.",
      "Performing pilgrimage to the House.",
      "And fasting Ramadan.",
    ],
    ref: "40-3",
    book: ["Bukhari", "Muslim"],
    grade: "Sahi",
    link: "https://sunnah.com/nawawi40",
    tags: ["40 Hadith"],
  },

  {
    ar: [
      "حُبِّبَ إِلَىَّ مِنَ الدُّنْيَا",
      "النِّسَاءُ وَالطِّيبُ",
      "وَجُعِلَ قُرَّةُ عَيْنِي",
      "فِي الصَّلاَةِ",
    ],
    en: [
      "From this world,",
      "women and perfume were made beloved to me.",
      "And the coolness of my eyes",
      "was placed in prayer.",
    ],
    ref: "n-3939",
    audio: require("@/assets/audio/n-3939.mp3"),
    book: "Al Nasai",
    grade: "Hasan",
    link: "https://sunnah.com/nasai/36",
    tags: ["women"],
  },

  {
    ar: [
      "يَا عَبْدَ اللَّهِ",
      "أَلَمْ أُخْبَرْ أَنَّكَ تَصُومُ النَّهَارَ",
      "وَتَقُومُ اللَّيْلَ",
      "فَلَا تَفْعَلْ",
      "صُمْ وَأَفْطِرْ",
      "وَقُمْ وَنَمْ",
      "فَإِنَّ لِجَسَدِكَ عَلَيْكَ حَقًّا",
      "وَإِنَّ لِعَيْنِكَ عَلَيْكَ حَقًّا",
      "وَإِنَّ لِزَوْجِكَ عَلَيْكَ حَقًّا",
    ],
    en: [
      "O Abdullah,",
      "have I not been informed that you fast all day,",
      "and stand in prayer all night?",
      "Do not do that.",
      "Fast sometimes and break your fast sometimes.",
      "Pray at night and also sleep.",
      "Your body has a right over you.",
      "Your eyes have a right over you.",
      "And your wife has a right over you.",
    ],
    book: "Bukhari",
    ref: "b-5199",
    audio: require("@/assets/audio/b-5199.m4a"),
    grade: "Sahi",
    link: "https://sunnah.com/bukhari:5199",
    tags: ["women"],
  },

  {
    ar: [
      "اللَّهُمَّ هَذَا فِعْلِي",
      "فِيمَا أَمْلِكُ",
      "فَلَا تَلُمْنِي",
      "فِيمَا تَمْلِكُ",
      "وَلَا أَمْلِكُ",
    ],
    en: [
      "O Allah, this is my effort",
      "regarding what I control.",
      "So do not blame me",
      "for what You control",
      "and I do not.",
    ],
    ref: "n-3943",
    audio: require("@/assets/audio/n-3943.mp3"),
    book: "Al Nasai",
    grade: "Sahi",
    link: "https://sunnah.com/nasai/36",
    tags: ["women", "dua"],
  },
];
