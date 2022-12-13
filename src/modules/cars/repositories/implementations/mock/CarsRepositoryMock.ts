import { Cars } from "@prisma/client";
import { ICarsRepository, ICreateCarDTO } from "../../ICarsRepository";

class CarsRepositoryMock implements ICarsRepository{

    
    private cars: Cars[] = [];
    
    async create({ category_id, daily_rate, description, fine_amount, license_plate, name, available, brand }: ICreateCarDTO): Promise<Cars> {
        
        const car = Object.assign({}, {
            id: Math.random().toString(16),
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            available,
            brand,
            created_at: new Date(),
            updated_at: new Date()
        })

        this.cars.push(car)
        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Cars | null> {
        const car = await this.cars.find(item => item.license_plate === licensePlate) || null;
        return car;
    }
}

export { CarsRepositoryMock }