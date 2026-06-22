const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = "munozalbelonicolas@gmail.com";
const password = "prueba1234";

async function createAdmin() {
  try {
    console.log("Intentando crear el usuario...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("¡Usuario creado con éxito! UID:", userCredential.user.uid);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("El usuario ya existe. Intentando actualizar la contraseña...");
      try {
        // Para cambiar la contraseña con el SDK cliente, primero hay que iniciar sesión
        console.log("Por seguridad, si el usuario ya existe y fue creado con Google, no se puede cambiar la contraseña directamente sin el SDK de Admin. En ese caso, iniciá sesión con Google.");
        process.exit(1);
      } catch (loginError) {
        console.error("Error:", loginError.message);
        process.exit(1);
      }
    } else {
      console.error("Error creando el usuario:", error.message);
      process.exit(1);
    }
  }
}

createAdmin();
