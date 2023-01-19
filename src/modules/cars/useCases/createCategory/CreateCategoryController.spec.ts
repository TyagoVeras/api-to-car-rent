import request from "supertest"
import { app } from "../../../../app"
describe('Create a category from test', ()=>{

  it('should ble able create a car',async ()=>{
    await request(app).post('/categories').send({
      name: 'Teste categoria',
      description: 'uma descricao'
    })
  })

  it('Should be able list categories', async ()=>{
    await request(app).get('/categories').expect(200)
  })

})