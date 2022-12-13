describe("Create a user", ()=>{

    it("Shoulbe create a user", ()=>{
        const username = "tyago";
        const process = {
            user: {
                name: username
            }
        }
        const result = {
            user:{
                name: "tyago"
            }
        }
        expect(process).toMatchObject(result)
    })
})