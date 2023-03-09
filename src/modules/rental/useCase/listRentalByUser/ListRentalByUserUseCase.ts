import { Rentals } from '@prisma/client';
import { inject } from 'tsyringe';
import { IRentalRepository } from '../../repositories/IRentalRepository';

interface userIdDTO{
  userId: string
}

class ListRentalByUserUseCase {
  constructor(
    @inject('rentalRepository')
    private rentalRepository: IRentalRepository,
  ) {}

  async execute({ userId } : userIdDTO): Promise<Rentals | null> {
    const rentalsByUser = await this.rentalRepository.findByUserId(userId);
    return rentalsByUser;
  }
}

export { ListRentalByUserUseCase };
