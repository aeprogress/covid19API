let selecttions = document.getElementById('inputGroupSelect03')
let active = document.getElementById('active')
let recovered = document.getElementById('recovered')
let confirmed = document.getElementById('confirmed')
let deaths = document.getElementById('deaths')
let updated = document.getElementById('updated')
let loading = document.getElementById('loading')
const countriesUrl = 'https://api.covid19api.com/countries'

async function getData(url) {
    loading.removeAttribute('hidden')
    const data = await fetch(url)
    let jData = await data.json()
    return jData
}

(function (url) {
    getData(url).then(data => data.sort().forEach(element => {
        let option = document.createElement("option");
        option.text = element['Country']
        option.value = element['Country']
        selecttions.append(option)
        loading.setAttribute('hidden', '')
    }))
}(countriesUrl))

function showStats() {
    country = selecttions.value
    url = `https://api.covid19api.com/live/country/${country}`
    getData(url).then(data => {
        parseNumbers(data)
        loading.setAttribute('hidden', '')
    })
}

function parseNumbers(data) {
    try{

        active.innerHTML = data[data.length-1]['Active']
        recovered.innerHTML = data[data.length-1]['Recovered']
        confirmed.innerHTML = data[data.length-1]['Confirmed']
        deaths.innerHTML = data[data.length-1]['Deaths']
        updated.innerHTML = `Updated: ${data[data.length-1]['Date']}`
    }
    catch {
        active.innerHTML = 'Not available'
        recovered.innerHTML = 'Not available'
        confirmed.innerHTML = 'Not available'
        deaths.innerHTML = 'Not available'
    }
}
