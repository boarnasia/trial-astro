# HeroBlock の追加

src/layouts/BlogPost.astro にある、
Heroブロックをコンポーネント化してください

```html
<div class="c-post__hero">
    {heroImage && <Image width={1020} height={510} src={heroImage} alt="" />}
</div>
```

## 仕様

Component name: HeroBlock
input:
- image

module.scss を使用してください

## 成果物

- HeroBlock コンポーネント
- HeroBlock stories