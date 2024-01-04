import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/Home.module.css";

export default function Post({ post, site }) {
  console.log(post);
  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={`Read more about ${post.title} on ${site.title}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{post.translation.title}</h1>

        <div className={styles.grid}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: post.translation.content,
            }}
          />
        </div>

        <p className={styles.backToHome}>
          <Link href="/">
            <a className={styles.back}>&lt; Back To Home</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params, locale }) {
  const { postSlug } = params;
  const language = locale.toUpperCase();
  console.log(language);

  return {
    props: {
      post,
      language,
      path: `/posts/${post.slug}`,
      site,
    },
    revalidate: 10,
  };
}

// export async function getStaticPaths({ locales }) {
//   const apolloClient = getApolloClient();

//   const data = await apolloClient.query({
//     query: gql`
//       {
//         posts(first: 10000) {
//           edges {
//             node {
//               id
//               title
//               slug
//             }
//           }
//         }
//       }
//     `,
//   });

//   const posts = data?.data.posts.edges.map(({ node }) => node);

//   const paths = posts.map(({ slug }) => {
//     return {
//       params: {
//         postSlug: slug,
//       },
//     };
//   });

//   return {
//     paths: [
//       ...paths,
//       ...paths.flatMap((path) => {
//         return locales.map((locale) => {
//           return {
//             ...path,
//             locale,
//           };
//         });
//       }),
//     ],
//     paths: [],
//     fallback: "blocking",
//   };
// }
