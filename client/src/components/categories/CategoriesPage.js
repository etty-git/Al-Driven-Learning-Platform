import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../../features/categoriesAPI";
import { useNavigate } from "react-router-dom";
const CategoriesPage = () => {
  const authUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token && authUser);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCategoriesQuery();

  const cardClass =
    "bg-white shadow rounded-lg p-4 text-center hover:shadow-lg transition";

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Categories</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error loading categories</p>}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((cat) => (
            <div key={cat._id} className={cardClass}>
             <button
      className="mt-2 bg-purple-500 text-white px-4 py-2 rounded"
      onClick={() => navigate(`/categories/${cat._id}`)}
>
  {cat.name}
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;