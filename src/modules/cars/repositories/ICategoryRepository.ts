import { Category } from '@prisma/client';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {

    findByName(name: string): Promise<Category | null>
    list(): Promise<Category[]>
    create({ name, description }: ICreateCategoryDTO): Promise<Category>

}

export { ICategoriesRepository, ICreateCategoryDTO };
