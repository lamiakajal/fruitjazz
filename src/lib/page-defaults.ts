import type { PageKey } from "@/lib/settings-types";

export interface PageDefault {
  title: string;
  description: string;
  intro: string;
  body: string;
}

/**
 * Built-in text of each content page. The shop owner can replace any of them
 * in Admin > Content. Placeholders like {{freeThreshold}} are filled in
 * automatically from the Settings page.
 */
export const PAGE_DEFAULTS: Record<PageKey, PageDefault> = {
  about: {
    title: "About us",
    description: "Our story, where our products come from and what we stand for.",
    intro: "Honoring nature's purest mountain harvest.",
    body: `## Our story
At **{{shopName}}**, our mission is simple: to bring authentic, raw dry fruits and unheated mountain honey to your table, without industrial processing.

## Where it comes from
We work directly with beekeepers and orchards in Karak, Neelum Valley and Gilgit-Baltistan. Honey is bottled straight from the hive, and nuts and dry fruits are sorted by hand, never bleached or waxed.

## What we stand for
- **Raw and pure:** no added sugar, heat treatment or artificial preservatives.
- **Small batches:** packed in small quantities so every order is fresh.
- **Honest packing:** sealed jars and pouches that protect aroma and crunch.
- **Fair sourcing:** we buy directly from growers.

## Talk to us
Questions or a bulk order? Message us on [WhatsApp]({{whatsappUrl}}) or email {{supportEmail}}.`,
  },
  delivery: {
    title: "Delivery policy",
    description: "Delivery areas, charges, delivery time and parcel tracking.",
    intro: "How and when your order reaches you.",
    body: `## Where we deliver
We deliver to cities and towns across {{country}} through trusted courier partners ({{couriers}}).

## Delivery charges
- Orders over {{freeThreshold}} ship free.
- Orders below that have a flat delivery charge of {{shippingFee}}.
- The delivery charge is shown at checkout before you place the order.

## How long it takes
Most orders arrive within {{deliveryDays}} after dispatch. Remote areas can take a little longer.

## Tracking your parcel
Once your order is dispatched you will receive the courier name and tracking number. You can also check the status any time on the [Track your order](/track) page.

## Payment on delivery
With Cash on Delivery, please keep the exact amount ready for the courier and check that the parcel is sealed before accepting it.

## If you are not available
The courier will try to reach you on the phone number you gave at checkout. Please make sure the number and address are correct. After repeated failed attempts the parcel may be returned to us.`,
  },
  returns: {
    title: "Return and refund policy",
    description: "Freshness promise, replacements and refunds for damaged or unsatisfactory orders.",
    intro: "Fresh, sealed food is the promise. If we missed it, we will make it right.",
    body: `## Freshness promise
If your order arrives damaged, leaking, stale or different from what you ordered, contact us within {{returnDays}} days of delivery and we will replace it or refund you.

## How to ask for a replacement or refund
- Message us on [WhatsApp]({{whatsappUrl}}) or email {{supportEmail}}.
- Send your order number and clear photos of the product and the packaging.
- We will review your request and reply as soon as we can, usually within one working day.

## Refunds
- Approved refunds are sent to the account you paid from, or to a wallet or bank account you choose for Cash on Delivery orders.
- Refunds are processed within 3 to 7 working days after approval.

## What we cannot take back
- Opened or partly used food items, unless there is a quality problem.
- Products damaged after delivery by storage or handling.
- Requests made after {{returnDays}} days from delivery.

## Cancelling an order
You can cancel before the parcel is dispatched. Message us as soon as possible with your order number.`,
  },
  privacy: {
    title: "Privacy policy",
    description: "What personal information we collect, how we use it and how we protect it.",
    intro: "How {{shopName}} handles your personal information.",
    body: `## What we collect
- Details you give us when ordering: name, phone number, email, delivery address and order notes.
- Account details if you sign up: name, email and a securely hashed password, or your Google/GitHub name and email.
- Messages and reviews you send us.
- Payment references (for example a transaction ID) when you pay by wallet or bank transfer. We never see or store card numbers.

## How we use it
- To process, pack, deliver and support your order.
- To send order confirmations and status updates by email or WhatsApp.
- To answer your questions and keep the store secure.

## Who we share it with
Only with the partners needed to serve you: couriers (name, phone, address), our email provider and our hosting and database providers. We do not sell your information.

## Cookies and local storage
We store your cart, wishlist and light/dark preference in your browser, and use a sign-in cookie if you have an account. These are needed for the store to work.

## Your choices
You can ask us to see, correct or delete your information by contacting {{supportEmail}}. We keep order records for as long as needed for accounting and legal purposes.`,
  },
  terms: {
    title: "Terms and conditions",
    description: "The terms that apply when you shop with us.",
    intro: "By placing an order with {{shopName}} you agree to these terms.",
    body: `## Orders and prices
- Prices are in Pakistani rupees and may change without notice. The price shown at checkout is the price you pay.
- An order is confirmed when we accept it. We may cancel an order if an item is out of stock or the details are unclear, and we will tell you promptly.
- Coupons and instant payment discounts follow the conditions shown with them and cannot be exchanged for cash.

## Payment
You can pay by Cash on Delivery, bank transfer or wallet. For transfers, orders are processed after we verify your payment reference.

## Delivery and returns
See our [delivery policy](/delivery-policy) and [return policy](/return-policy).

## Product information
Natural products vary slightly in colour, size and texture between batches. Photos are for illustration. Please check the pack for ingredients and allergens before eating, especially nuts.

## Reviews
Reviews are checked before they are published. We may remove reviews that are abusive, false or unrelated to the product.

## Liability and law
We are not liable for delays caused by couriers, weather or events outside our control. These terms are governed by the laws of {{country}}.`,
  },
};

export const PAGE_ROUTES: Record<PageKey, string> = {
  about: "/about",
  delivery: "/delivery-policy",
  returns: "/return-policy",
  privacy: "/privacy-policy",
  terms: "/terms",
};
