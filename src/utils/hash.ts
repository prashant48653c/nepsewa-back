import * as bcrypt from 'bcrypt'
export async function hashPassword(plainPass){
    const salt = await bcrypt.genSalt(10);  
    return bcrypt.hash(plainPass, salt);
}

export async function comparePassword(plainPass,hashedPass){
    return await bcrypt.compare(plainPass,hashedPass);
}