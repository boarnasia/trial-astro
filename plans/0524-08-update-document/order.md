# document をアップデートしたい

## 対象

- docs
- CLAUDE.md
- CLAUDE.local.md

## どのように更新したいか？

もともとは BEM + FLOCSS のプロジェクトだった

だが、 astro.module.scss へ移行を行った
BEM + FLOCSS は foundation, utility を残すのみで
object はすべて astro.module.scss へ移行した

なので、このプロジェクトの仕様を
1. component は module.scss
2. foundation, utility は bem + flocss としたい

### module.scss について

module.scss ではデザインを指定するときは 必ずクラスを使用するようにしたい
html のタグ要素にcss を振るのは避けたい
詳細度を揃えておきたいんだ