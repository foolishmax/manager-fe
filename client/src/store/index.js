import { createStore } from "vuex";
import storage from "../utils/storage";

export default createStore({
  state: {
    userInfo: storage.getItem('userInfo') || {},
    menuList: storage.getItem("menuList"),
    actionList: storage.getItem("actionList"),
    moticeCount: 0
  },
  mutations: {
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      storage.setItem('userInfo', userInfo)
    },
    saveMenuList(state, menuList) {
        state.menuList = menuList;
        storage.setItem('menuList', menuList)
    },
    saveActionList(state, actionList) {
        state.actionList = actionList;
        storage.setItem('actionList', actionList)
    },
    saveNoticeCount(state, noticeCount) {
        state.noticeCount = noticeCount;
        storage.setItem('noticeCount', noticeCount)
    }
  }
})