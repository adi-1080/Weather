const generateLink = (lon,lat) => {
    return `https://www.7timer.info/bin/astro.php?${lon}.2&${lat}&ac=0&unit=metric&output=xml&tzshift=0`
}
const fetchData = async(url) => {
    try{const response = await fetch(url)
    const data = await response.text();
    console.log(data);
    }
    catch(err){
        return err+ "Could not load data"
    }
}

let input = document.querySelector('.options')
console.log(input);

async function main() {
    let url = generateLink(72,19)
    let data = fetchData(url)
    console.log(url);
    console.log(data);
}





main()