# @/components/Layouts/Blog を追加したい

- @/components/Layouts/Blog/LayoutPage
- @/components/Layouts/Blog/LayoutHero
- @/components/Layouts/Blog/LayoutHeader
- @/components/Layouts/Blog/LayoutBody

about page で使用します
また blog page での使用も視野にいれています

```scss
.layoutPage {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 6em auto 3em auto;
    grid-template-areas:
        "hero"
        "......"
        "header"
        "......"
        "body"
    width: 100%;
}

.layoutHero {
  grid-area: hero;
}

.layoutHeader {
  grid-area: header;

  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  // 要素はセンタリング
}

.layoutBody {
  grid-area: body;
}
```

```html
<LayoutPage>
    <LayoutHero>
        <HeroBlock>
            <Image src={AboutHeroImage} alt="About Me" />
        </HeroBlock>
    </LayoutHero>

    <LayoutHeader>
        <Typography as="h1" variant="display">About Me</Typography>
        <Typography as="p" variant="lead">Lorem ipsum dolor sit amet</Typography>
    </LayoutHeader>

    <LayoutBodry>
        <LayoutContainer size="sm">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo
                viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam
                adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus
                et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus
                vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque
                sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.
            </p>

            <p>...</p>
        </LayoutContainer>
    </LayoutBodry>
</LayoutPage>
```