# Neo's Luckysheet

- `src/` 一通り完了
    - 直下 `index.html`・`index.js`・`core.js`・`config.js` : とりま
    - `assets/iconfont/` : フォントは `fonts/`・CSS は `css/` に移したいが、ひとまず
    - `css/` : 使ってるものだけになった・個別の CSS のゴミ取りなどは未済
    - `fonts/` : 必要なフォントだけにした (`plugins/font-awesome.min.css` を調整)
    - `locale/` : 日本語だけにした
    - `store/` : とりま
- `src/` 未済
    - `utils/` : 一部
    - `controllers/`
    - `function/`
    - `global/`
    - `methods/`
    - `plugins/`
- メモ
    - ユーザがプラグインを注入できる仕組みは削っちゃったので、多分 `plugins` プロパティの設定が要らなくなるのかな
    - `plugins/css/font_...css` 要らないのでは
