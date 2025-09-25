This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Fry Guys "Coming Soon" Experience 🍟

This project has been customized into a vibrant retro diner style landing page for the Fry Guys cloud kitchen brand.

### Features

- Neon animated headline & diner color palette (red / yellow / teal)
- Dynamic countdown timer (placeholder launch date)
- Retro receipt-style newsletter signup form
- Interactive emoji icon row (fries, burger, soda, milkshake)
- Falling fries particle animation when clicking the fries icon
- Milkshake wobble animation on hover
- Hidden Secret Menu easter egg
- Responsive & accessible (ARIA labels, prefers-reduced-motion support)

### Easter Eggs

| Action | Result |
| ------ | ------ |
| Type `secret menu` | Opens secret modal with a fictional item (McPuff 2.0) |
| Click any 🍟 fries icon | Launches a burst of falling fries |
| Hover 🥛 milkshake | Shakes the glass |

### Customization

Update the placeholder launch date inside `app/page.js`:

```js
const LAUNCH_DATE = new Date("2025-12-31T18:30:00.000Z");
```

Change colors / intensity in `app/globals.css` (search for `--diner-`).

### Accessibility Notes

- Countdown uses `aria-live="polite"`.
- Modal focuses automatically and closes with Escape or backdrop click.
- Animations are disabled for users with `prefers-reduced-motion`.

### Future Ideas

- Add real email capture backend
- Add sound effects (with a mute toggle)
- Progressive reveal of menu items as launch approaches

Enjoy the crispy vibes! 🧀
