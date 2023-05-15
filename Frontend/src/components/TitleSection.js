import { FaRegPlusSquare, FaPrint } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createClasse } from "../redux/apiCalls/classeApiCall";

const TitleSection = (props) => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (titre.trim() === "") return toast.error("Le titre est obligatoire");
    if (description.trim() === "") return toast.error("ajouter une description");
    if (!image) return toast.error("ajouter une image pour cette classe");

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('image', image);

    dispatch(createClasse(formData));
    setTimeout(()=> {document.getElementById('colseModal').click();}, 1000);
    setTitre("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="container-fluid d-flex justify-content-between mt-5">
      <div className="modal fade" id="add-modal" tabIndex="-1" aria-labelledby="add-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="add-modal-label">Ajouter Nouvelle classe</h5>
                <button type="button" id="colseModal" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="item-name" className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="item-name"
                    name="titre"
                    required
                    value={titre}
                    onChange={(event) => setTitre(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="item-description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="item-description"
                    name="description"
                    rows="3"
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="item-image" className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="item-image"
                    name="image"
                    accept="image/*"
                    required
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <h5 className="text-dark">{props.page}
      </h5>
      <button className="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target={`#add-modal`} title={props.description}>
        {props.page === "Dashboard" ? <FaPrint /> : <FaRegPlusSquare />}&nbsp;{props.btn}
      </button>
         
      
    </div>
    
  );
};


// import { FaRegPlusSquare, FaPrint } from "react-icons/fa";
// import { useState } from "react";

// // const [showSuccessMessage, setShowSuccessMessage] = useState(false);



// const TitleSection = (props) => {
//   const [titre, setTitre] = useState("");
//   const [description, setDescription] = useState("");
//   const handleSubmit = (event) => {
//     event.preventDefault(); // prevent the default form submission behavior
//     const formData = new FormData(event.target); // create a new FormData object from the form data
//                 // const name = formData.get('name');
//                 const titre = formData.get('titre');
//                 const description = formData.get('description');
//                 const image = formData.get('image');
//                 // alert(titre+description);
//                 fetch('http://127.0.0.1:5000/add/Class', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json' // specify the content type as JSON
//                   },
//                   body: JSON.stringify({ // convert the body to a JSON string
//                     titre: titre,
//                     description: description,
//                     image:image
//                   }),
//                 }).then((response) => {
//                   if (response.ok) {
//                     const colseModal = document.getElementById('colseModal');
//                     colseModal.click();
//                     setTitre("");
//                     setDescription("");
//                   } else {
//                     // if the server returns an error response, display an error message to the user
//                     alert('Error: ' + response.statusText);
//                   }
//                 }).catch((error) => {
//                   // if there's a network error or any other kind of error, display an error message to the user
//                   alert('Error: ' + error.message);
//     });
//   };

//   return (
//     <div className="container-fluid d-flex justify-content-between mt-5">
//       {/* Modal */}
//       <div className="modal fade" id="add-modal" tabIndex="-1" aria-labelledby="add-modal-label" aria-hidden="true">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <form onSubmit={handleSubmit}> {/* attach the onSubmit event handler to the form */}
//             <div className="modal-header">
//               <h5 className="modal-title" id="add-modal-label">Ajouter Nouvelle classe</h5>
//               <button type="button" id="colseModal" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               {/* the form fields */}
//               <div className="mb-3">
//                   <label htmlFor="item-name" className="form-label">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="item-name"
//                     name="titre"
//                     required
//                     value={titre}
//                     onChange={(event) => setTitre(event.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="item-description" className="form-label">
//                     Description
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="item-description"
//                     name="description"
//                     rows="3"
//                     required
//                     value={description}
//                     onChange={(event) => setDescription(event.target.value)}
//                   ></textarea>
//                 </div>
//               <div className="mb-3">
//                 <label htmlFor="item-image" className="form-label">Image</label>
//                 <input type="file" className="form-control" id="item-image" name="image" accept="image/*" required />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               <button type="submit" className="btn btn-primary">Add</button> {/* add a submit button to the form */}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//      {/* modal end */}
//      <h5 className="text-dark">{props.page}
//       </h5>
//       <button className="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target={`#add-modal`} title={props.description}>
//         {props.page === "Dashboard" ? <FaPrint /> : <FaRegPlusSquare />}&nbsp;{props.btn}
//       </button>
         
      
//     </div>
    
//   );
// };

export default TitleSection;
