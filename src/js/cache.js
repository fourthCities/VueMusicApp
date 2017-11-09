import goodStorage from 'good-storage'

const SAVEAREA = '__search__'
const MAXLENGTH = 10

export function saveStorage (query) {
  let searchList = goodStorage.get(SAVEAREA, [])
  insertArray(searchList, query, (item) => {
    return item === query
  }, MAXLENGTH)
  goodStorage.set(SAVEAREA, searchList)
  return searchList
}
export function localSearch () {
  return goodStorage.get(SAVEAREA, [])
}

export function deleStorage (val) {
  let searchList = goodStorage.get(SAVEAREA, [])
  deleElement(searchList, (item) => {
    return item === val
  })
  goodStorage.set(SAVEAREA, searchList)
  return searchList
}
export function clearStorage () {
  goodStorage.remove(SAVEAREA)
  return []
}

function deleElement (arr, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
