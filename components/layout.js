import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

import site from '../site';

const SWITCHER = {
  en: { en: 'English', es: 'Spanish' },
  es: { en: 'Inglés', es: 'Español' }
}


export default function Layout({ title, showNav = false, children }) {
  const { pathname, asPath, query, push, locale, locales } = useRouter()

  function handleLanguageSwitch (nextLocale) {
    return function () {
      push({ pathname, query }, asPath, { locale: nextLocale })
    }
  }

  return (
    <div className="root">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{title}</title>
      </Head>
      <main>
        {showNav && (<nav><Link href="/" passHref><a>{site.name}</a></Link></nav>)}

        <div className='switcher'>{locales.map(l => (
          <div key={l} className={locale === l ? 'selected' : ''}  onClick={handleLanguageSwitch(l)}>{SWITCHER[locale][l]}</div>
        ))}</div>

        {children}
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} - Built with ♥︎ and
          {` `}
          <a href="https://nextein.elmasse.io">Nextein</a>
        </p>
      </footer>
      <style jsx>{`
        .root {
          margin: 0 auto;
          padding: 8px;
          max-width: 672px;
        }

        nav :global(a) {
          text-decoration: none;
        }

        .switcher {
          font-size: 14px;
          display: flex;
          gap: 4px;          
        }

        .switcher > div {
          cursor: pointer;
        }

        .switcher .selected {
          font-weight: bold;
        }

        main {
          display: flex;
          flex-direction: column;
        }

        footer {
          padding-top: 64px;
        }
      `}</style>
  </div>
  )
}