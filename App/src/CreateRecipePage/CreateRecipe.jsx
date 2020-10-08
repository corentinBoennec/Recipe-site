import React, { useState, Fragment, useEffect, useRef } from "react";
import Select from 'react-select'
import { Link } from 'react-router-dom';
import { useDispatch, connect, useSelector } from 'react-redux';

import { alertActions } from '../_actions';
import { recipeActions, userActions } from '../_actions';
import { ingredientActions } from "../_actions";






const CreateRecipePage = () => {
  const [recipeName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [nbEaters, setNbEaters] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [additionnalNoteFromAuthor, setAdditionnalNoteFromAuthor] = useState("");
  const [steps, setSteps] = useState([{ content: " " }]);
  const [ingredients, setIngredients] = useState([{ name: " ", quantity: 0, unit: "" }]);

  const [submitted, setSubmitted] = useState(false);
  const [ingredientsOptions, setIngredientsOptions] = useState(null);

  const [imageLoading, setImageLoading] = useState(false);

  const [image, setImage] = useState('');

  const presetForCloudUpload = "cfbumrr7";
  const urlTocloud = "https://api.cloudinary.com/v1_1/dwkymyolp/image/upload";
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImageUpload = e => {
   
    setImage(e.target.files[0]);
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    setImageLoading(true);
    getUrlForImage(e.target.files[0]);
  };

  const getUrlForImage = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', presetForCloudUpload);
      const options = {
        method: 'POST',
        body: formData,
      };

      return fetch(urlTocloud, options)
        .then(res => res.json())
        .then(res => setImgUrl(res.url))
        .catch(err => console.log(err));
    }


  };


  const unitOptions = [
    { value: "mg", label: "mg" }, { value: "g", label: "g" }, { value: "kg", label: "kg" }, { value: "lb", label: "lb" },
    { value: "l", label: "l" }, { value: "cl", label: "cl" }, { value: "ml", label: "ml" },
    { value: "tsp", label: "tsp" }, { value: "Tbs.", label: "Tbs." }, { value: "cup", label: "cup" }, { value: "oz", label: "oz" },
    { value: "unit", label: "unit" }, { value: "", label: "" }
  ]

  const fix = null; //here to call useeffect only once at the begining need to be done another way
  useEffect(() => {
    recipeActions.getAllIngredient().then(value => {
      setIngredientsOptions(value.map(ing => {
        return {
          'value': ing.name,
          'label': ing.name
        }
      }));
    });
  }, [fix]);


  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);

    const valid = (recipeName && description && ingredients && nbEaters && steps && imgUrl);
    if (valid) {
          const recipe = {
            'name': recipeName,
            'description': description,
            'nbEaters': nbEaters,
            'additionnalNoteFromAuthor': additionnalNoteFromAuthor,
            'origin': origin,
            'imgUrl': imgUrl,
            'steps': steps.map(s => s.content),
            'ingredients' : ingredients
          }
    
          console.log("recipe before addRecipe", recipe);
    
          recipeActions.addRecipe(recipe);
        }
     
  };

  const handleStepChange = (index, event) => {
    const values = [...steps];
    values[index].content = event.target.value;
    setSteps(values);
  };

  const handleIngredientNameChange = (index, event) => {
    console.log("event name : ", event);
    const values = [...ingredients];
    values[index].name = event.value;
    setIngredients(values);
  };

  const handleIngredientQuantityChange = (index, event) => {
    console.log("event qt : ", event);
    const values = [...ingredients];
    values[index].quantity = event.target.value;
    setIngredients(values);
  };

  const handleIngredientUnitChange = (index, event) => {
    console.log("event unit : ", event);
    const values = [...ingredients];
    values[index].unit = event.value;
    (values);
  };

  const handleAddStep = () => {
    const values = [...steps];
    values.push({ content: "" });
    setSteps(values);
  };

  const handleRemoveStep = () => {
    const values = [...steps];

    values.splice(steps.length - 1, 1);
    setSteps(values);
  };

  const handleAddIngredient = () => {
    const values = [...ingredients];
    values.push({ name: "", quantity: "" });
    setIngredients(values);
  };

  const handleRemoveIngredient = () => {
    const values = [...ingredients];

    values.splice(ingredients.length - 1, 1);
    setIngredients(values);
  };


  return (
    <div className="col-md-6 col-md-offset-3 jumbotron">
      <h2 className="createRecipeTitle">Add Recipe</h2>
      <form onSubmit={handleSubmit} className="createRecipeForm">
        <div className={'form-group' + (submitted && !recipeName ? ' has-error' : '')}>
          <label htmlFor="name">name</label>
          <input type="text" className="form-control" name="name" value={recipeName} onChange={(e) => setName(e.target.value)} />
          {submitted && !recipeName &&
            <div className="help-block">name is required</div>
          }
        </div>
        <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
          <label htmlFor="description">description</label>
          <textarea type="description" className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          {submitted && !description &&
            <div className="help-block">description is required</div>
          }
        </div>
        <div className={'form-group' + (submitted && !origin ? ' has-error' : '')}>
          <label htmlFor="origin">origin</label>
          <input type="origin" className="form-control" name="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </div>

        {/* steps */}
        <div className="form-group">
          {steps.map((step, index) => (
            <Fragment key={`${step}~${index}`}>
              <div className="form-group">
                <label htmlFor="steps">Steps n° {index + 1}</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="steps"
                  name="steps"
                  value={step.content}

                  onChange={e => handleStepChange(index, event)}
                />
              </div>

            </Fragment>
          ))}
          <div class="btn-group float-right" role="group" aria-label="Basic example">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => handleRemoveStep()}
              >
                -
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => handleAddStep()}
              >
                +
              </button>

            </div>
            <br></br>
        </div>


        {/* Ingredients */}
        <div className="form-row">
          {ingredients.map((ingredient, index) => (
            <Fragment key={`${ingredient}~${index}`}>

              <div className="form-group col-sm-12">
                <label htmlFor="ingredients">ingredient n° {index + 1}</label>
                <Select
                  name="name"
                  id="ing"
                  options={ingredientsOptions}
                  onChange={event => handleIngredientNameChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="quantity">quantity</label>
                <input
                  type="text" pattern="[0-9]*"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={ingredients[index].quantity}
                  onChange={event => handleIngredientQuantityChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-6">
                <label htmlFor="unit">unit </label>
                <Select
                  name="unit"
                  id="unit"
                  options={unitOptions}
                  onChange={event => handleIngredientUnitChange(index, event)}
                />
              </div>

            </Fragment>
          ))}
        </div>
            <div class="btn-group float-right" role="group" aria-label="Basic example">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => handleRemoveIngredient()}
              >
                -
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => handleAddIngredient()}
              >
                +
              </button>

            </div>
            <br></br>
    

          {/*nb eaters*/}
          <div className={'form-group' + (submitted && !nbEaters ? ' has-error' : '')}>
            <label htmlFor="name">How many people can eat with this meal ?</label>
            <input type="number" min="0" className="form-control" name="name" value={nbEaters} onChange={(e) => setNbEaters(e.target.value)} />
            {submitted && !nbEaters &&
              <div className="help-block">number of eaters is required</div>
            }
          </div>

          {/* img 
        <div className={'form-group' + (submitted && !imgUrl ? ' has-error' : '')}>
          <label htmlFor="name">Add an image to make your recipe beautiful</label>
          <input type="file" a  min="0"  onChange={handleImageUpload} />
          {submitted && !imgUrl &&
            <div className="help-block">image for your recipe is required</div>
          }
*/}




          <div
         
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none"
              }}
            />
            <div class="form-row fluid">
              <div class="form-group col-sm-4">
                <button type="button" class="btn btn-primary " onClick={() => imageUploader.current.click()}>upload image</button>
              </div>
              <div class="form-group col-sm-8">
             
          <img
                  ref={uploadedImage}
                  style={{
                    maxWidth: '250px',
                    maxHeight: '100%',
                  }}
                />
              </div>
            </div>
            {submitted && !image && !imgUrl &&
              <div className="help-block">Set an image or add the url on your own</div>
            }
            <label htmlFor="name">Image URL</label>
            {imageLoading && !imgUrl && 
            <div class="spinner-border" role="status">
               <span class="sr-only">Loading...</span>
            </div>}
            <input className='file-path validate' type='text' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
          </div>



          {/*additionnal note */}
          <div className={'form-group' + (submitted && !additionnalNoteFromAuthor ? ' has-error' : '')}>
            <label htmlFor="description">additionnal note from author</label>
            <textarea type="description" className="form-control" name="description" value={additionnalNoteFromAuthor} onChange={(e) => setAdditionnalNoteFromAuthor(e.target.value)} />
          </div>


          {/*submit*/}
          <div className="submit-button">
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onSubmit={handleSubmit}
            >
              Save
              </button>
          </div>
      </form>
    </div>
  )

}

export {CreateRecipePage}; 