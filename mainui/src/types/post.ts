export interface Post {
  title: string;
  description: string;
  body: string;
  image: string;
  technologies: string[];
  github?: string;
  site?: string;
}

export interface ReturnData<T> {
  data: T;
}
