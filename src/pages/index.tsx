import React from "react";
import Link from "next/link";


import styles from "../styles/Home.module.css";
import { LanguageCodeFilterEnum, Page, Post } from "../../generated/graphql";
import { getAllPosts } from "../api/allPosts.query";

interface props {
  page: Page;
  posts: Post[];

}

export default function Home({ posts }: props) {
  return (
    <div className={styles.container}>

      <main className={styles.main}>

        <ul className={styles.grid}>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <li key={post.slug} className={styles.card}>
                  <Link href={post?.slug ?? ""}>
                    <a>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: post.title ?? "",
                        }}
                      />
                      <div
                        className={styles.excerpt}
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt ?? "",
                        }}
                      />
                    </a>
                  </Link>
                </li>
              );
            })}

          {!posts ||
            (posts.length === 0 && (
              <li>
                <p>Oops, no posts found!</p>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const language = locale.toUpperCase() as LanguageCodeFilterEnum;
  const postData = await getAllPosts(language);
  const posts = postData?.posts?.nodes;

  return {
    props: {
      posts,
    },
  };
}
