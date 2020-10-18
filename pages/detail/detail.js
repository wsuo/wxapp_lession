const {
    request
} = require("../../utils/index");

// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        proid: '', // 加入购物车时需要
        proname: '', // 商品名称
        proimg: '', // 图片
        desc: '', // 详情
        price: '', // 价格
    },

    getDetailData(res, proid) {
        const {
            data: {
                proname,
                proimg,
                desc,
                price
            }
        } = res.data;
        this.setData({
            proid,
            proname,
            proimg,
            desc,
            price
        });
        wx.setNavigationBarTitle({
            title: proname,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {
            proid
        } = options;
        request({
            url: '/pro/detail?proid=' + proid
        }).then(res => {
            this.getDetailData(res, proid);
        });
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

    onClickIcon() {
    },

    onClickButton() {
    },
})