import { Request, Response } from "express"
import { container } from "tsyringe";
import { UploadCarImageUseCase } from './UploadCarImageUseCase'

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handler(request: Request, response: Response): Promise<Response>{
    const { id } = request.body;
    const  images = request.files as IFiles[]

    const uploadCarImagesUseCase = container.resolve(UploadCarImageUseCase)
    const filepaths = images.map(file => file.filename);
    uploadCarImagesUseCase.execute({ carId: id, imagesPath: filepaths})

    return response.status(201);
  }
}

export { UploadCarImagesController }