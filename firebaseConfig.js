import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/storage";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
//import "firebase/compat/auth";
//firebase의 확장 기능중에 필요한것이 있다면 주석을 해제하고 사용합니다.


const firebaseConfig = {
    apiKey: "AIzaSyCdLqCzI_e2N55PT_Vy_sc_iWtYbfcglfg",
    authDomain: "fatherdrum-ce9de.firebaseapp.com",
    databaseURL: "https://fatherdrum-ce9de-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fatherdrum-ce9de",
    storageBucket: "fatherdrum-ce9de.appspot.com",
    messagingSenderId: "118924778760",
    appId: "1:118924778760:web:2ed50eea5a55527d1ea0bd",
    measurementId: "G-X7QX9EB1NM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//외부 파일에서 사용할 수 있도록 firebase_db 라는 이름으로 export해준 것
//외부에서 firebase 내 database에 있는 정보를 요청하는 방법을 firebase.database() 로 정의해준것
export const firebase_db = firebase.database();