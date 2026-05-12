import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSubCategoriesByIdQuery } from "../../features/sub_categoriesAPI";
import{useCreatePromptMutation} from "../../features/promptsAPI";
import { useSelector } from "react-redux";
const CategoryDetails = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { id } = useParams();

  const {
    data: subCategories,
    isLoading,
    isError,
  } = useGetSubCategoriesByIdQuery(id);

  // איזה כרטיס נבחר
  const [selectedId, setSelectedId] = useState(null);

  // טקסט של הפרומפט
  const [prompt, setPrompt] = useState("");
const [response, setResponse] = useState("");
  const [createPrompt] = useCreatePromptMutation();

  const handleSubmit = async() => {
    try{
 const result = await createPrompt({

      sub_category_id: selectedId,

      category_id: id,

      user_id: authUser._id,
      prompt: prompt,

    }).unwrap();
setResponse(result.aiResponse || "No response from AI");
    }
    catch(err){
      
 console.log("FULL ERROR:", err);
  console.log("DATA:", err?.data);
  console.log("MESSAGE:", err?.data?.message)
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">Sub Categories</h1>

      {isLoading && <p>Loading...</p>}

      {isError && <p>Error loading sub categories</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {subCategories?.map((sub) => (

          <div
            key={sub._id}
            onClick={() => setSelectedId(sub._id)}
            className={`
              p-4 rounded-lg shadow cursor-pointer transition
              ${
                selectedId === sub._id
                  ? "bg-purple-500 text-white"
                  : "bg-white hover:shadow-lg"
              }
            `}
          >
            {/* שם תת קטגוריה */}
            <h2 className="text-lg font-semibold mb-3">
              {sub.name}
            </h2>

            {/* אם הכרטיס נבחר */}
            {selectedId === sub._id && (
              <div className="mt-4">

                <textarea
                  className="w-full border rounded p-2 text-black"
                  placeholder="כתוב פרומפט..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                  className="mt-3 w-full bg-black text-white py-2 rounded"
                  onClick={handleSubmit}
                >
                  שלח
                </button>
{response && (
  <div className="mt-4 p-3 bg-gray-100 rounded text-black">
    <h3 className="font-bold mb-2">Response:</h3>
    <p>{response}</p>
  </div>
)}
              </div>
            )}
          </div>

        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;