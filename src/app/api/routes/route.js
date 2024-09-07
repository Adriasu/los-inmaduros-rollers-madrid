import dbConnect from '../../../../lib/mongodb.mjs';
import Route from '../../../../models/Route.mjs';

export async function GET(request) {
  await dbConnect();
  const routes = await Route.find({}).select('-_id routeId name image approximateDistance description map reviews gallery');
  return Response.json(routes);
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const route = await Route.create(data);
  return Response.json({ routeId: route.routeId, ...route.toObject(), _id: undefined });
}

export async function PUT(request) {
  await dbConnect();
  const { routeId, ...updateData } = await request.json();
  const updatedRoute = await Route.findOneAndUpdate({ routeId }, updateData, { new: true }).select('-_id routeId name image approximateDistance description map reviews gallery');
  return Response.json(updatedRoute);
}

export async function DELETE(request) {
  await dbConnect();
  const { routeId } = await request.json();
  await Route.findOneAndDelete({ routeId });
  return Response.json({ message: 'Route deleted successfully' });
}