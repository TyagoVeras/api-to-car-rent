import { container } from 'tsyringe';
import { Response, Request } from 'express';
import { UpdateAvatarUseCase } from './UpdateAvatarUseCase';

class UpdateAvatarController {
  async handler(request: Request, response: Response) {
    const { id: userId } = request.user;
    const avatarPath = request.file?.filename || '';
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);
    const updated = await updateAvatarUseCase.execute({ userId, avatarPath });
    return response.status(201).json(updated);
  }
}

export { UpdateAvatarController };
