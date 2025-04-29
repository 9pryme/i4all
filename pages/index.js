import Head from 'next/head';
import Hero from '../components/Hero';
import PostsSection from '../components/PostsSection';
import ExclusionSection from '../components/ExclusionSection';
import StatsSection from '../components/StatsSection';
import DataStoriesSection from '../components/DataStoriesSection';
import GetInvolvedSection from '../components/GetInvolvedSection';
import NewsletterSection from '../components/NewsletterSection';

export default function Home({ posts = [], reports = [] }) {
  return (
    <>
      <Head>
        <title>Inclusion For All - Promoting Financial Inclusion in Nigeria</title>
        <meta name="description" content="Inclusion For All advocates for policies that promote financial inclusion for marginalized populations in Nigeria" />
        <meta property="og:title" content="Inclusion For All - Financial Inclusion in Nigeria" />
        <meta property="og:description" content="Promoting inclusive financial services for marginalized populations in Nigeria" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inclusion-for-all.org" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        
        <PostsSection posts={posts} />
        
        <ExclusionSection />
        
        <StatsSection />
        
        <DataStoriesSection reports={reports} />
        
        <GetInvolvedSection />
        
        <NewsletterSection />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    // For static export, you may need to use pre-built data or mock data
    // as fetch requests can only be made at build time
    const postsRes = await fetch('https://inclusion-for-all.org/wp-json/wp/v2/posts');
    const posts = await postsRes.json();
    
    const reportsRes = await fetch('https://inclusion-for-all.org/wp-json/wp/v2/posts?categories=36');
    const reports = await reportsRes.json();

    return {
      props: {
        posts,
        reports,
      },
      // No revalidate property for static export
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        posts: [],
        reports: [],
      },
    };
  }
} 