import * as types from './mutation-type'

const matutaions = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.UNSHIFT_SONGS_PLAYLIST] (state, song) {
    state.playList.unshift(song)
  },
  [types.SET_SONG_SHEET] (state, list) {
    state.songSheet = list
  },
  [types.SET_SONG_SHEET_ID] (state, id) {
    state.songSheetId = id
  },
  [types.SET_TOPID] (state, id) {
    state.topId = id
  },
  [types.SAVE_HISTORY] (state, arr) {
    state.searchHistory = arr
  }
}
export default matutaions
