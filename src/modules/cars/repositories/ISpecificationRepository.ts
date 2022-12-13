import { Specification } from '@prisma/client';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository{

    create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | null>;
    list(): Promise<Specification[] | []>
}

export { ISpecificationRepository, ICreateSpecificationDTO };
