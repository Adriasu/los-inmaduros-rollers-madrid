import { revalidatePath } from 'next/cache';
import dbConnect from '../../../../lib/mongodb.mjs';
import Route from '../../../../models/Route.mjs';

export const revalidate = 0;

// Función auxiliar para configurar los headers CORS
function setCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Ajusta esto a tu dominio específico en producción
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  return response;
}

// Manejar solicitudes OPTIONS para CORS
export async function OPTIONS() {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Origin', '*'); // Cambiar por tu dominio en producción
  headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  return new Response(null, { headers });
}

export async function GET(request) {
  try {
    await dbConnect();
    console.log('Conectado a la base de datos, obteniendo rutas...');
    const routes = await Route.find({}).select('-_id routeId name image approximateDistance description map reviews gallery level');
    console.log(`Se encontraron ${routes.length} rutas.`);
    
    const response = new Response(JSON.stringify(routes), {
      headers: { 'Content-Type': 'application/json' }
    });
    
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    const errorResponse = new Response(JSON.stringify({ error: 'Error al obtener las rutas' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
    return setCorsHeaders(errorResponse);
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const route = await Route.create(data);

    revalidatePath('/api/routes');

    const response = new Response(JSON.stringify({ 
      routeId: route.routeId, 
      ...route.toObject(), 
      _id: undefined 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Error al crear la ruta:', error);
    const errorResponse = new Response(JSON.stringify({ error: 'Error al crear la ruta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
    return setCorsHeaders(errorResponse);
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { routeId, ...updateData } = await request.json();
    const updatedRoute = await Route.findOneAndUpdate(
      { routeId }, 
      updateData, 
      { new: true }
    ).select('-_id routeId name image approximateDistance description map reviews gallery level');
    
    if (!updatedRoute) {
      throw new Error('Ruta no encontrada');
    }

    revalidatePath('/api/routes');

    const response = new Response(JSON.stringify(updatedRoute), {
      headers: { 'Content-Type': 'application/json' }
    });
    
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Error al actualizar la ruta:', error);
    const errorResponse = new Response(JSON.stringify({ error: 'Error al actualizar la ruta' }), {
      status: error.message === 'Ruta no encontrada' ? 404 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
    return setCorsHeaders(errorResponse);
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { routeId } = await request.json();
    const deletedRoute = await Route.findOneAndDelete({ routeId });

    if (!deletedRoute) {
      throw new Error('Ruta no encontrada');
    }

    revalidatePath('/api/routes');

    const response = new Response(JSON.stringify({ message: 'Ruta eliminada con éxito' }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Error al eliminar la ruta:', error);
    const errorResponse = new Response(JSON.stringify({ error: 'Error al eliminar la ruta' }), {
      status: error.message === 'Ruta no encontrada' ? 404 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
    return setCorsHeaders(errorResponse);
  }
}