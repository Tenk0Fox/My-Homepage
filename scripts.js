/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"xy5YimdFRm1Imfa5","label":"Media","bookmarks":[{"id":"fttttviGmFEE5jsF","label":"Twitch","url":"https://www.twitch.tv/"},{"id":"qdXclhmSr4Sum44Z","label":"Twitter/X","url":"https://twitter.com/"},{"id":"ntWTMtUGNKqmyhZs","label":"FaceBook","url":"https://www.facebook.com/"},{"id":"GCDbkn83cpeEw7j1","label":"YouTube","url":"https://www.youtube.com/"}]},{"id":"NeQT4HtHnguViwnk","label":"Personal","bookmarks":[{"id":"82W1BM20yT7mJEhA","label":"Gmail","url":"https://mail.google.com/"},{"id":"7tS6GmN6bFzaZhlE","label":"Github","url":"https://github.com/"}]},{"id":"g9XajkvUjkIRXPOi","label":"Misc","bookmarks":[{"id":"gTLrC9CqDaAp4p5G","label":"Nexus","url":"https://www.nexusmods.com/"},{"id":"ZqnSraWeXEpYjauw","label":"Vimm's Lair","url":"https://vimm.net/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
