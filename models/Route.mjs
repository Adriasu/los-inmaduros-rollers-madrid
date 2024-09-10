import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const RouteSchema = new mongoose.Schema({
  routeId: {
    type: String,
    default: () => `route_${uuidv4()}`,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  approximateDistance: { type: String, required: true },
  description: { type: String, required: true },
  map: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  gallery: [{ type: String }],
  level: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Route || mongoose.model('Route', RouteSchema);