import { Cars } from "@prisma/client"

interface ICreateCarDTO{
    name: string
    description: string
    daily_rate: number
    available: boolean
    license_plate: string
    fine_amount: number
    brand: string
    category_id: string
}

interface ICarsRepository{

    create({ category_id, daily_rate, description, fine_amount, license_plate, name, available, brand}: ICreateCarDTO): Promise<Cars>;
    findByLicensePlate(licensePlate: string): Promise<Cars | null>
}

export { ICarsRepository, ICreateCarDTO}