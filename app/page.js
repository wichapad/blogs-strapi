import axios from "axios";
import Link from "next/link";
const fetchBlogs = async () => {
  try {
    const res = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Page() {
  const blogs = await fetchBlogs();

  return (
    <div className="container mx-auto">
      Hello
      <div className="grid grid-cols-4 gap-2">
        {blogs.map((blog, index) => (
          <div className="flex flex-col" key={index}>
            <div>id: {blog.id}</div>
            <div className="text-3xl">{blog.attributes.title}</div>
            <div>{blog.attributes.description}</div>
            <Link href={`blog/${blog.id}`} className="bg-blue-200 p-4">
              See more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
