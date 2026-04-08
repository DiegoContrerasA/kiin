'use server';

import CONFIG from '@/config';

export interface WPPost {
  id: number;
  title: string;
  link: string;
  excerpt: string;
  date: string;
}

export interface WPPostResponse {
  id: number;
  title: { rendered: string };
  link: string;
  excerpt: { rendered: string };
  date: string;
}

export async function getLatestPosts(count: number = 2): Promise<WPPost[]> {
  try {
    const response = await fetch(`${CONFIG.LATEST_POSTS_URL}?per_page=${count}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const posts: WPPostResponse[] = await response.json();

    return posts.map((post) => ({
      id: post.id,
      title: post.title.rendered ?? '',
      link: post.link,
      excerpt: post.excerpt.rendered ?? '',
      date: post.date,
    }));
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}