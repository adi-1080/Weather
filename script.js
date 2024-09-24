const geoapify = (location) => {
    const apiKey = 'b4460be306574902918693b5faeff955'
    const encodedLocation = encodeURIComponent(location)
    return `https://api.geoapify.com/v1/geocode/search?text=${encodedLocation}&apiKey=${apiKey}`
}

const generateLongitudeLatitude = async (location) => {
    const URL = geoapify(location)

    const response = await fetch(URL)
    const data = await response.json()
    
    const longitude = data['features'][0]['geometry']['coordinates'][0]
    const latitude = data['features'][0]['geometry']['coordinates'][1]

    // console.log(longitude);
    // console.log(latitude);   
    coordinates = [longitude, latitude]
    
    return coordinates
}

const generate7timerAPI = (longitude, latitude) => {
    return `https://www.7timer.info/bin/astro.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=xml&tzshift=0`
}

const fetchWeatherData = async (URL) => {
    const response = await fetch(URL)
    const data = await response.text()
    return data
}

const printWeatherData = async (place) => {
    let lon;
    let lat;
    await generateLongitudeLatitude(place)
    .then((coordinates)=>{
        lon = coordinates[0]
        lat = coordinates[1]
    })
    .catch((err)=>{
        console.log("Error fetching data", err);
    })

    const link = generate7timerAPI(lon, lat)
    const result = await fetchWeatherData(link)
    
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(result, 'text/xml')

    const temp = xmlDoc.getElementsByTagName('temp2m')[0]
    const wind_speed = xmlDoc.getElementsByTagName('wind10m_speed')[0]
    const wind_direction = xmlDoc.getElementsByTagName('wind10m_direction')[0]
    const prec_type = xmlDoc.getElementsByTagName('prec_type')[0]
    const cloudcover= xmlDoc.getElementsByTagName('cloudcover')[0]
    console.log(`Temperature: ${temp.textContent}°C`);
    console.log(`Wind Speed: ${wind_speed.textContent}km/hr`);
    console.log(`Wind Direction: ${wind_direction.textContent}`);
    console.log(`Precipitation: ${prec_type.textContent}`);
    console.log(`Cloud Cover: ${cloudcover.textContent}`);
    document.querySelector('#weather-data').innerHTML = `<p>Temperature: ${temp.textContent}°C <br> Wind Speed: ${wind_speed.textContent}km/hr <br> Wind Direction: ${wind_direction.textContent} <br> Precipitation: ${prec_type.textContent} <br> Cloudcover: ${cloudcover.textContent} okta </p>`
}

function main(){
    place = document.getElementById('city-name').value
    printWeatherData(place)
}

document.getElementById('search-button').addEventListener('click',main)