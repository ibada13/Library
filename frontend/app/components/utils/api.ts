
export const fetch_books = async (url:string) => { 
    try {
        const response = await fetch(url)
        const data = await response.json();
        console.log(data.data[0].types[0].name)
        return data;

    } catch (error) { 
        console.log(error);
    }
}


export const fetch_comments = async (url:string) => { 
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data;

    } catch (error) { 
        console.log(error);
    }
}

export const _delete_ = async (url: string) => {
    try {
        const response = await fetch(url, {
            method:'delete',
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) { 
        console.log(error)
    }
 }