import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical guides on hazardous waste compliance for small businesses — SQG and CESQG status, manifests, universal waste, and industry-specific disposal.",
};

interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt?: string;
  isPlaceholder: boolean;
}

const SEED_POSTS: PostCard[] = [
  {
    slug: "what-is-a-small-quantity-generator",
    title: "What is a Small Quantity Generator?",
    excerpt:
      "SQG status sits between conditionally exempt and large generator. Here is how the EPA defines it and what monthly thresholds matter.",
    isPlaceholder: true,
  },
  {
    slug: "how-hazardous-waste-manifests-work",
    title: "How hazardous waste manifests work",
    excerpt:
      "The Uniform Hazardous Waste Manifest is the chain-of-custody document that ties your facility to the disposal site. We walk through every box.",
    isPlaceholder: true,
  },
  {
    slug: "sqg-vs-cesqg",
    title: "SQG vs CESQG — which are you?",
    excerpt:
      "The two categories most small businesses fall into, the monthly accumulation limits that separate them, and how to stay in the lower one.",
    isPlaceholder: true,
  },
  {
    slug: "hazardous-waste-disposal-for-auto-shops",
    title: "Hazardous waste disposal for auto shops",
    excerpt:
      "Paint, used oil, antifreeze, aerosols, contaminated absorbents — the streams every auto shop generates and how each is regulated.",
    isPlaceholder: true,
  },
  {
    slug: "universal-waste-rules-for-small-businesses",
    title: "Universal waste rules for small businesses",
    excerpt:
      "Universal waste is the streamlined disposal track for batteries, lamps, and mercury devices. Understand which rules apply to your operation.",
    isPlaceholder: true,
  },
];

interface SanityPost {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  publishedAt?: string;
}

async function getPosts(): Promise<PostCard[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return SEED_POSTS;
  }

  try {
    const { sanityClient, postsQuery } = await import("@/lib/sanity");
    const posts = await sanityClient.fetch<SanityPost[]>(postsQuery);
    if (!posts || posts.length === 0) return SEED_POSTS;
    return posts.map((post) => ({
      slug: post.slug?.current ?? post._id,
      title: post.title ?? "Untitled",
      excerpt: post.excerpt ?? "",
      ...(post.publishedAt ? { publishedAt: post.publishedAt } : {}),
      isPlaceholder: false,
    }));
  } catch {
    return SEED_POSTS;
  }
}

export default async function ResourcesPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero />
      <Grid posts={posts} />
    </>
  );
}

function PageHero() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <p
          className="text-xs font-semibold uppercase"
          style={{ color: "var(--color-orange)", letterSpacing: "0.12em" }}
        >
          Resources
        </p>
        <h1
          className="mt-4 font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 1.5rem + 4vw, 4.5rem)",
            color: "var(--color-charcoal)",
          }}
        >
          Practical compliance, plainly written.
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-forest)" }}
        >
          Guides on generator status, manifests, universal waste, and
          industry-specific disposal — written for the people who actually do
          the work.
        </p>
      </div>
    </section>
  );
}

function Grid({ posts }: { posts: PostCard[] }) {
  return (
    <section
      style={{
        backgroundColor: "var(--color-warm-white)",
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCardView key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCardView({ post }: { post: PostCard }) {
  const isLink = !post.isPlaceholder;

  const inner = (
    <article
      className="flex h-full flex-col bg-white p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        border: "1px solid var(--color-sand)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {post.publishedAt && (
        <time
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--color-orange)" }}
        >
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      )}
      <h2
        className="mt-2 text-xl font-medium leading-tight"
        style={{ color: "var(--color-charcoal)" }}
      >
        {post.title}
      </h2>
      <p
        className="mt-3 flex-1 text-sm leading-relaxed"
        style={{ color: "var(--color-forest)" }}
      >
        {post.excerpt}
      </p>

      <span
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{
          color: post.isPlaceholder ? "var(--color-forest)" : "var(--color-orange)",
        }}
      >
        {post.isPlaceholder ? "Coming soon" : "Read article"}
        {!post.isPlaceholder && <ArrowRight className="size-4" aria-hidden />}
      </span>
    </article>
  );

  if (isLink) {
    return (
      <Link href={`/resources/${post.slug}/`} className="block h-full">
        {inner}
      </Link>
    );
  }
  return <div className="block h-full">{inner}</div>;
}
