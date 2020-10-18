// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imagelist: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    chooseImage() {
        wx.chooseImage({
            count: 0,
            sizeType: [],
            sourceType: [],
            success: (res) => {
                this.setData({
                    imagelist: res.tempFilePaths,
                })
            },
            fail: (res) => {},
            complete: (res) => {},
        });
    },

    showActionSheet() {
        wx.showActionSheet({
            itemList: ['拍照', '从手机相册选取'],
            success: (res => {
                switch (res.tapIndex) {
                    case 0:
                        console.log("点击了拍照");
                        break;
                    case 1:
                        console.log("点击了从手机相册选取");
                        break;
                    default:
                        console.log("选择了其中的一个");
                };
            }),
            fail() {
                console.log("你点击了取消按钮");
            },
        });
    },
})