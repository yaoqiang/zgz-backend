import superAgent from 'superagent'
import  cron from 'node-cron';

export default function index () {
    //start crontab.

    //以后可以从mongodb里设置并读取
    var noticeList = [
        '亲爱的各位玩家，绿色游戏，禁止作弊，一旦发现立即惩罚。净化游戏，提升游戏乐趣，从我做起！', 
        '亲爱的各位玩家，关注微信公众号:大同扎股子，参与苹果商店五星好评活动，立即获得10个大喇叭！',
        '邀请朋友下载游戏并绑定手机，您可获得额外奖励！详情查看个人信息',

        // '8月股神榜排名已出炉, 奖励已发放! 请股神们注意查收! 9月股神榜等你来拿奖!',
        // '玩家“宇神”成功兑换了5元话费，玩家“红手”成功兑换了5元话费，玩家“挨的好麦克风”成功兑换了10元话费', 
        // '玩家“鸦西路”成功兑换了5元话费，玩家“大同♥于姥爷”成功兑换了5元话费，玩家“永正空气源”成功兑换了1元话费',
        // '玩家“秋迷而杏野”成功兑换了5元话费，玩家“用脑子打牌”成功兑换了5元话费, 玩家“简单”成功兑换了5元话费',
        // '玩家“挨的好麦克风”成功兑换了5元话费, 玩家“天啊撸”成功兑换了5元话费, 玩家“扎股”成功兑换了5元话费',
        // '玩家“赌棍”成功兑换了5元话费, 玩家“肥肉猪”成功兑换了5元话费, 玩家“挨的好麦克风”成功兑换了5元话费',
        // '玩家“强哥”成功兑换了1元话费, 玩家“扎会”成功兑换了5元话费, 玩家“就是流弊”成功兑换了5元话费',
        ];

    cron.schedule('*/2 * * * *', function () {

        // console.log('running a task every five minutes')

        var noticeIndex = Math.floor(Math.random() * noticeList.length);

        superAgent.post('http://127.0.0.1:4000/api/game/sendBBS')
            .set('Content-Type', 'application/json')
            .send({content: noticeList[noticeIndex]})
            .end((err, res)=> {
            });
    });
}
