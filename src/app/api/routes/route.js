import { NextResponse } from 'next/server';
import { db } from '../../../../lib/fireBase.mjs';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'routes'));
    const routes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(routes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newRoute = {
      id: uuidv4(),
      ...body,
      reviews: body.reviews || [],
      gallery: body.gallery || [],
      rating: body.rating || ''
    };
    const docRef = await addDoc(collection(db, 'routes'), newRoute);
    return NextResponse.json({ id: docRef.id, ...newRoute }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();
    const docRef = doc(db, 'routes', id);
    await updateDoc(docRef, updateData);
    return NextResponse.json({ message: 'Route updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await deleteDoc(doc(db, 'routes', id));
    return NextResponse.json({ message: 'Route deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



