# top ページを必要な部品だけ切り出す

## ソース

http://localhost:4321/

この開発サーバの死活（起動や再起動）は人間が管理するので、
適時人間に再起動を依頼すること。

## 出力先の構成

- exports/index.html
- exports/assets/css/page/index/index.<hash>.css
- exports/assets/js/page/index/index.<hash>.js
- exports/assets/images/page/index/<filename>.<hash>.webp
- exports/assets/images/page/index/<filename>.<hash>.svg

## 必須要件

- `cd exports && bun serve .` で起動できるとこ
- screenshot が一致すること
- header / footer などは共通部品として、css, js, webp, svg は flocss スタイルで配置してほしい
- 出力されたページには header / footer はついていて良い