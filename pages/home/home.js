const {
    request,
    toast
} = require("./../../utils/index.js");

// pages/home.js
const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        bannerlist: [],
        prolist: [],
        pageCode: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // 请求轮播图数据
        request({
            url: '/banner'
        }).then(res => {
            this.setData({
                bannerlist: res.data.data,
            })
        })

        // 请求列表数据
        request({
            url: '/pro',
            data: {}
        }).then((res) => {
            this.setData({
                prolist: res.data.data
            })
        }).catch((err) => {
            console.log(err);
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
        console.log("刷新首页页面");
        this.refreshData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.requestMoreData();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    refreshData() {
        // 请求列表数据
        request({
            url: '/pro',
            data: {
                pageCode: 0,
                limitNum: 10
            }
        }).then((res) => {
            console.log(res);
            this.setData({
                prolist: res.data.data,
                pageCode: 1
            })
            // 真机测试下拉刷新结束时需要停止刷新操作
            wx.stopPullDownRefresh();
        }).catch((err) => {
            console.log(err);
        });
    },

    requestMoreData() {
        // 请求列表数据
        request({
            url: '/pro',
            data: {
                pageCode: this.data.pageCode,
                limitNum: 10
            }
        }).then((res) => {
            if (res.data.code === '10000') {
                // 没有更多数据了
                toast('没有更多数据了')
            } else {
                // 如果有数据: 之前的数据加上现在的数据
                let arr = this.data.prolist;
                let num = this.data.pageCode + 1;
                let list = [...arr, ...res.data.data];
                this.setData({
                    prolist: list,
                    pageCode: num
                })
            }
        }).catch((err) => {
            console.log(err);
        });

    },

    /**
     * 返回顶部的事件
     */
    backtop() {
        wx.pageScrollTo({
            scrollTop: 0
        })
    },

    /**
     * 大图观看
     * @param {事件} event 
     */
    previewImage(event) {
        let arr = [];
        let index = event.currentTarget.dataset.index;
        this.data.bannerlist.map(item => {
            arr.push(item.img);
        })

        wx.previewImage({
            urls: arr,
            current: arr[index],
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
        })
    }

})