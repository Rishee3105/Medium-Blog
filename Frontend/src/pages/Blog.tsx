import { Appbar } from "../components/Appbar";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading) {
    return (
      <div>
        <div>
          <Appbar />
          <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
              <div className=" col-span-8">
                <div className="text-4xl font-extrabold">
                  <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                </div>
                <div className="text-slate-500 pt-2">
                  <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                </div>
                <div className="text-slate-500 pt-2">
                  <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                </div>
                <div className="text-slate-500 pt-2">
                  <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                </div>
                <div className="pt-3">
                  <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                </div>
              </div>
              <div className=" col-span-4">
                <div className="text-slate-600 text-lg">
                  <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                </div>
                <div className="flex">
                  <div className="pr-4 flex flex-col justify-center">
                    <div className="h-4 w-4 bg-gray-200 rounded-full   mb-4"></div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">
                      <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>{blog ? <FullBlog blog={blog} /> : <div>Blog not found</div>}</div>
  );
};

export default Blog;
