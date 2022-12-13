import { Category } from "@prisma/client";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../ICategoryRepository";

class CategoryRepositoryMock implements ICategoriesRepository{

    private categories: Category[] = [];

    async findByName(name: string): Promise<Category | null> {
        
        const category = this.categories.find(category => category.name === name) || null
        return category
    }
    async list(): Promise<Category[]> {
       const allCategories = this.categories;
       return allCategories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        let category: Category;

        category = Object.assign({}, {
            id: Math.random().toString(16),
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category)
        return category;
    }

}
export { CategoryRepositoryMock }