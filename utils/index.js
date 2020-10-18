// 接口地址: http://daxun.kuboy.top/apidoc
const baseUrl = 'http://daxun.kuboy.top/api'
export function request(options) {
    // 解构赋值
    const {
        url,
        data,
        method
    } = options;

    wx.showLoading({
        title: '加载中',
    })

    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            data: data || {},
            method: method || 'GET',
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                wx.hideLoading();
            },
        })
    })
}

// 封装 Toast 显示
export function toast(options) {
    const {title, icon, duration} = options;
    wx.showToast({
        title: title,
        icon: icon || 'none',
        duration: duration || 2000
      })
}