# inline layout コンポーネントをつくる

block 方向はスタックと呼ばれるが、inline方向はなんと呼ぶべき？

parametar:
- padding-inline: npx;
- justify-items: start center end  // 横（Y軸）方向なのでJustify、間違ってたらごめんちょ


```html
<div class="layout">
    <div class="sizing">
        <slot />
    </div>
</div>
```

```scss
.layout {
    min-width: none;
    max-width: none;
    min-height: none;
    max-height: none;

    width: 100%;
    height: none;

    justigy-self: center;
}

.sizing {
    width: 100%;
    max-width: 1320px;
}

```