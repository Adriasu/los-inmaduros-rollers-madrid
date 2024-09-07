import dbConnect from '../../../../lib/mongodb.mjs';
import Route from '../../../../models/Route.mjs';

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
  await dbConnect();
  const routes = await Route.find({}).select('-_id routeId name image approximateDistance description map reviews gallery');
  
  const response = new Response(JSON.stringify(routes), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  return setCorsHeaders(response);
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const route = await Route.create(data);

  const response = new Response(JSON.stringify({ routeId: route.routeId, ...route.toObject(), _id: undefined }), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  return setCorsHeaders(response);
}

export async function PUT(request) {
  await dbConnect();
  const { routeId, ...updateData } = await request.json();
  const updatedRoute = await Route.findOneAndUpdate({ routeId }, updateData, { new: true }).select('-_id routeId name image approximateDistance description map reviews gallery');
  
  const response = new Response(JSON.stringify(updatedRoute), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  return setCorsHeaders(response);
}

export async function DELETE(request) {
  await dbConnect();
  const { routeId } = await request.json();
  await Route.findOneAndDelete({ routeId });

  const response = new Response(JSON.stringify({ message: 'Route deleted successfully' }), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  return setCorsHeaders(response);
}
