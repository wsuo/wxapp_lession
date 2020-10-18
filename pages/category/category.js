// // pages/category/category.js
// const {
//     request
// } = require("../../utils/index.js")
// Page({

//     /**
//      * 页面的初始数据
//      */
//     data: {
//         active: 1, // 默认展示的分类
//         titles: [], //大分类列表
//         brandlist: [], //大分类下的品牌列表
//         kindlist: [], //大分类下的品牌下的数据列表
//         activekey: 0,
//     },

//     // 侧边栏点击事件
//     siderbarChange(event) {
//         const brand = this.data.brandlist[event.detail];
//         this.requestCategoryToBrand(brand);
//     },

//     // 根据分类加载品牌
//     requestCategoryToBrand(title) {
//         request({
//             url: '/pro/categorybrand',
//             data: {
//                 category: title
//             }
//         }).then(res => {
//             this.setData({
//                 brandlist: res.data.data,
//             });
//             request({
//                 url: '/pro/categorybrandlist',
//                 data: {
//                     category: this.data.titles[this.data.active],
//                     brand: this.data.brandlist[0].brand,
//                 }
//             }).then(res => {
//                 this.setData({
//                     kindlist: res.data.data,
//                 })
//             });
//         });
//     },

//     // 加载分类
//     loadTopCategory() {
//         request({
//             url: '/pro/category',
//         }).then(res => {
//             this.setData({
//                 titles: res.data.data,
//             });
//             this.requestCategoryToBrand(this.data.titles[this.data.active]);
//         });
//     },

//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad: function (options) {
//         this.loadTopCategory();
//         // 为什么 brandlist 为空: 因为他会先去执行主线程: 而我们的 request 函数是个回调函数,事先被放在了事件队列之中
//         // console.log(this.data.brandlist);
//     },

//     onChange(event) {
//         const {
//             index,
//             title
//         } = event.detail;
//         this.setData({
//             active: index
//         });

//         request({
//             url: '/pro/categorybrand',
//             data: {
//                 category: title
//             }
//         }).then(res => {
//             this.setData({
//                 brandlist: res.data.data,
//             });
//             request({
//                 url: '/pro/categorybrandlist',
//                 data: {
//                     category: title,
//                     brand: this.data.brandlist[0].brand,
//                 }
//             }).then(res => {
//                 this.setData({
//                     kindlist: res.data.data,
//                 });
//             });
//         });
//         // 问题是: 分类和品牌不对应
//         // console.log(title, this.data.brandlist[0].brand);
//     },

//     /**
//      * 获取品牌的列表数据
//      */
//     getKindList(event) {
//         const {
//             brand
//         } = event.currentTarget.dataset;
//         request({
//             url: '/pro/categorybrandlist',
//             data: {
//                 category: this.data.titles[this.data.active],
//                 brand: brand,
//             }
//         }).then(res => {
//             this.setData({
//                 kindlist: res.data.data,
//             })
//         });
//     },

//     /**
//      * 生命周期函数--监听页面初次渲染完成
//      */
//     onReady: function () {

//     },

//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow: function () {

//     },

//     /**
//      * 生命周期函数--监听页面隐藏
//      */
//     onHide: function () {

//     },

//     /**
//      * 生命周期函数--监听页面卸载
//      */
//     onUnload: function () {

//     },

//     /**
//      * 页面相关事件处理函数--监听用户下拉动作
//      */
//     onPullDownRefresh: function () {

//     },

//     /**
//      * 页面上拉触底事件的处理函数
//      */
//     onReachBottom: function () {

//     },

//     /**
//      * 用户点击右上角分享
//      */
//     onShareAppMessage: function () {

//     }
// })
// pages/kind/kind.js
import {
    request
} from './../../utils/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0, // 当前是哪一个tab被选中
        titles: [], // tab的名称
        brandlist: [], // tab下的分类的列表
        kindlist: [], // 大分类下的品牌下的数据列表
        activeKey: 0
    },
    /**
     * 侧边栏点击事件
     */
    sibebarChange(event) {
        const index = event.detail // 获取点击的左侧列表的索引值
        const {
            brand
        } = this.data.brandlist[index]
        // 请求数据
        this.requestKindListData(brand)
    },

    requestKindListData(brand) {
        request({
            url: '/pro/categorybrandlist',
            data: {
                // type: '女装', // 作业  将其设置为动态
                category: this.data.titles[this.data.active],
                brand: brand
            }
        }).then(res => {
            this.setData({
                kindlist: res.data.data
            })
        })
    },
    /**
     * 顶部选项卡切换
     */
    onChange(event) {
        const {
            index,
            name,
            title
        } = event.detail
        this.setData({
            active: index
        })
        // 请求大分类下的品牌 -----  第一个要选中  --- 请求大分类成功时调用函数
        this.requestCategoryToBrand(title)
    },
    // 获取分类列表数据
    getKindlist(event) {
        const {
            brand
        } = event.currentTarget.dataset
        request({
            url: '/pro/categorybrandlist',
            data: {
                // type: '女装', // 作业  将其设置为动态
                category: this.data.titles[this.data.active],
                brand: brand
            }
        }).then(res => {
            this.setData({
                kindlist: res.data.data
            })
        })
    },
    requestCategoryToBrand(title) {
        request({
            url: '/pro/categorybrand',
            data: {
                category: title
            }
        }).then(res => {
            this.setData({
                brandlist: res.data.data
            })
            this.requestKindListData(this.data.brandlist[0].brand)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取顶部的标签分类数据 --- 大分类
        this.loadTopCategory()
    },

    loadTopCategory() {
        request({
            url: '/pro/category',
        }).then(res => {
            this.setData({
                titles: res.data.data
            })
            // 默认请求的应该是  你默认选中的哪一项
            // this.data.titles ---- 大分类的数组
            // this.data.active  ---- 选中的索引
            this.requestCategoryToBrand(this.data.titles[this.data.active])
        })
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

    }
})