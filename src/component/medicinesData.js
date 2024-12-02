import amoxicillinImage from '../images/medicine/أموكسيسيللين.jpg';
import Augmentin from '../images/medicine/أوجمنتين.jpg';
import Azithromycin from '../images/medicine/زيثروماكس.jpg';
import Cefotaxime from '../images/medicine/سيفوتاكسيم.jpg';
import Ciprofloxacin from '../images/medicine/سيبروفلوكساسين.png';
import Clarithromycin from '../images/medicine/كلاريثروميسين.jpg';
import Metronidazole from '../images/medicine/ميترونيدازول.jpg';
import Tetracycline from '../images/medicine/تيتراسيكلين.jpg';

import Paracetamol from '../images/medicine/باراسيتامول.jpg';
import Ibuprofen from '../images/medicine/بروفين.webp';
import Diclofenac from '../images/medicine/فولتارين.webp';
import Acetaminophen from '../images/medicine/الأسيتامينوفين.jpg';
import Naproxen from '../images/medicine/نابروكسين.png';
import Celecoxib from '../images/medicine/سيليكوكسيب.webp';

import Bisoprolol from '../images/medicine/كونكور.webp';
import Digoxin from '../images/medicine/ديجوكسين.jpg';
import Amiodarone from '../images/medicine/أميودارون.jpg';
import Warfarin from '../images/medicine/وارفارين.png';
import Clopidogrel from '../images/medicine/كلوبيدوجريل.jpg';

import Captopril from '../images/medicine/كابوتين.webp';
import Amlodipine from '../images/medicine/أملودبين.jpg';
import Losartan from '../images/medicine/لوزارتان.jpeg';
import Enalapril from '../images/medicine/إناﻻبريل.jpg';
import Valsartan from '../images/medicine/فالسارتان.jpg';

import Metformin from '../images/medicine/جلوكوفاج.webp';
import Glimepiride from '../images/medicine/أماريل.jpeg';
import Sitagliptin from '../images/medicine/جانوفيا.jpg';

import Loratadine from '../images/medicine/كلاريتين.png';
import Cetirizine from '../images/medicine/زيرتك.png';
import Fexofenadine from '../images/medicine/فيكسوفينادين.jpg';

import Esomeprazole from '../images/medicine/نيكسيوم.webp';
import Domperidone from '../images/medicine/موتيليوم.jpg';
import Metoclopramide from '../images/medicine/بريمبيران.jpg';

import VitaminD3 from '../images/medicine/فيتامين د.jpg';
import Calcium from '../images/medicine/كالسيوم.webp';
import Iron from '../images/medicine/حديد.webp';
import VitaminBComplex from '../images/medicine/فيتامين ب المركب.webp';
import VitaminC from '../images/medicine/فيتامين سي.png';
import Zinc from '../images/medicine/زنك.jpg';
import Magnesium from '../images/medicine/ماغنسيوم.webp';

export const medicinesData = [
    {
        category: "مضادات حيوية",
        medicines: [
            {
                id: 1,
                name: "أموكسيسيللين",
                scientificName: "Amoxicillin",
                dosageForm: "كبسولات",
                strength: "500mg",
                manufacturer: "فاركو",
                price: 25,
                image: amoxicillinImage
            },
            {
                id: 2,
                name: "أوجمنتين",
                scientificName: "Augmentin",
                dosageForm: "أقراص",
                strength: "1g",
                manufacturer: "جلاكسو سميثكلاين",
                price: 85,
                image: Augmentin
            },
            {
                id: 3,
                name: "زيثروماكس",
                scientificName: "Azithromycin",
                dosageForm: "كبسولات",
                strength: "250mg",
                manufacturer: "فايزر",
                price: 65,
                image: Azithromycin
            },
            {
                id: 4,
                name: "سيفوتاكسيم",
                scientificName: "Cefotaxime",
                dosageForm: "حقن",
                strength: "1g",
                manufacturer: "سانوفي",
                price: 120,
                image: Cefotaxime
            },
            {
                id: 5,
                name: "سيبروفلوكساسين",
                scientificName: "Ciprofloxacin",
                dosageForm: "أقراص",
                strength: "500mg",
                manufacturer: "باير",
                price: 45,
                image: Ciprofloxacin
            },
            {
                id: 6,
                name: "كلاريثروميسين",
                scientificName: "Clarithromycin",
                dosageForm: "أقراص",
                strength: "500mg",
                manufacturer: "أبوت",
                price: 75,
                image: Clarithromycin
            },
            {
                id: 7,
                name: "ميترونيدازول",
                scientificName: "Metronidazole",
                dosageForm: "أقراص",
                strength: "500mg",
                manufacturer: "نوفارتس",
                price: 35,
                image: Metronidazole
            },
            {
                id: 8,
                name: "تيتراسيكلين",
                scientificName: "Tetracycline",
                dosageForm: "كبسولات",
                strength: "250mg",
                manufacturer: "فايزر",
                price: 30,
                image: Tetracycline
            }
        ]
    },
    {
        category: "مسكنات الألم",
        medicines: [
            {
                id: 9,
                name: "باراسيتامول",
                scientificName: "Paracetamol",
                dosageForm: "أقراص",
                strength: "500mg",
                manufacturer: "فاركو",
                price: 15,
                image: Paracetamol
            },
            {
                id: 10,
                name: "بروفين",
                scientificName: "Ibuprofen",
                dosageForm: "أقراص",
                strength: "800mg",
                manufacturer: "إيبيكو",
                price: 250,
                image: Ibuprofen
            },
            {
                id: 11,
                name: "فولتارين",
                scientificName: "Diclofenac",
                dosageForm: "أقراص",
                strength: "50mg",
                manufacturer: "نوفارتس",
                price: 161,
                image: Diclofenac
            },
            {
                id: 12,
                name: "الأسيتامينوفين ",
                scientificName: "Acetaminophen",
                dosageForm: "كبسولات",
                strength: "50x0mg",
                manufacturer: "جرونينثال",
                price: 85,
                image: Acetaminophen
            },
            {
                id: 13,
                name: "نابروكسين",
                scientificName: "Naproxen",
                dosageForm: "أقراص",
                strength: "500mg",
                manufacturer: "روش",
                price: 55,
                image: Naproxen
            },
            {
                id: 14,
                name: "سيليكوكسيب",
                scientificName: "Celecoxib",
                dosageForm: "كبسولات",
                strength: "200mg",
                manufacturer: "فايزر",
                price: 120,
                image: Celecoxib
            }
        ]
    },
    {
        category: "أدوية القلب",
        medicines: [
            {
                id: 15,
                name: "كونكور",
                scientificName: "Bisoprolol",
                dosageForm: "أقراص",
                strength: "5mg",
                manufacturer: "ميرك",
                price: 237,
                image: Bisoprolol
            },
            {
                id: 16,
                name: "ديجوكسين",
                scientificName: "Digoxin",
                dosageForm: "أقراص",
                strength: "0.25mg",
                manufacturer: "نوفارتس",
                price: 35,
                image: Digoxin
            },
            {
                id: 17,
                name: "أميودارون",
                scientificName: "Amiodarone",
                dosageForm: "أقراص",
                strength: "200mg",
                manufacturer: "سانوفي",
                price: 180,
                image: Amiodarone
            },
            {
                id: 18,
                name: "وارفارين",
                scientificName: "Warfarin",
                dosageForm: "أقراص",
                strength: "5mg",
                manufacturer: "باير",
                price: 45,
                image: Warfarin
            },
            {
                id: 19,
                name: "كلوبيدوجريل",
                scientificName: "Clopidogrel",
                dosageForm: "أقراص",
                strength: "75mg",
                manufacturer: "سانوفي",
                price: 195,
                image: Clopidogrel
            }
        ]
    },
    {
        category: "أدوية الضغط",
        medicines: [
            {
                id: 20,
                name: "كابوتين",
                scientificName: "Captopril",
                dosageForm: "أقراص",
                strength: "25mg",
                manufacturer: "بريستول مايرز",
                price: 40,
                image: Captopril
            },
            {
                id: 21,
                name: "أملودبين",
                scientificName: "Amlodipine",
                dosageForm: "أقراص",
                strength: "5mg",
                manufacturer: "فايزر",
                price: 50,
                image: Amlodipine
            },
            {
                id: 22,
                name: "لوزارتان",
                scientificName: "Losartan",
                dosageForm: "أقراص",
                strength: "50mg",
                manufacturer: "ميرك",
                price: 65,
                image: Losartan
            },
            {
                id: 23,
                name: "إناﻻبريل",
                scientificName: "Enalapril",
                dosageForm: "أقراص",
                strength: "10mg",
                manufacturer: "ميرك",
                price: 55,
                image: Enalapril
            },
            {
                id: 24,
                name: "فالسارتان",
                scientificName: "Valsartan",
                dosageForm: "أقراص",
                strength: "80mg",
                manufacturer: "نوفارتس",
                price: 85,
                image: Valsartan
            }
        ]
    },
    {
        category: "أدوية السكري",
        medicines: [
            {
                id: 25,
                name: "جلوكوفاج",
                scientificName: "Metformin",
                dosageForm: "أقراص",
                strength: "500mg",
                manufacturer: "ميرك",
                price: 30,
                image: Metformin
            },
            {
                id: 26,
                name: "أماريل",
                scientificName: "Glimepiride",
                dosageForm: "أقراص",
                strength: "2mg",
                manufacturer: "سانوفي",
                price: 40,
                image: Glimepiride
            },
            {
                id: 27,
                name: "جانوفيا",
                scientificName: "Sitagliptin",
                dosageForm: "أقراص",
                strength: "100mg",
                manufacturer: "ميرك",
                price: 350,
                image: Sitagliptin
            }
        ]
    },
    {
        category: "مضادات الحساسية",
        medicines: [
            {
                id: 28,
                name: "كلاريتين",
                scientificName: "Loratadine",
                dosageForm: "أقراص",
                strength: "10mg",
                manufacturer: "شيرنج بلاو",
                price: 25,
                image: Loratadine
            },
            {
                id: 29,
                name: "زيرتك",
                scientificName: "Cetirizine",
                dosageForm: "أقراص",
                strength: "10mg",
                manufacturer: "يو سي بي",
                price: 35,
                image: Cetirizine
            },
            {
                id: 30,
                name: "فيكسوفينادين",
                scientificName: "Fexofenadine",
                dosageForm: "أقراص",
                strength: "120mg",
                manufacturer: "سانوفي",
                price: 45,
                image: Fexofenadine
            }
        ]
    },
    {
        category: "أدوية الجهاز الهضمي",
        medicines: [
            {
                id: 31,
                name: "نيكسيوم",
                scientificName: "Esomeprazole",
                dosageForm: "كبسولات",
                strength: "40mg",
                manufacturer: "أسترازينيكا",
                price: 120,
                image: Esomeprazole
            },
            {
                id: 32,
                name: "موتيليوم",
                scientificName: "Domperidone",
                dosageForm: "أقراص",
                strength: "10mg",
                manufacturer: "جانسن",
                price: 35,
                image: Domperidone
            },
            {
                id: 33,
                name: "بريمبيران",
                scientificName: "Metoclopramide",
                dosageForm: "أقراص",
                strength: "10mg",
                manufacturer: "سانوفي",
                price: 15,
                image: Metoclopramide
            }
        ]
    },
    {
        category: "فيتامينات ومكملات",
        medicines: [
            {
                id: 34,
                name: "فيتامين د",
                scientificName: "Vitamin D3",
                dosageForm: "كبسولات",
                strength: "50000IU",
                manufacturer: "فاركو",
                price: 35,
                image: VitaminD3
            },
            {
                id: 35,
                name: "كالسيوم",
                scientificName: "Calcium",
                dosageForm: "أقراص",
                strength: "600mg",
                manufacturer: "فاركو",
                price: 45,
                image: Calcium
            },
            {
                id: 36,
                name: "حديد",
                scientificName: "Iron",
                dosageForm: "أقراص",
                strength: "65mg",
                manufacturer: "نوفارتس",
                price: 40,
                image: Iron
            },
            {
                id: 37,
                name: "فيتامين ب المركب",
                scientificName: "Vitamin B Complex",
                dosageForm: "أقراص",
                strength: "Multiple",
                manufacturer: "إيبيكو",
                price: 30,
                image: VitaminBComplex
            },
            {
                id: 38,
                name: "فيتامين سي",
                scientificName: "Vitamin C",
                dosageForm: "أقراص",
                strength: "1000mg",
                manufacturer: "فاركو",
                price: 25,
                image: VitaminC
            },
            {
                id: 39,
                name: "زنك",
                scientificName: "Zinc",
                dosageForm: "أقراص",
                strength: "50mg",
                manufacturer: "سيديكو",
                price: 35,
                image: Zinc
            },
            {
                id: 40,
                name: "ماغنسيوم",
                scientificName: "Magnesium",
                dosageForm: "أقراص",
                strength: "400mg",
                manufacturer: "فاركو",
                price: 40,
                image: Magnesium
            }
        ]
    }
];
