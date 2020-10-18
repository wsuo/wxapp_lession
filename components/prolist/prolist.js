// components/prolist/prolist.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        prolist: Array
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        toDetail (event) {
            const {proid} = event.currentTarget.dataset;
            wx.navigateTo({
              url: '/pages/detail/detail?proid=' + proid,
            })
        }
    },
})
