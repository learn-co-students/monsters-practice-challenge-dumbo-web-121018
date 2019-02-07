document.addEventListener('DOMContentLoaded', () => {
  const monstersURL = 'http://localhost:3000/monsters'
  const container = document.getElementById('monster-container')
  const form = document.getElementById('monster-form')
  const back = document.getElementById('back')
  const forward = document.getElementById('forward')
  let page = 1

  async function fetchMonsters () {
    let res = await fetch(monstersURL + `/?_limit=50&_page=${page}`)
    let monsters = await res.json()
    return slapMonstersOnDOM(monsters)
  }

  function slapMonstersOnDOM (monsters) {
    container.innerHTML = ''
    monsters.forEach(monster => {
      container.innerHTML +=
        `<div data_id="${monster.id}">
          <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
          <p>Bio: ${monster.description}</p>
        </div>`
    })
  }

  fetchMonsters()

  form.addEventListener('submit', event => {
    console.log(event.target)
    event.preventDefault()
    let name = form.name.value
    let age = form.age.value
    let description = form.description.value

    fetch(monstersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        age,
        description
      })
    })
      .then(
        console.log(`Succesfully recorded ${name}`)
      )
  })

  back.addEventListener('click', event => {
    if (page > 1) {
      page--
      fetchMonsters()
    }
  })

  forward.addEventListener('click', event => {
    page++
    fetchMonsters()
  })
})
