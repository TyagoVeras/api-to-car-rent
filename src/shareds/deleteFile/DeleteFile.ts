import fs from 'fs'

class DeleteFile {

    async execute(filePath: string){
        try {
            fs.promises.stat(filePath)
        } catch (error) {
            return;
        }
        
        await fs.promises.unlink(filePath)
    }
}

export { DeleteFile }