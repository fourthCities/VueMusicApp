import {Mode} from '../js/mode_config'
import {localSearch} from '../js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: Mode.sequence,
  currentIndex: -1,
  // 歌单部分
  songSheet: {},
  songSheetId: 0,
  topId: -1,
  searchHistory: localSearch()
}
export default state
