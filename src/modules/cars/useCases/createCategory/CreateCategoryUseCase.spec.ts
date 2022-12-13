import "reflect-metadata"

import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { CategoryRepositoryMock } from "../../repositories/implementations/mock/CategoriesRepositoryMock"
import AppError from "../../../../shareds/appError/AppError";

let categoryRepositoryMock: CategoryRepositoryMock;
let createCategoryUseCase: CreateCategoryUseCase;
describe("Create Category", ()=>{

    beforeEach(()=>{
        categoryRepositoryMock = new CategoryRepositoryMock()
        createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryMock)
    })


    it("should be able to create a new category", async ()=>{
        const category = { name: 'novo', description: 'zerado de fabrica'};
        await createCategoryUseCase.execute({...category})
        const categoryCreated = await categoryRepositoryMock.findByName(category.name)
        
        expect(categoryCreated).not.toBeNull();
        
    })

    it("should not be able to create a new category with same name", async()=>{
      expect(async ()=>{
        const category = { name: 'novo', description: 'zerado de fabrica'};
        await createCategoryUseCase.execute({...category})
        await createCategoryUseCase.execute({...category})
      }).rejects.toBeInstanceOf(AppError)  
    })

})