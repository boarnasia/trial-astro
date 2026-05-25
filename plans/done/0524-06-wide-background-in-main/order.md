# page-header, page-footer の間に広がるバックグラウンドコンポーネントを追加

## Layout Component

name: components/layout/MainBackgroundFull

src/layouts/Layout.astro の first-element-of-body に入れる想定

position: absolute
anchor-name: --page-header, --page-footer の間の エリア全域に広がる
width: 100%;
top: anchor(--page-header, bottom)
bottom: anchor(--page-footer, top)
z-index: -10;

## Background Image Componet

以下のアニメーションを実装した BackgroundImage Component を作ってほしい


1. https://codepen.io/goodkatz/pen/LYPGxQz
   ui/BackgroundImage/SimpleWave01
2. https://codepen.io/smpnjn/pen/yLPdEPQ
   ui/BackgroundImage/MovingLights01
3. https://codepen.io/thanks2music/pen/VmJjaG
   ui/BackgroundImage/MovingLights02