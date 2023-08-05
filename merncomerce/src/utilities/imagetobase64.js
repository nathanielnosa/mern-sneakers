
async function Imagetobase64(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const data = new Promise((res,rej)=>{
        reader.onload = ()=> res(reader.result)
        reader.onerror = err => rej(err)
    })
    return data
}

export {Imagetobase64}