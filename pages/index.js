
import { getPostsFilterBy } from 'nextein/fetcher'
import { inCategory } from 'nextein/filters'
import Content from 'nextein/content'

import Link from 'next/link'
import { useRouter } from 'next/router'

import site from '../site'
import Layout from '../components/layout'

export async function getStaticProps({ locale }) {
  const posts = await getPostsFilterBy(inCategory(`blog/${locale}`))
  return {
    props: {
      posts
    }
  }
}

export default function Index({ posts }) {
  const { locale } = useRouter()

  const writtenBy = locale == 'es' ? 'Escrito por' : 'Written by'

  return (
    <Layout title={site.name}>
      <header>
        <h1>{site.name}</h1>
      </header>
      <section>
        {posts.map(post => {
          // const link = post.data.page ? post : { href: `/${post.data.name}` } // <== this is /pages/[name].js
          const author = site.authors[post.data.author]
          const source = site.authors[post.data.source]
          return (
            <article key={post.data.__id}>
              <header>
                <h1>
                  <Link href={'/[name]'} as={`/${post.data.name}`}>{post.data.title}</Link>
                </h1>
                <p>
                  {author && `${writtenBy} ${author.name}`}
                  {author && source && ` ${String.fromCharCode(183)} `}
                  {source && `From ${source.name}`}
                </p>
              </header>
              <Content {...post} excerpt />
            </article>
          )
        })}
      </section>
      <style jsx>{`
          header {
            margin-top: 32px;
            margin-bottom: 64px;
          }

          header h1 {
            font-size: 48px;
          }
  
          section {
            margin: 40px 0;
          }
          
          article {
            margin-bottom: 40px;
          }

          article header {
            margin-top: 16px;
            margin-bottom: 8px;
          }

          article header h1 {
            font-size: 32px;
            margin: 0;
          }

          article header h1 :global(a) {
            text-decoration: none;
          }
          
          article header p {
            line-height: calc(24/12);
            font-size: 12px;
            color: #444;
            margin: 0;
          }
        `}</style>
    </Layout>
  )
}

// export default withPosts(Index)
