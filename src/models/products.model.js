import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

const productsCollection = collection(db, "productos");

export const findAll = async (categoryId) => {
  const productsSnapshot = await getDocs(productsCollection);
  const productos = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (!categoryId) {
    return productos;
  }
  return productos.filter((item) => item.categoryId === parseInt(categoryId));
};

export const findById = async (id) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() };
};

export const create = async ({ nombre, precio, categoryId }) => {
  const productRef = await addDoc(productsCollection, {
    nombre,
    precio,
    categoryId,
  });

  return { id: productRef.id, nombre, precio, categoryId };
};

export const remove = async (id) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  await deleteDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
};

export const update = async (id, { nombre, precio, categoryId }) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  await updateDoc(docRef, { nombre, precio, categoryId });
  return { id: docSnap.id, nombre, precio, categoryId };
};
