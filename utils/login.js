const app = getApp()
const awx = wx.async(['login', 'request'])


const login = async function () {
    let { code } = await awx.login()
    let res = await awx.request({
        url: app.globalData.apiUrl + '/login/login-code',
        method: 'POST',
        data: {
            code,
            platform: app.globalData.platform,
            referrerId: app.globalData.referrerId > 0 ? app.globalData.referrerId : null,
            channel: app.globalData.channel,
            campaign: app.globalData.campaign,
            type: 1
        }
    })
    let { errCode, body } = res.data
    app.globalData.session_id = body.sessionId
    app.globalData.userId = body.userId;
    app.globalData.channel = body.channel;
    app.globalData.campaign = body.campaign;
    wx.hideLoading()
    if (app.globalData.campaign != null) {
        app.globalData.uma.trackEvent("campaign", app.globalData.campaign);
    }
    if (errCode === 0 && !body.sessionId) {
        throw new Error('登录错误');
        return
    }
    // else if (errCode === 0 && (!body.nickname || !body.headImageUrl)) {
    //     wx.redirectTo({
    //         url: '/pages/register/register?type=1',
    //     });
    // } 
    else if (errCode === 1012) {
        throw new Error('未注册');
    }
}

export default login