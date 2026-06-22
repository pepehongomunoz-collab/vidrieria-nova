import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Product } from "@/types/product"

const COLLECTION_NAME = "products"

export async function getProducts(): Promise<Product[]> {
  if (!db) return []
  const productsRef = collection(db, COLLECTION_NAME)
  const q = query(productsRef, orderBy("name"))
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product))
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!db) return null
  const docRef = doc(db, COLLECTION_NAME, id)
  const snapshot = await getDoc(docRef)
  
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() } as Product
}

export async function createProduct(product: Omit<Product, "id">): Promise<string> {
  if (!db) throw new Error("Firestore not initialized")
  
  // Si no se provee un ID, Firestore genera uno, pero queremos poder asignar un custom ID o slug como ID idealmente
  // Aquí usamos doc() con collection reference para auto-generar ID
  const newDocRef = doc(collection(db, COLLECTION_NAME))
  
  const productData = {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  
  await setDoc(newDocRef, productData)
  return newDocRef.id
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  if (!db) throw new Error("Firestore not initialized")
  const docRef = doc(db, COLLECTION_NAME, id)
  
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteProduct(id: string): Promise<void> {
  if (!db) throw new Error("Firestore not initialized")
  const docRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(docRef)
}
