import fetch from "../../utils/fetch"
const { getUserInfo, initUserInfo } = require('../../utils/util.js')
const app = getApp()
const awx = wx.async(['uploadFile'])
Component({
    data: {
        nickname: '',
        headImageUrl: '',
        imgPath: app.globalData.imgPath,
    },
    lifetimes: {
        attached() {
            this.init()
        },
    },
    methods: {
        async init() {
            let {
                headImageUrl,
                nickname
            } = await getUserInfo()
            this.setData({
                headImageUrl,
                nickname
            })
        },
        async onChooseAvatar(e) {
            const { avatarUrl } = e.detail
            let { data } = await awx.uploadFile({
                filePath: avatarUrl,
                url: app.globalData.apiUrl + '/upload/addFile',
                name: 'file',
                method: 'POST',
                header: {
                    session_id: app.globalData.session_id
                }
            })
            let { body } = JSON.parse(data);
            this.setData({
                headImageUrl: body,
            })
            await fetch.post('/user/update-info', {
                headImageUrl: body,
                type: 4
            })
            wx.showToast({
                title: '头像已上传成功',
                icon: 'success',
            })
            await initUserInfo()
        },
        cancel() {
            this.triggerEvent('cancel')
        },
        async formSubmit(e) {
            if (!e.detail.value.nickname) {
                return wx.showToast({
                    icon: 'none',
                    title: '请输入昵称！',
                })
            }
            if (!this.data.headImageUrl) {
                return wx.showToast({
                    icon: 'none',
                    title: '请上传头像',
                })
            }
            let { errCode } = await fetch.post('/user/update-info', {
                nickname: e.detail.value.nickname,
                type: 3
            })

            if (errCode === 0) {
                await initUserInfo()
                this.triggerEvent('success', {
                    headImageUrl: this.data.headImageUrl,
                    nickname: e.detail.value.nickname,
                })
            }
        }
    }
})