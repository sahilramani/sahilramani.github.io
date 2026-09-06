---
title: "Reading bank statements with no network code"
categories:
  - Programming
tags:
  - ios
  - swift
  - privacy
  - vision
  - pdfkit
excerpt: "Every subscription tracker I tried wanted my bank login. Tabs finds recurring charges by reading statements on the phone, and ships with no networking layer at all."
header:
  teaser: /assets/images/tabs/home.png
---


# Reading bank statements with no network code

Every subscription tracker I tried wanted my bank login. Most route it through Plaid, which means giving a third party read access to my accounts so it can tell me I am still paying for Hulu. The value is real, and I did not want to make that trade for it.

So the constraint came before the app. No networking layer. Not a policy in a settings screen, an absence of code: no `URLSession`, no analytics SDK, no crash reporter, no accounts, nothing that could open a socket. Everything follows from that.

![The Tabs home screen, showing total monthly spend across active subscriptions](/assets/images/tabs/home.png)

## What the constraint rules out

Plenty, and it is worth being honest about the cost. There is no account sync, so the data lives on one phone and leaves with it. There are no merchant logos, because fetching them is a network call, so every subscription gets a monogram derived from its name instead. There are no crash reports and no analytics, which means I have no idea how the app behaves on any phone but mine.

What it buys is that the privacy claim is checkable. "We do not upload your data" is a sentence anyone can write. An app with no network code is a thing you can verify by reading it, which takes about as long as a `grep`. The [source is public](https://github.com/sahilramani/Tabs) for exactly that reason.

## What it reads instead

Statements you already have. Vision OCRs a screenshot of your bank app's transaction list. PDFKit pulls the text out of a PDF statement. Both frameworks already sit on the phone, so neither needs anything fetched. You can also point it at a folder and hand it several months at once, which matters more than it sounds like it should.

![The import sheet: scan a screenshot, import a PDF, import a folder, or add manually](/assets/images/tabs/import.png)

## Three sightings before it counts

The detector does not use a list of known subscription brands as a gate. It parses every statement line into a date, a merchant, and an amount, groups the lines by merchant, clusters them by amount, and then asks whether what is left arrives on a regular cadence.

The threshold that does the most work is small:

```swift
guard cluster.count >= 3, days.count >= 3 else { return false }
```

One charge is a purchase. Two is a coincidence. Three at a steady interval for a steady amount is a cadence, and that is the cheapest signal that separates Netflix from a restaurant you happened to visit twice.

The consequence is that a single statement finds nothing at all. Feed the app one month and it will correctly report that it has no evidence of anything recurring, which looks like a bug and is not. It needs a few months before it can say anything.

That threshold is also why the sample statements bundled with the app are four months rather than one. Running them gives ten candidates from four statements, nine of them selected by default.

## The near misses are the interesting part

Two cases matter more than the clean ones.

A merchant can recur on a perfectly regular cadence with a different amount every time. A gas station charged four times on a monthly rhythm at $52.30, $47.85, $61.20, and $44.90 is not a subscription. Early on the detector hid those. Now it surfaces them deselected and badged "Amounts vary — looks one-off", because the judgment belongs to the person reading the screen, not to the heuristic.

The other is a price change. Hulu going from $17.99 to $18.99 halfway through the window is still one subscription, and the clusterer has to hold it together rather than splitting it into two candidates that each fall under the three-sighting threshold.

![The review screen, with detected subscriptions, charge counts, and a deselected near-miss](/assets/images/tabs/review.png)

## Nothing is saved until you look at it

Detection ends at a review screen, not at the database. Every candidate arrives editable: the name, the price, the billing cycle, the renewal date. Anything already tracked is flagged and updates in place rather than becoming a duplicate row. The heuristic is a first draft and the screen exists because it will be wrong.

## What I have not proven

The part that matters most. Detection accuracy depends almost entirely on how a given bank formats its statements, and I have tested against a handful of formats, all of them American.

Statements that wrap a long description across two lines, put the amount in its own column rather than at the end of the row, use DD/MM instead of MM/DD, or bill in a currency other than dollars are where I expect it to fall over. I have not seen those fail, which is different from knowing they work, and the absence of analytics means I will not find out on my own.

## The ask

Tabs is on TestFlight. It is an alpha, iPhone only, iOS 17 and up.

It ships with four months of fictional statements from a bank that does not exist, readable in full before you import them, so you can watch the whole flow run without pointing it at anything real.

If you bank at a credit union, a regional bank, or anywhere outside the US, you are the tester I actually need. What is useful is not an install, it is a report of a charge it missed or read wrong. The [repository is here](https://github.com/sahilramani/Tabs), and issues are the best place to send those.
