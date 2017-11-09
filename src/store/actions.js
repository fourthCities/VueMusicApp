import * as types from './mutation-type'
import {shuiji} from '../js/shuiji'
import {Mode} from '../js/mode_config.js'
import {saveStorage, clearStorage, deleStorage} from '../js/cache'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === Mode.random) {
    let randomList = shuiji(list)
    commit(types.SET_PLAYLIST, randomList)
    index = randomList.findIndex((item) => {
      return item.id === list[index].id
    })
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}

export const allRandom = function ({commit}, {list}) {
  commit(types.SET_MODE, Mode.random)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  let randomList = shuiji(list)
  commit(types.SET_PLAYLIST, randomList)
}

export function saveHistoryKey ({commit}, key) {
  commit(types.SAVE_HISTORY, saveStorage(key))
}
export function deleHistoryKey ({commit}, key) {
  commit(types.SAVE_HISTORY, deleStorage(key))
}
export function deleAllHistory ({commit}) {
  commit(types.SAVE_HISTORY, clearStorage())
}

export const selectSearch = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = state.playList[currentIndex]
  // 查看当前列表有没有 选中的歌曲。
  let index = playList.findIndex((item) => {
    return item.id === song.id
  })
  currentIndex++
  playList.splice(currentIndex, 0, song)
  if (index > -1) {
    if (currentIndex > index) {
      playList.splice(index, 1)
      currentIndex--
    } else {
      playList.splice(index + 1, 1)
    }
  }
  let currentSIndex = sequenceList.findIndex(item => {
    return item.id === currentSong.id
  })
  currentSIndex++
  let fsIndex = sequenceList.findIndex(item => {
    return item.id === song.id
  })
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (fsIndex > currentSIndex) {
      sequenceList.splice(fsIndex + 1, 1)
    } else {
      sequenceList.splice(fsIndex, 1)
    }
  }

  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAYLIST, playList)
  // 设置当前索引为0  打开播放器页面 设置当前状态为播放
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}
