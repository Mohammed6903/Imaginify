import { model, models, Schema, Document } from "mongoose";

interface IImage extends Document{
    title: string;
    transformation: string;                
    publicId: string;                      
    secureUrl: string;                        
    width?: number;                       
    height?: number;                      
    config?: object;    
    transformationUrl?: string;            
    aspectRatio?: string;               
    prompt?: string;                    
    author?: {
        _id: string,
        firstname: string,
        lastname: string
    };                    
    createdAt?: Date;                   
    updatedAt?: Date;                   
  }
  

const ImageSchema = new Schema({
    title: {type: String, required: true},
    transformation: {type: String, required: true},
    publicId: {type: String, required: true},
    secureUrl: {type: URL, required: true},
    width: {type: Number},
    height: {type: Number},
    config: {type: Object},
    transformationUrl: {type: URL},
    aspectRatio: {type: String},
    prompt: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

ImageSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;