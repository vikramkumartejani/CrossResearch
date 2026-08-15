/** Static decorative backgrounds from /public/assets. */
export default function MediaBackgroundVars() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html:
          ':root{--cr-dots:url("/assets/dots.svg");--cr-card-dots:url("/assets/card-dot-img.svg");--cr-price-bg:url("/assets/price-card-bg.svg");}',
      }}
    />
  )
}
