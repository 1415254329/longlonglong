var nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const axios = require('axios')
let myEmail = '1415254329@qq.com'
var transporter = nodemailer.createTransport({
    service: 'qq',//163、qq等
    auth: {
        user: myEmail,//邮箱
        pass: 'koubtmxktzbwhaia'//邮箱密码或授权码
    }
});
module.exports = () => {
    schedule.scheduleJob('10 11 * * *', function () {
        let nowDate = new Date();
        let gap = parseInt((Math.round(new Date()) - Date.parse('2020-02-10')) / 86400000)
        let dateString = `今天是${nowDate.getFullYear()}年${nowDate.getMonth() + 1}月${nowDate.getDate()}日 星期${nowDate.getDay() ? nowDate.getDay() : '天'} 已经认识了${gap}天 `
        axios.get("https://chp.shadiao.app/api.php").then(res => {
            var mailOptions = {
                from: myEmail,//发送者
                to: '2967661904@qq.com',//接受者
                subject: '给小章的',//主题名
                html: `
                <h1>${dateString}</h1>
                <h2>${res.data}</h2>
                `,//内容,
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("发送成功");
            });
        })
    });
}
