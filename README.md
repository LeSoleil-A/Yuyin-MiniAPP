### 目前的问题

2. 场馆信息设计了一个自定义组件，本来应该在首页显示，但由于没找到效果相同的组件，所以暂时将自定义组件放置在了一个临时界面：TempStadium；
3. 拍摄视频预览页面还没有设计裁剪时长功能；



### 代码文件说明

#### 页面文件说明：（pages文件夹）

1. 首页：index；

2. 点击场馆（场馆介绍）： TempStadium（应改为index上的蒙层，而非单独的界面）；

3. 上传视频界面：TeachingPage；

4. 我的主页：MinePage；

5. 勋章墙：MedalWallPage；

6. 已（未）获得勋章详情：MedalTestPage（应改为“我的页面”上的蒙层，而非单独的界面）；

7. 获得勋章（主页）：getMedalTest（应改为index上的蒙层，而非单独的界面）；

8. ChosenVideoPage：暂时用来展示所选择或拍摄的视频；

   

#### 自定义组件说明：（components文件夹）

1. getMedal：展示在首页（目前是getMedalTest页面）中的获得勋章卡片；
2. my-card：场馆介绍卡片；
3. my-medal：“我的”页面（目前是MedalTestPage页面）已（未）获得勋章详情；
4. navBtn：首页下方导航按钮；
5. userTitle：“我的”页面用户信息；

