import axios from "axios";
import { cookies,headers } from "next/headers";

const fetchSpecialBlogs = async () => {
  try {
    const token = cookies().get("token");
    const res = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/special-blogs`,
      {
        headers: {
          'Authorization': `Bearer ${token.value}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Page() {
  const blogs = await fetchSpecialBlogs();
  const headerList = headers()
  const user = JSON.parse(headerList.get('users'))

  return (
    <div className="container mx-auto">
      Hello {user.email}
      <div className="grid grid-cols-4 gap-2">
        {blogs.map((blog, index) => (
          <div className="flex flex-col" key={index}>
            <div>id: {blog.id}</div>
            <div className="text-3xl">{blog.attributes.title}</div>
            <div>{blog.attributes.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
