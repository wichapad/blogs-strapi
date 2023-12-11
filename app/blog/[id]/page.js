import axios from "axios";

const fetchBlog = async (id) => {
  try {
    const res = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs/${id}?populate=thumbnail,author`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Page({ params }) {
  const blogId = params.id;
  const blog = await fetchBlog(blogId);

  return (
    <div className="container mx-auto">
      Blog ID: {blog.id}
      <div>{blog.attributes.title}</div>
      <img
        width="100px"
        src={`${process.env.STRAPI_BASE_URL}${blog.attributes.thumbnail.data.attributes.url}`}
      />
      <div>Author by:{blog.attributes.author.data.attributes.name}</div>
    </div>
  );
}
