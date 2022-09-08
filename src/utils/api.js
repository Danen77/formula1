export const fetchAllDrivers = (year) => {
    return fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
      .then(res => res.json())
  }
  
  export const fetchDriverDetails = (id, year) => {
    return fetch(`https://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`)
      .then(res => res.json())
  }
  
  export const fetchDriverRaces = (id, year) => {
    return fetch(`https://ergast.com/api/f1/${year}/drivers/${id}/results.json`)
      .then(res => res.json())
  }
  
  export const fetchDriverImage = (driverName) => {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${driverName}&prop=pageimages&formatversion=2&origin=*&format=json&pithumbsize=100`)
      .then(res => res.json())
  }
  
  export const fetchDriverData = (id, year, driverName) => {
    return Promise.all([
      fetchDriverDetails(id, year),
      fetchDriverRaces(id, year),
      fetchDriverImage(driverName)
    ])
  }