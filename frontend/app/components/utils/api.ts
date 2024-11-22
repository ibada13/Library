
export const fetch_books = async (url:string) => { 
    try {
        const reposne = await fetch(url)
        const data = await reposne.json();
        console.log(data.data[0].types[0].name)
        return data;

    } catch (error) { 
        console.log(error);
    }
}