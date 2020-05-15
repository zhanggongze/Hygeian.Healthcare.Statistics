
// 公共方法类
class Utils {
    /**
     * 获取指定时间
     * @param {过去多少天---正数代表以后---负数代表以前} n 
     * @param {*} setDt 
     */
    selectSetDate(n, setDt) {
        let d1 = setDt ? new Date(setDt) : new Date();
        let d2 = new Date(d1);
        d2.setDate(d1.getDate() + n);

        return `${d2.getFullYear()}-${d2.getMonth() + 1}-${d2.getDate()}`;
    }
    formateDate(date){
        let d2=new Date(date);
        return `${d2.getFullYear()}-${d2.getMonth() + 1}-${d2.getDate()}`;
    }

    // 加0
    formatNumber(n) {
        const str = n.toString()
        return str[1] ? str : `0${str}`
    }
    /**
     * 强制转成后台能识别的时区
     * @param {ps:2020-5-20} str 
     */
    formatGMTDate(str) {
        if (!str) {
            return ''
        }
        let date = new Date(str.replace(/-/g, '/'))
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const hour = date.getHours()
        const minute = date.getMinutes()
        // const second = date.getSeconds()

        const t1 = [year, month, day].map(this.formatNumber).join('-')
        const t2 = [hour, minute].map(this.formatNumber).join(':')

        return `${t1}T${t2}+08:00`
    }

}

export default new Utils();