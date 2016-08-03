import superAgent from 'superagent'
import  cron from 'node-cron';

export default function index () {
    //start crontab.

    //以后可以从mongodb里设置并读取
    var noticeList = [
        '亲爱的各位玩家，绿色游戏，禁止作弊，一旦发现立即惩罚。净化游戏，提升游戏乐趣，从我做起！', 
        '本月股神榜重磅开启，下月1号上榜就赢奖！大家约起来冲起来！', 
        '亲爱的各位玩家，关注微信公众号:大同扎股子，参与苹果商店五星好评活动，立即获得10个大喇叭！',
        '邀请朋友下载游戏并绑定手机，您可获得额外奖励！让更多的朋友来追忆童年捉红三的乐趣！详情查看个人信息'];

    cron.schedule('*/5 * * * *', function () {

        // console.log('running a task every five minutes')

        var noticeIndex = Math.floor(Math.random() * noticeList.length);

        superAgent.post('http://127.0.0.1:4000/api/game/sendBBS')
            .set('Content-Type', 'application/json')
            .send({content: noticeList[noticeIndex]})
            .end((err, res)=> {
            });
    });
}
