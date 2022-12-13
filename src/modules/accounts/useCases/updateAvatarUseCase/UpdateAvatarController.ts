import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";
import { Response, Request } from 'express';

class UpdateAvatarController{

    async handler(request: Request, response: Response){
        const { id: userId } = request.user;
        const avatarPath = request.file?.filename || '';
        const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);
        const updated = await updateAvatarUseCase.execute({ userId, avatarPath });
        return response.status(201).json(updated);
    }
}

export { UpdateAvatarController }