/**
 * Created by 懿懿 on 2018/3/29.
 */
$(function () {
    //动态响应式轮播图
    banner();
    //初始化页签
    initTab();
    $('[data-toggle="tooltip"]').tooltip();
})
var banner = function () {
    /*
     * 1、模拟数据（从后台回去数据）[{},{}]
     * 2、判断当前设备是移动端还是非移动端  768px
     * 3、根据当前设备把数据转换为html(渲染)  拼接字符串
     * 3/1 点需要动态渲染
     * 3/2 图片容器需要动态生成
     *  4、渲染到页面当中   html追加
     *  5、测试能否响应  两种设备  监听页面尺寸 改变重新渲染
     *  6、移动端 手势切换功能
     * */

    //获取需要惭怍的元素
    //轮播听组件
    var $banner = $('.carousel');
    //点容器
    var $point = $banner.find('.carousel-indicators');

    var $image = $banner.find('.carousel-inner');

    var $window = $(window);

    //模拟数据
    var data = [
        {
            pcSrc: 'images/banner4.jpg',
            mSrc: 'images/banner_4-640.jpg'
        },
        {
            pcSrc: 'images/banner4.jpg',
            mSrc: 'images/banner_4-640.jpg'
        },
        {
            pcSrc: 'images/banner4.jpg',
            mSrc: 'images/banner_4-640.jpg'
        }
    ];

    //渲染操作
    var render = function () {
        //判断当前设备
        var isMobile = $window.width() < 768 ? true : false
        //根据当前设备把数据转换html  拼接字符串
        //1 点需要动态渲染
        var pointHtml = '';
        //2 图片容器需要动态生成
        var imageHtml = '';

        //根据数据来拼接
        $.each(data, function (k, v) {
            //点内容的拼接
            pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="' + k + '" '+(k==0 ? 'class="active"':'')+'></li>\n';
            //图片内容的拼接
            imageHtml += '<div class="item '+(k==0 ? 'active':'')+'">';
            if(isMobile){
                imageHtml += '<a href="#" class="m_imageBox"><img  src="'+(v.mSrc)+'"></a>';
            }else {
                imageHtml += ' <a href="#" class="pc_imageBox" style="background-image: url('+(v.pcSrc)+')"></a>';
            }
            imageHtml += '</div>';
        });
        // console.log(pointHtml);
        // console.log(imageHtml);
        //  4、渲染到页面当中   html追加
        $point.html(pointHtml);
        $image.html(imageHtml);
    };
    render();
    // 5、测试能否响应  两种设备  监听页面尺寸 改变重新渲染
    $window.on('resize',function () {
        render(); //重新渲染
        bindEvent(); //重新绑定事件
    }).trigger('resize');//主动触发 resize 执行render  页面初始化


   // 6、移动端 手势切换功能
    var startX = 0;
    var distanceX = 0;
    var isMove = false;//移动的距离
    function bindEvent() {
        $banner.on('touchstart',function (e) {
            startX = e.originalEvent.touches[0].clientX;
        }).on('touchmove',function (e) {
            var moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            isMove = true;

        }).on('touchend',function (e) {
            if(isMove && Math.abs(distanceX) >= 50){
                if(distanceX > 0){
                    //右滑，上一张
                    $banner.carousel('prev');
                }else {
                    //左滑，下一张
                    $banner.carousel('next');
                }
            }
        });
    }
    bindEvent();
};

var initTab = function () {
  /*
  * 1、把所有的页签在一行显示，设置父容器的宽度是所有子容器的宽度之和
  * 2、满足区域滚动的html结构要求  必须有大容器套着一个小容器
  * 3、实现滑动功能，使用区域滚动插件iscroll
  * */
//父容器
    var tabs = $('.wjs_product .nav-tabs')
//子容器
    var liList = tabs.find('li');

    //计算宽度之和

    var width = 0;
    $.each(liList,function (i,item) {

        //width是获取内容的宽度
        //innerWidth 获取内容和内边距的宽度
        //outerWidth 获取内容和内边距的宽度+边框
        //outerWidth（true） 获取内容和内边距的宽度+边框+外编剧
       width += $(item).outerWidth(true);
    });
    tabs.width(width)
//满足区域滚动的html结构要求  必须有大容器套着一个小容器
    //、实现滑动功能，使用区域滚动插件iscroll
     new IScroll('.nav-tabs-parent', {
        scrollX:true,
        scrollY:false
     });
};

