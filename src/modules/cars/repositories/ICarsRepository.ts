import { Cars } from "@prisma/client"
import Specification from "../models/Specification"

interface ICreateCarDTO{
    name: string
    description: string
    daily_rate: number
    available: boolean
    license_plate: string
    fine_amount: number
    brand: string
    category_id: string
    specifications?: Specification[]
}

interface IFindDTO{
    category_id?: string;
    name?: string;
    brand?: string;
}
interface ICarsRepository{

    create({ category_id, daily_rate, description, fine_amount, license_plate, name, available, brand, specifications}: ICreateCarDTO): Promise<Cars>;
    findByLicensePlate(licensePlate: string): Promise<Cars | null>;
    findAvailable({category_id, name, brand}: IFindDTO): Promise<Cars[] | null>;
    findById(id: string): Promise<Cars | null>;
    updateAvailable(id: string, available: boolean): Promise<Cars | null>;
}

export { ICarsRepository, ICreateCarDTO, IFindDTO}