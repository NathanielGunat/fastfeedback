import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: 'fast-feedback-demo-c0357.appspot.com',
  messagingSenderId: '849906821201',
  appId: '1:849906821201:web:f06e7b4b06ec554af0b070',
}

export const firebaseApp = initializeApp(firebaseConfig)
