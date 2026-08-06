# OSANO QA Checklist

## Automated

- [ ] `npm run validate:content`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Pending routes are absent from navigation and sitemap
- [ ] Product, solution and technology references resolve

## Responsive review

Review at 360px, 390px, 768px, 1024px and 1440px.

- [ ] No horizontal overflow
- [ ] Header never hides page content
- [ ] Mobile menu opens, closes and follows keyboard focus
- [ ] Menu closes after route changes
- [ ] Text and headings do not clip
- [ ] Cards remain readable without forced equal-height gaps
- [ ] Touch targets are approximately 44px or larger
- [ ] Footer columns stack cleanly

## Accessibility and browser

- [ ] Skip link works
- [ ] Focus indicators remain visible
- [ ] Heading hierarchy is logical
- [ ] Breadcrumbs and navigation have accessible labels
- [ ] Images have appropriate alt text or abstract labels
- [ ] Reduced-motion preference is respected
- [ ] Contrast is readable in every brand world
- [ ] No console errors or hydration warnings

## Content and brand

- [ ] English copy reads naturally and contains no Lorem ipsum
- [ ] No unapproved specification, certification, scientific claim or medical claim
- [ ] QRS, Oxygen Wellness and Hydrogen Wellness are not publicly reachable
- [ ] Social links remain hidden until real URLs are approved
- [ ] Real approved assets take precedence over placeholders
- [ ] Site does not resemble a marketplace, medical site, spa or laboratory UI
